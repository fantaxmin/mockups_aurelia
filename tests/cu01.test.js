/**
 * Suite CU-01 — Buscar Disponibilidad (4 casos: T01-01 … T01-04).
 */
import buscarDisponibilidad from "../shared/logic/buscarDisponibilidad.js";

describe("Suite CU-01 — Buscar Disponibilidad", () => {
  const valida = {
    destino: "Hotel Aurelia, Lisbon",
    checkIn: "2026-06-12",
    checkOut: "2026-06-15",
    huespedes: 2,
  };

  test("T01-01 — Búsqueda con todos los campos válidos → disponible: true", () => {
    const r = buscarDisponibilidad(valida);
    expect(r.disponible).toBe(true);
  });

  test("T01-02 — Campo destino vacío → lanza 'Todos los campos son obligatorios'", () => {
    expect(() => buscarDisponibilidad({ ...valida, destino: "" })).toThrow(
      "Todos los campos son obligatorios"
    );
  });

  test("T01-03 — Check-out anterior al check-in → lanza 'La fecha de check-out debe ser posterior'", () => {
    expect(() =>
      buscarDisponibilidad({ ...valida, checkIn: "2026-06-15", checkOut: "2026-06-12" })
    ).toThrow("La fecha de check-out debe ser posterior");
  });

  test("T01-04 — Número de huéspedes igual a 0 → lanza 'Debe haber al menos un huésped'", () => {
    expect(() => buscarDisponibilidad({ ...valida, huespedes: 0 })).toThrow(
      "Debe haber al menos un huésped"
    );
  });
});
