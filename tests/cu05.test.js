/**
 * Suite CU-05 — Confirmación de Reserva (3 casos: T05-01 … T05-03).
 */
import confirmarReserva from "../shared/logic/confirmarReserva.js";

describe("Suite CU-05 — Confirmación de Reserva", () => {
  const datos = {
    nombre: "Eleanor Vance",
    email: "eleanor.vance@email.com",
    habitacion: { name: "Deluxe King" },
  };

  test("T05-01 — Datos completos generan confirmación → confirmado: true, ref con formato AUR-XXX-0000", () => {
    const r = confirmarReserva(datos);
    expect(r.confirmado).toBe(true);
    expect(r.ref).toMatch(/^AUR-[A-Z]{3}-\d{4}$/);
  });

  test("T05-02 — Campo email vacío → lanza 'Faltan datos para generar la confirmación'", () => {
    expect(() => confirmarReserva({ ...datos, email: "" })).toThrow(
      "Faltan datos para generar la confirmación"
    );
  });

  test("T05-03 — Formato de la referencia generada → ref.startsWith('AUR-') es verdadero", () => {
    const r = confirmarReserva(datos);
    expect(r.ref.startsWith("AUR-")).toBe(true);
  });
});
