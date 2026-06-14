/**
 * Utilidades de fecha (sin dependencias) compartidas por la lógica de negocio.
 * Las fechas se manejan como cadenas ISO "YYYY-MM-DD".
 */

export function pad(n) {
  return String(n).padStart(2, "0");
}

export function aISO(fecha) {
  return fecha.getFullYear() + "-" + pad(fecha.getMonth() + 1) + "-" + pad(fecha.getDate());
}

export function desdeISO(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function sumarDias(iso, n) {
  const d = desdeISO(iso);
  d.setDate(d.getDate() + n);
  return aISO(d);
}

/**
 * Número de noches entre dos fechas ISO. Puede ser 0 o negativo si las
 * fechas son inválidas; quien llama decide cómo tratarlo.
 */
export function noches(checkIn, checkOut) {
  return Math.round((desdeISO(checkOut) - desdeISO(checkIn)) / 86400000);
}

const FORMATO_ISO = /^\d{4}-\d{2}-\d{2}$/;
export function esISO(valor) {
  return typeof valor === "string" && FORMATO_ISO.test(valor);
}
