/**
 * Rutas de la API REST del Hotel Aurelia (express.Router).
 * Cada endpoint corresponde a un caso de uso y reutiliza la lógica compartida.
 * Los errores de negocio (Error lanzado por la lógica) se devuelven como 400
 * con { error: mensaje } para que el frontend los muestre como toast/inline.
 */
import { Router } from "express";
import buscarDisponibilidad from "../../../shared/logic/buscarDisponibilidad.js";
import filtrarHabitaciones from "../../../shared/logic/filtrarHabitaciones.js";
import calcularPrecio from "../../../shared/logic/calcularPrecio.js";
import { HABITACIONES, AMENIDADES, TIPOS_HABITACION } from "../../../shared/data/habitaciones.js";
import { RESENAS } from "../../../shared/data/resenas.js";
import { HOTEL, UBICACION, GALERIA } from "../../../shared/data/hotel.js";
import { crearReserva, consultarReserva } from "../services/reservas.js";
import { obtenerUsuarioPrueba, listarDestinos, listarHabitacionesPorDestino } from "../db.js";

const router = Router();

// Envuelve un handler para traducir Error de negocio -> HTTP 400.
const handle = (fn) => (req, res) => {
  try {
    fn(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Metadatos del hotel + catálogo base (para hidratar el frontend).
router.get("/hotel", (_req, res) => {
  res.json({ hotel: HOTEL, ubicacion: UBICACION, galeria: GALERIA, amenidades: AMENIDADES, tipos: TIPOS_HABITACION, resenas: RESENAS });
});

// Usuario de prueba (para prellenar el checkout).
router.get("/usuario-prueba", (_req, res) => {
  res.json(obtenerUsuarioPrueba());
});

// Catálogo de destinos (autocompletado del buscador). ?q= filtra, ?limit= acota.
router.get("/destinos", (req, res) => {
  res.json(listarDestinos(req.query.q, req.query.limit));
});

// Habitaciones de un destino, resueltas por la FK destino_id (JOIN en SQLite).
router.get("/destinos/:id/habitaciones", (req, res) => {
  res.json(listarHabitacionesPorDestino(req.params.id));
});

// CU-02 — listado/filtrado de habitaciones. Filtros opcionales por query string.
router.get("/habitaciones", handle((req, res) => {
  const { tipo, precioMax, ratingMin } = req.query;
  const filtros = {};
  if (tipo) filtros.tipo = tipo;
  if (precioMax) filtros.precioMax = Number(precioMax);
  if (ratingMin) filtros.ratingMin = Number(ratingMin);
  const habitaciones = filtrarHabitaciones(HABITACIONES, filtros);
  res.json(habitaciones);
}));

// CU-01 — buscar disponibilidad.
router.post("/disponibilidad", handle((req, res) => {
  res.json(buscarDisponibilidad(req.body));
}));

// CU-03 — calcular precio de una estadía.
router.post("/precio", handle((req, res) => {
  const { habitacionId, checkIn, checkOut } = req.body;
  const habitacion = HABITACIONES.find((h) => h.id === habitacionId);
  if (!habitacion) throw new Error("La habitación seleccionada no existe");
  res.json(calcularPrecio(checkIn, checkOut, habitacion.price));
}));

// CU-04 + CU-05 — crear una reserva (valida huésped, calcula precio, confirma).
router.post("/reservas", handle((req, res) => {
  const reserva = crearReserva(req.body);
  res.status(201).json(reserva);
}));

// Consultar una reserva por su referencia (404 si no existe o ya expiró).
router.get("/reservas/:ref", (req, res) => {
  const reserva = consultarReserva(req.params.ref);
  if (!reserva) return res.status(404).json({ error: "Reserva no encontrada o expirada" });
  res.json(reserva);
});

export default router;
