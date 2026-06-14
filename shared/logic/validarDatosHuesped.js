/**
 * CU-04 — Ingresar / Validar Datos del Huésped.
 *
 * Valida los datos personales del huésped capturados en el paso 1 del
 * checkout. Lanza un Error específico ante datos faltantes o con formato
 * inválido; en caso válido retorna { valido: true } con los datos normalizados.
 *
 * @param {Object} datos
 * @param {string} datos.nombre   Nombre completo.
 * @param {string} datos.email    Correo electrónico.
 * @param {string} datos.telefono Número de teléfono.
 * @returns {{ valido: boolean, nombre: string, email: string, telefono: string }}
 */

// Email simple pero estricto: algo@algo.dominio
const FORMATO_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// Teléfono: solo dígitos y separadores comunes (+, espacio, guion, paréntesis).
const FORMATO_TELEFONO = /^[+\d][\d\s()-]*$/;

export default function validarDatosHuesped(datos = {}) {
  const nombre = (datos.nombre || "").trim();
  const email = (datos.email || "").trim();
  const telefono = (datos.telefono || "").trim();

  // 1. Campos obligatorios completos.
  if (!nombre || !email || !telefono) {
    throw new Error("Todos los campos obligatorios deben estar completos");
  }

  // 2. Formato de email válido.
  if (!FORMATO_EMAIL.test(email)) {
    throw new Error("El formato del email no es válido");
  }

  // 3. Formato de teléfono válido (sin caracteres no numéricos).
  if (!FORMATO_TELEFONO.test(telefono) || telefono.replace(/\D/g, "").length < 7) {
    throw new Error("El formato del teléfono no es válido");
  }

  return { valido: true, nombre, email, telefono };
}
