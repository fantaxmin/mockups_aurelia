/**
 * Punto de entrada de la lógica de negocio del Hotel Aurelia.
 * Un módulo por caso de uso (CU-01 … CU-05). Importado tanto por el backend
 * (API Express) como por las pruebas unitarias Jest y el frontend.
 */

export { default as buscarDisponibilidad } from "./buscarDisponibilidad.js";
export { default as filtrarHabitaciones } from "./filtrarHabitaciones.js";
export { default as calcularPrecio, TASA_IMPUESTO, CARGO_SERVICIO } from "./calcularPrecio.js";
export { default as validarDatosHuesped } from "./validarDatosHuesped.js";
export { default as confirmarReserva, generarReferencia, FORMATO_REFERENCIA } from "./confirmarReserva.js";
export * as fechas from "./fechas.js";
