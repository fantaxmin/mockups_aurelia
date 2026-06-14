/**
 * CU-02 — Filtrar y Explorar Habitaciones.
 *
 * Filtra el listado de habitaciones disponibles según los criterios del panel
 * lateral (precio máximo, tipo, amenidades y calificación mínima). Las
 * habitaciones se reciben como parámetro para mantener la función pura.
 *
 * @param {Array<Object>} habitaciones Catálogo de habitaciones disponibles.
 * @param {Object} [filtros]
 * @param {string}  [filtros.tipo]        Tipo de habitación (Single, Double, Suite, Deluxe).
 * @param {number}  [filtros.precioMax]   Precio por noche máximo.
 * @param {number}  [filtros.ratingMin]   Calificación mínima de huéspedes.
 * @param {string[]} [filtros.amenidades] Claves de amenidades requeridas.
 * @returns {Array<Object>} Habitaciones que cumplen todos los criterios.
 */
export default function filtrarHabitaciones(habitaciones, filtros = {}) {
  if (!Array.isArray(habitaciones) || habitaciones.length === 0) {
    throw new Error("No hay habitaciones disponibles");
  }

  const { tipo, precioMax, ratingMin, amenidades } = filtros;

  return habitaciones.filter((h) => {
    if (tipo && h.type !== tipo) return false;
    if (precioMax != null && h.price > precioMax) return false;
    if (ratingMin != null && h.rating < ratingMin) return false;
    if (Array.isArray(amenidades) && amenidades.length > 0) {
      const tiene = amenidades.every((a) => h.amenities.includes(a));
      if (!tiene) return false;
    }
    return true;
  });
}
