/**
 * Suite CU-03 — Cálculo de Precio (3 casos: T03-01 … T03-03).
 */
import calcularPrecio from "../shared/logic/calcularPrecio.js";

describe("Suite CU-03 — Cálculo de Precio", () => {
  test("T03-01 — 3 noches a $320 con impuestos y cargo → noches=3, subtotal=960, total=1103.2", () => {
    const r = calcularPrecio("2026-06-12", "2026-06-15", 320);
    expect(r.noches).toBe(3);
    expect(r.subtotal).toBe(960);
    expect(r.total).toBeCloseTo(1103.2, 2);
  });

  test("T03-02 — Fecha de check-out vacía → lanza 'Datos incompletos para calcular el total'", () => {
    expect(() => calcularPrecio("2026-06-12", "", 320)).toThrow(
      "Datos incompletos para calcular el total"
    );
  });

  test("T03-03 — Check-in y check-out en la misma fecha → lanza 'Las fechas no son válidas'", () => {
    expect(() => calcularPrecio("2026-06-12", "2026-06-12", 320)).toThrow(
      "Las fechas no son válidas"
    );
  });
});
