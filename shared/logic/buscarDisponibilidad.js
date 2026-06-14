/**
 * CU-01 — Buscar Disponibilidad.
 *
 * Valida los criterios de búsqueda ingresados por el huésped en la página
 * principal. Si todo es válido, retorna un objeto de disponibilidad; en caso
 * contrario lanza un Error con un mensaje específico.
 *
 * @param {Object} busqueda
 * @param {string} busqueda.destino   Destino / hotel.
 * @param {string} busqueda.checkIn   Fecha de entrada (ISO "YYYY-MM-DD").
 * @param {string} busqueda.checkOut  Fecha de salida (ISO "YYYY-MM-DD").
 * @param {number} busqueda.huespedes Número de huéspedes.
 * @returns {{ disponible: boolean, destino: string, checkIn: string, checkOut: string, huespedes: number }}
 */
import { noches } from "./fechas.js";

export default function buscarDisponibilidad(busqueda = {}) {
  const { destino, checkIn, checkOut, huespedes } = busqueda;

  // 1. Todos los campos de texto/fecha son obligatorios.
  if (!destino || !checkIn || !checkOut) {
    throw new Error("Todos los campos son obligatorios");
  }

  // 2. La fecha de salida debe ser posterior a la de entrada.
  if (noches(checkIn, checkOut) <= 0) {
    throw new Error("La fecha de check-out debe ser posterior");
  }

  // 3. Debe viajar al menos un huésped.
  if (!huespedes || huespedes < 1) {
    throw new Error("Debe haber al menos un huésped");
  }

  return {
    disponible: true,
    destino,
    checkIn,
    checkOut,
    huespedes,
  };
}
