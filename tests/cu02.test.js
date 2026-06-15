/**
 * Suite CU-02 — Filtrar Habitaciones (5 casos: T02-01 … T02-05).
 */
import filtrarHabitaciones from "../shared/logic/filtrarHabitaciones.js";

// Catálogo de prueba con cinco habitaciones representativas.
const CATALOGO = [
  { id: "single", name: "Garden View Single", type: "Single", price: 180, rating: 4.5, amenities: ["wifi", "breakfast"], destinoId: "lisbon" },
  { id: "double", name: "Classic Double", type: "Double", price: 240, rating: 4.6, amenities: ["wifi", "tv"], destinoId: "lisbon" },
  { id: "deluxe", name: "Deluxe King", type: "Deluxe", price: 320, rating: 4.8, amenities: ["wifi", "pool"], destinoId: "lisbon" },
  { id: "suite", name: "Junior Suite", type: "Suite", price: 480, rating: 4.9, amenities: ["wifi", "pool", "parking"], destinoId: "madrid" },
  { id: "exec", name: "Executive Suite", type: "Suite", price: 620, rating: 4.9, amenities: ["wifi", "pool"], destinoId: "paris" },
];

describe("Suite CU-02 — Filtrar Habitaciones", () => {
  test("T02-01 — Filtrar por tipo Suite → solo habitaciones tipo Suite", () => {
    const r = filtrarHabitaciones(CATALOGO, { tipo: "Suite" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((h) => h.type === "Suite")).toBe(true);
  });

  test("T02-02 — Filtrar por precio máximo $300 → todos con precio ≤ 300", () => {
    const r = filtrarHabitaciones(CATALOGO, { precioMax: 300 });
    expect(r.every((h) => h.price <= 300)).toBe(true);
  });

  test("T02-03 — Filtrar por rating mínimo 4.8 → todos con rating ≥ 4.8", () => {
    const r = filtrarHabitaciones(CATALOGO, { ratingMin: 4.8 });
    expect(r.every((h) => h.rating >= 4.8)).toBe(true);
  });

  test("T02-04 — Sin filtros aplicados → retorna las cinco habitaciones del catálogo", () => {
    const r = filtrarHabitaciones(CATALOGO);
    expect(r).toHaveLength(5);
  });

  test("T02-05 — Lista de habitaciones vacía → lanza 'No hay habitaciones disponibles'", () => {
    expect(() => filtrarHabitaciones([], { tipo: "Suite" })).toThrow(
      "No hay habitaciones disponibles"
    );
  });

  test("T02-06 — Filtrar por destino (FK) → solo habitaciones de esa sede", () => {
    const r = filtrarHabitaciones(CATALOGO, { destinoId: "lisbon" });
    expect(r).toHaveLength(3);
    expect(r.every((h) => h.destinoId === "lisbon")).toBe(true);
  });
});
