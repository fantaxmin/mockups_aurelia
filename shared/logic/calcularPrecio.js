/**
 * CU-03 — Cálculo de Precio (desglose de la reserva).
 *
 * Calcula el desglose del costo total de una estadía: subtotal por noches,
 * impuestos (12%) y cargo fijo por servicio. El total se devuelve sin
 * redondear; el redondeo es responsabilidad de la capa de presentación.
 *
 * @param {string} checkIn     Fecha de entrada (ISO "YYYY-MM-DD").
 * @param {string} checkOut    Fecha de salida (ISO "YYYY-MM-DD").
 * @param {number} precioNoche Precio por noche de la habitación.
 * @returns {{ noches: number, subtotal: number, impuestos: number, cargoServicio: number, total: number }}
 */
import { noches } from "./fechas.js";

export const TASA_IMPUESTO = 0.12; // 12%
export const CARGO_SERVICIO = 28; // cargo fijo por servicio

export default function calcularPrecio(checkIn, checkOut, precioNoche) {
  // 1. Datos requeridos para poder calcular.
  if (!checkIn || !checkOut || precioNoche == null) {
    throw new Error("Datos incompletos para calcular el total");
  }

  // 2. El rango de fechas debe ser válido (al menos una noche).
  const n = noches(checkIn, checkOut);
  if (n <= 0) {
    throw new Error("Las fechas no son válidas");
  }

  const subtotal = precioNoche * n;
  const impuestos = subtotal * TASA_IMPUESTO;
  const cargoServicio = CARGO_SERVICIO;
  const total = subtotal + impuestos + cargoServicio;

  return { noches: n, subtotal, impuestos, cargoServicio, total };
}
