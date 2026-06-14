/**
 * Helpers de presentación (formato de moneda y fechas) para la UI.
 * La aritmética de fechas reutiliza la lógica compartida del monorepo.
 */
import { desdeISO, sumarDias, noches } from "@shared/logic/fechas.js";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Moneda en formato $1,234 (entero, redondeado para presentación). */
export const money = (n) => "$" + Math.round(Number(n)).toLocaleString("en-US");

/** "Jun 12" */
export function fmtShort(iso) {
  const d = desdeISO(iso);
  return MONTHS[d.getMonth()] + " " + d.getDate();
}

/** "Fri, Jun 12, 2026" */
export function fmtLong(iso) {
  const d = desdeISO(iso);
  return DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

/** Nombre corto del día de una fecha ISO. */
export function nombreDia(iso) {
  return DAYS[desdeISO(iso).getDay()];
}

export { sumarDias, noches };
