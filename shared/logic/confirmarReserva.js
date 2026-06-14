/**
 * CU-05 — Confirmar Reserva.
 *
 * Genera la confirmación final de la reserva: valida que existan los datos
 * mínimos y produce un código de referencia único con formato AUR-XXX-0000.
 *
 * @param {Object} datos
 * @param {string} datos.nombre      Nombre del huésped.
 * @param {string} datos.email       Correo del huésped (donde se envía la confirmación).
 * @param {Object} [datos.habitacion] Habitación reservada (opcional para el cálculo de la ref).
 * @returns {{ confirmado: boolean, ref: string, email: string }}
 */

// Alfabeto sin vocales/letras ambiguas (I, O) para referencias legibles.
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ";

/** Genera una referencia única con formato AUR-XXX-0000. */
export function generarReferencia() {
  let letras = "";
  for (let i = 0; i < 3; i++) {
    letras += ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
  }
  const numeros = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  return `AUR-${letras}-${numeros}`;
}

/** Valida que una cadena cumpla el formato de referencia AUR-XXX-0000. */
export const FORMATO_REFERENCIA = /^AUR-[A-Z]{3}-\d{4}$/;

export default function confirmarReserva(datos = {}) {
  const nombre = (datos.nombre || "").trim();
  const email = (datos.email || "").trim();

  // Datos mínimos para poder generar la confirmación.
  if (!nombre || !email) {
    throw new Error("Faltan datos para generar la confirmación");
  }

  return {
    confirmado: true,
    ref: generarReferencia(),
    email,
  };
}
