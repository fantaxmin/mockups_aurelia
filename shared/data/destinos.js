/**
 * Catálogo de destinos atendidos. Es la semilla con la que el backend llena la
 * tabla `destinos` de SQLite (fuente que consume el buscador vía API) y, a la
 * vez, el fallback offline + la whitelist de validación (`esDestinoValido`).
 * Mantener tabla y validación sincronizadas: la tabla se siembra de aquí.
 */
export const DESTINOS = [
  "Hotel Aurelia, Lisbon",
  "Lisbon, Portugal",
  "Porto, Portugal",
  "Madrid, Spain",
  "Barcelona, Spain",
  "Paris, France",
  "Nice, France",
  "London, United Kingdom",
  "Edinburgh, United Kingdom",
  "Rome, Italy",
  "Milan, Italy",
  "Venice, Italy",
  "Florence, Italy",
  "Amsterdam, Netherlands",
  "Berlin, Germany",
  "Munich, Germany",
  "Vienna, Austria",
  "Prague, Czech Republic",
  "Zurich, Switzerland",
  "Athens, Greece",
  "Santorini, Greece",
  "Dublin, Ireland",
  "Copenhagen, Denmark",
  "Stockholm, Sweden",
  "Istanbul, Turkey",
  "Marrakech, Morocco",
  "Dubai, United Arab Emirates",
  "New York, United States",
  "Los Angeles, United States",
  "Miami, United States",
  "Tokyo, Japan",
  "Kyoto, Japan",
  "Singapore",
  "Bangkok, Thailand",
  "Sydney, Australia",
  "Rio de Janeiro, Brazil",
  "Buenos Aires, Argentina",
  "Mexico City, Mexico",
  "Bogotá, Colombia",
  "Cartagena, Colombia",
];

/** Normaliza para comparar sin distinguir mayúsculas, espacios ni acentos. */
function normaliza(valor) {
  return String(valor ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * ¿El texto corresponde a un destino atendido? Es tolerante con coincidencias
 * parciales (p. ej. "lis" → "Lisbon, Portugal") pero rechaza valores inventados.
 * @param {string} destino
 * @returns {boolean}
 */
export function esDestinoValido(destino) {
  const q = normaliza(destino);
  if (q.length < 2) return false;
  return DESTINOS.some((d) => {
    const n = normaliza(d);
    return n === q || n.includes(q) || q.includes(n);
  });
}
