/**
 * Servicio de reservas — orquesta la lógica de negocio compartida (CU-03/04/05)
 * con la capa de persistencia para crear y consultar reservas.
 */
import calcularPrecio from "../../../shared/logic/calcularPrecio.js";
import validarDatosHuesped from "../../../shared/logic/validarDatosHuesped.js";
import confirmarReserva from "../../../shared/logic/confirmarReserva.js";
import { HABITACIONES } from "../../../shared/data/habitaciones.js";
import { guardarReserva, obtenerReserva } from "../db.js";

/**
 * Crea una reserva completa a partir de los datos del huésped y la habitación.
 * Reutiliza exactamente la misma lógica que validan las pruebas Jest.
 * @returns {Object} La reserva persistida (incluida la referencia generada).
 */
export function crearReserva(datos = {}) {
  const { habitacionId, checkIn, checkOut, huespedes, nombre, email, telefono, nacionalidad, solicitudes } = datos;

  const habitacion = HABITACIONES.find((h) => h.id === habitacionId);
  if (!habitacion) {
    throw new Error("La habitación seleccionada no existe");
  }

  // CU-04: validar datos del huésped.
  const huesped = validarDatosHuesped({ nombre, email, telefono });

  // CU-03: calcular el desglose de precio.
  const precio = calcularPrecio(checkIn, checkOut, habitacion.price);

  // CU-05: generar la confirmación con referencia única.
  const confirmacion = confirmarReserva({ nombre: huesped.nombre, email: huesped.email, habitacion });

  return guardarReserva({
    ref: confirmacion.ref,
    nombre: huesped.nombre,
    email: huesped.email,
    telefono: huesped.telefono,
    nacionalidad: nacionalidad || "",
    solicitudes: solicitudes || "",
    habitacion_id: habitacion.id,
    habitacion_nombre: habitacion.name,
    check_in: checkIn,
    check_out: checkOut,
    huespedes: Number(huespedes) || 1,
    noches: precio.noches,
    total: precio.total,
  });
}

export function consultarReserva(ref) {
  return obtenerReserva(ref);
}
