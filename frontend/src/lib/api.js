/**
 * Cliente de la API REST del backend (Express + SQLite).
 * En desarrollo, Vite redirige /api -> http://localhost:4000 (ver vite.config).
 */

async function pedir(url, opciones) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Ocurrió un error en el servidor");
  }
  return data;
}

/** Usuario de prueba sembrado en la BD (para prellenar el checkout). */
export function getUsuarioPrueba() {
  return pedir("/api/usuario-prueba");
}

/** Crea una reserva en la base de datos (se elimina sola al expirar el TTL). */
export function crearReserva(payload) {
  return pedir("/api/reservas", { method: "POST", body: JSON.stringify(payload) });
}

/** Consulta una reserva por referencia. */
export function getReserva(ref) {
  return pedir("/api/reservas/" + encodeURIComponent(ref));
}
