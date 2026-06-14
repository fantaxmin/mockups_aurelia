/**
 * Punto de entrada de los datos compartidos del Hotel Aurelia.
 * Reexporta cada dominio de datos (habitaciones, reseñas, hotel) desde su
 * propio archivo para mantener el orden y una sola importación de conveniencia.
 */

export { AMENIDADES, TIPOS_HABITACION, HABITACIONES } from "./habitaciones.js";
export { RESENAS } from "./resenas.js";
export { HOTEL, UBICACION, GALERIA } from "./hotel.js";
