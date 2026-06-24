/**
 * Catálogo de destinos / sedes donde Hotel Aurelia opera. Es la fuente única:
 *  - siembra la tabla `destinos` de SQLite (id, ciudad, país),
 *  - alimenta el autocompletado + la validación del buscador,
 *  - y es el objetivo de la llave foránea `destinoId` de cada habitación.
 * Solo algunas sedes tienen habitaciones cargadas; el resto son destinos
 * válidos sin disponibilidad todavía.
 */
export const DESTINOS = [
  { id: "lisbon", ciudad: "Lisbon", pais: "Portugal" },
  { id: "porto", ciudad: "Porto", pais: "Portugal" },
  { id: "madrid", ciudad: "Madrid", pais: "Spain" },
  { id: "barcelona", ciudad: "Barcelona", pais: "Spain" },
  { id: "paris", ciudad: "Paris", pais: "France" },
  { id: "nice", ciudad: "Nice", pais: "France" },
  { id: "london", ciudad: "London", pais: "United Kingdom" },
  { id: "edinburgh", ciudad: "Edinburgh", pais: "United Kingdom" },
  { id: "rome", ciudad: "Rome", pais: "Italy" },
  { id: "milan", ciudad: "Milan", pais: "Italy" },
  { id: "venice", ciudad: "Venice", pais: "Italy" },
  { id: "florence", ciudad: "Florence", pais: "Italy" },
  { id: "amsterdam", ciudad: "Amsterdam", pais: "Netherlands" },
  { id: "berlin", ciudad: "Berlin", pais: "Germany" },
  { id: "munich", ciudad: "Munich", pais: "Germany" },
  { id: "vienna", ciudad: "Vienna", pais: "Austria" },
  { id: "prague", ciudad: "Prague", pais: "Czech Republic" },
  { id: "zurich", ciudad: "Zurich", pais: "Switzerland" },
  { id: "athens", ciudad: "Athens", pais: "Greece" },
  { id: "santorini", ciudad: "Santorini", pais: "Greece" },
  { id: "dublin", ciudad: "Dublin", pais: "Ireland" },
  { id: "copenhagen", ciudad: "Copenhagen", pais: "Denmark" },
  { id: "stockholm", ciudad: "Stockholm", pais: "Sweden" },
  { id: "istanbul", ciudad: "Istanbul", pais: "Turkey" },
  { id: "marrakech", ciudad: "Marrakech", pais: "Morocco" },
  { id: "dubai", ciudad: "Dubai", pais: "United Arab Emirates" },
  { id: "new-york", ciudad: "New York", pais: "United States" },
  { id: "los-angeles", ciudad: "Los Angeles", pais: "United States" },
  { id: "miami", ciudad: "Miami", pais: "United States" },
  { id: "tokyo", ciudad: "Tokyo", pais: "Japan" },
  { id: "kyoto", ciudad: "Kyoto", pais: "Japan" },
  { id: "singapore", ciudad: "Singapore", pais: "" },
  { id: "bangkok", ciudad: "Bangkok", pais: "Thailand" },
  { id: "sydney", ciudad: "Sydney", pais: "Australia" },
  { id: "rio", ciudad: "Rio de Janeiro", pais: "Brazil" },
  { id: "buenos-aires", ciudad: "Buenos Aires", pais: "Argentina" },
  { id: "mexico-city", ciudad: "Mexico City", pais: "Mexico" },
  { id: "bogota", ciudad: "Bogotá", pais: "Colombia" },
  { id: "cartagena", ciudad: "Cartagena", pais: "Colombia" },
];

/** Etiqueta de presentación "Ciudad, País" (o solo ciudad si no hay país). */
export const nombreDestino = (d) => (d ? (d.pais ? `${d.ciudad}, ${d.pais}` : d.ciudad) : "");

/** Nombres listos para el autocompletado del buscador. */
export const NOMBRES_DESTINO = DESTINOS.map(nombreDestino);

/** Destino por su id (o null). */
export const destinoPorId = (id) => DESTINOS.find((d) => d.id === id) || null;

function normaliza(valor) {
  return String(valor ?? "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/**
 * Resuelve un texto ("Lisbon, Portugal", "Hotel Aurelia, Lisbon"…) al destino
 * correspondiente, o null si no atendemos esa ciudad. Tolera coincidencias
 * parciales por ciudad (p. ej. "lis" → Lisbon).
 * @param {string} texto
 * @returns {{id:string,ciudad:string,pais:string}|null}
 */
export function resolverDestino(texto) {
  const q = normaliza(texto);
  if (q.length < 2) return null;
  return (
    DESTINOS.find((d) => {
      const ciudad = normaliza(d.ciudad);
      return q === ciudad || q.includes(ciudad) || ciudad.includes(q);
    }) || null
  );
}

/** ¿El texto corresponde a un destino atendido? */
export function esDestinoValido(texto) {
  return resolverDestino(texto) != null;
}
