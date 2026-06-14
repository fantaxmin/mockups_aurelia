/**
 * Capa de persistencia — SQLite (better-sqlite3).
 *
 * Define el esquema, siembra el usuario de prueba y gestiona la EXPIRACIÓN
 * AUTOMÁTICA de los datos: cada reserva guarda una marca `expires_at`; un
 * barrido periódico (y uno al arrancar) elimina las reservas vencidas.
 */
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { DB_PATH, TTL_MS, SWEEP_INTERVAL_MS } from "./config.js";

// Asegura que exista la carpeta de datos.
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

// --- Esquema -------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre     TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    telefono   TEXT,
    nacionalidad TEXT,
    es_prueba  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS reservas (
    ref               TEXT PRIMARY KEY,
    nombre            TEXT NOT NULL,
    email             TEXT NOT NULL,
    telefono          TEXT,
    nacionalidad      TEXT,
    solicitudes       TEXT,
    habitacion_id     TEXT NOT NULL,
    habitacion_nombre TEXT NOT NULL,
    check_in          TEXT NOT NULL,
    check_out         TEXT NOT NULL,
    huespedes         INTEGER NOT NULL,
    noches            INTEGER NOT NULL,
    total             REAL NOT NULL,
    created_at        INTEGER NOT NULL,
    expires_at        INTEGER NOT NULL
  );
`);

// --- Usuario de prueba (semilla) ----------------------------------------
// Se recrea en cada arranque para que siempre exista uno disponible.
export const USUARIO_PRUEBA = {
  nombre: "Eleanor Vance",
  email: "eleanor.vance@email.com",
  telefono: "+351 912 345 678",
  nacionalidad: "Portugal",
};

db.prepare(
  `INSERT INTO usuarios (nombre, email, telefono, nacionalidad, es_prueba)
   VALUES (@nombre, @email, @telefono, @nacionalidad, 1)
   ON CONFLICT(email) DO UPDATE SET
     nombre = excluded.nombre,
     telefono = excluded.telefono,
     nacionalidad = excluded.nacionalidad`
).run(USUARIO_PRUEBA);

export function obtenerUsuarioPrueba() {
  return db.prepare("SELECT nombre, email, telefono, nacionalidad FROM usuarios WHERE es_prueba = 1 LIMIT 1").get();
}

// --- Reservas ------------------------------------------------------------
const insertReserva = db.prepare(`
  INSERT INTO reservas (
    ref, nombre, email, telefono, nacionalidad, solicitudes,
    habitacion_id, habitacion_nombre, check_in, check_out,
    huespedes, noches, total, created_at, expires_at
  ) VALUES (
    @ref, @nombre, @email, @telefono, @nacionalidad, @solicitudes,
    @habitacion_id, @habitacion_nombre, @check_in, @check_out,
    @huespedes, @noches, @total, @created_at, @expires_at
  )
`);

export function guardarReserva(reserva) {
  const ahora = Date.now();
  const fila = {
    solicitudes: "",
    nacionalidad: "",
    telefono: "",
    ...reserva,
    created_at: ahora,
    expires_at: ahora + TTL_MS,
  };
  insertReserva.run(fila);
  return fila;
}

export function obtenerReserva(ref) {
  // Solo retorna la reserva si aún no ha expirado.
  return db
    .prepare("SELECT * FROM reservas WHERE ref = ? AND expires_at > ?")
    .get(ref, Date.now());
}

// --- Limpieza de datos expirados (TTL) ----------------------------------
export function limpiarExpiradas() {
  const res = db.prepare("DELETE FROM reservas WHERE expires_at <= ?").run(Date.now());
  return res.changes; // número de reservas eliminadas
}

let intervalo = null;
export function iniciarLimpiezaAutomatica(log = console.log) {
  const borradas = limpiarExpiradas(); // barrido inmediato al arrancar
  if (borradas > 0) log(`[TTL] ${borradas} reserva(s) expirada(s) eliminada(s) al arrancar.`);

  intervalo = setInterval(() => {
    const n = limpiarExpiradas();
    if (n > 0) log(`[TTL] ${n} reserva(s) expirada(s) eliminada(s).`);
  }, SWEEP_INTERVAL_MS);
  // No bloquear el cierre del proceso por el temporizador.
  if (intervalo.unref) intervalo.unref();
  return intervalo;
}

export function detenerLimpiezaAutomatica() {
  if (intervalo) clearInterval(intervalo);
  intervalo = null;
}
