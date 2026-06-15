/* Hook de búsqueda de disponibilidad (CU-01), compartido por Home y TopNav. */
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext.jsx";
import { useToast } from "../components/Toast.jsx";
import buscarDisponibilidad from "@shared/logic/buscarDisponibilidad.js";

/**
 * Devuelve una función que ejecuta la búsqueda con los criterios actuales:
 * valida (lanza Error si algo es inválido) y navega a resultados, o muestra
 * el error como toast. Centraliza la lógica para que no diverja entre vistas.
 */
export function useBusqueda() {
  const navigate = useNavigate();
  const toast = useToast();
  const { search } = useBooking();

  return function ejecutarBusqueda() {
    try {
      buscarDisponibilidad({
        destino: search.destination,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        huespedes: search.adults + search.children,
      });
      navigate("/rooms");
    } catch (err) {
      toast.error(err.message);
    }
  };
}
