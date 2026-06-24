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
import { DESTINOS, nombreDestino } from "../../shared/data/destinos.js";
import { HABITACIONES } from "../../shared/data/habitaciones.js";

// Asegura que exista la carpeta de datos.
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

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

// --- Destinos + Habitaciones (catálogo con llave foránea) ----------------
// La tabla `destinos` es la referenciada; cada habitación apunta a un destino
// mediante `destino_id` (FK). Se recrean desde la fuente compartida para
// migrar el esquema antiguo y mantener la integridad referencial.
db.exec(`
  DROP TABLE IF EXISTS habitaciones;
  DROP TABLE IF EXISTS destinos;

  CREATE TABLE destinos (
    id     TEXT PRIMARY KEY,
    ciudad TEXT NOT NULL,
    pais   TEXT,
    nombre TEXT NOT NULL
  );

  CREATE TABLE habitaciones (
    id         TEXT PRIMARY KEY,
    nombre     TEXT NOT NULL,
    tipo       TEXT NOT NULL,
    precio     REAL NOT NULL,
    rating     REAL,
    destino_id TEXT NOT NULL REFERENCES destinos(id)
  );
`);

const insertDestino = db.prepare("INSERT INTO destinos (id, ciudad, pais, nombre) VALUES (@id, @ciudad, @pais, @nombre)");
db.transaction((lista) => {
  for (const d of lista) insertDestino.run({ id: d.id, ciudad: d.ciudad, pais: d.pais || "", nombre: nombreDestino(d) });
})(DESTINOS);

const insertHab = db.prepare("INSERT INTO habitaciones (id, nombre, tipo, precio, rating, destino_id) VALUES (@id, @nombre, @tipo, @precio, @rating, @destino_id)");
db.transaction((lista) => {
  for (const h of lista) insertHab.run({ id: h.id, nombre: h.name, tipo: h.type, precio: h.price, rating: h.rating, destino_id: h.destinoId });
})(HABITACIONES);

/**
 * Lista destinos del catálogo, opcionalmente filtrados por texto (autocompletado).
 * @param {string} [q]      Texto a buscar (coincidencia parcial, sin distinguir caso).
 * @param {number} [limit]  Máximo de resultados (tope 50).
 */
export function listarDestinos(q = "", limit = 20) {
  const lim = Math.min(Number(limit) || 20, 50);
  const texto = String(q || "").trim();
  if (texto) {
    return db
      .prepare("SELECT nombre FROM destinos WHERE nombre LIKE ? ORDER BY nombre LIMIT ?")
      .all("%" + texto + "%", lim)
      .map((r) => r.nombre);
  }
  return db.prepare("SELECT nombre FROM destinos ORDER BY nombre LIMIT ?").all(lim).map((r) => r.nombre);
}

/**
 * Habitaciones de un destino, resueltas por la FK (JOIN destinos↔habitaciones).
 * @param {string} destinoId
 */
export function listarHabitacionesPorDestino(destinoId) {
  return db
    .prepare(
      `SELECT h.id, h.nombre, h.tipo, h.precio, h.rating, h.destino_id AS destinoId,
              d.ciudad, d.pais
         FROM habitaciones h JOIN destinos d ON d.id = h.destino_id
        WHERE h.destino_id = ?
        ORDER BY h.precio`
    )
    .all(destinoId);
}

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
