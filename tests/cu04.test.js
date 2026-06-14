/**
 * Suite CU-04 — Validación de Datos del Huésped (4 casos: T04-01 … T04-04).
 */
import validarDatosHuesped from "../shared/logic/validarDatosHuesped.js";

describe("Suite CU-04 — Validación de Datos del Huésped", () => {
  const validos = {
    nombre: "Eleanor Vance",
    email: "eleanor.vance@email.com",
    telefono: "+351 912 345 678",
  };

  test("T04-01 — Datos completos y con formato válido → valido: true con nombre correcto", () => {
    const r = validarDatosHuesped(validos);
    expect(r.valido).toBe(true);
    expect(r.nombre).toBe("Eleanor Vance");
  });

  test("T04-02 — Email sin formato válido → lanza 'El formato del email no es válido'", () => {
    expect(() => validarDatosHuesped({ ...validos, email: "eleanor.vance" })).toThrow(
      "El formato del email no es válido"
    );
  });

  test("T04-03 — Teléfono con caracteres no numéricos → lanza 'El formato del teléfono no es válido'", () => {
    expect(() => validarDatosHuesped({ ...validos, telefono: "abc-no-valido" })).toThrow(
      "El formato del teléfono no es válido"
    );
  });

  test("T04-04 — Campo nombre vacío → lanza 'Todos los campos obligatorios deben estar completos'", () => {
    expect(() => validarDatosHuesped({ ...validos, nombre: "" })).toThrow(
      "Todos los campos obligatorios deben estar completos"
    );
  });
});
