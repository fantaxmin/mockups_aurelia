/**
 * Estado global del flujo de reserva (búsqueda, habitación, datos del huésped,
 * desglose de precio y referencia). Lo comparten las 5 pantallas.
 */
import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { HABITACIONES } from "@shared/data/habitaciones.js";
import { sumarDias } from "@shared/logic/fechas.js";
import { getUsuarioPrueba } from "../lib/api.js";

const BookingContext = createContext(null);

// Usuario de prueba de respaldo: si el backend no responde, el login simulado
// sigue funcionando para la demo. Refleja el sembrado en backend/src/db.js.
const USUARIO_PRUEBA = {
  nombre: "Eleanor Vance",
  email: "eleanor.vance@email.com",
  telefono: "+351 912 345 678",
  nacionalidad: "Portugal",
};

function hoyISO() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

export function BookingProvider({ children }) {
  const HOY = hoyISO();

  const [search, setSearch] = useState({
    destination: "Hotel Aurelia, Lisbon",
    checkIn: HOY,
    checkOut: sumarDias(HOY, 3),
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [room, setRoom] = useState(HABITACIONES.find((r) => r.id === "deluxe-king"));
  const [booking, setBooking] = useState(null); // { room, totals, search }
  const [bookingRef, setBookingRef] = useState(null);
  const [guest, setGuest] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "Portugal",
    requests: "",
  });

  // Sesión simulada con el usuario de prueba.
  const [user, setUser] = useState(null);

  // Login simulado: intenta el usuario sembrado en el backend; si no responde,
  // usa el de respaldo. Prellena los datos del huésped para el checkout.
  const login = useCallback(async () => {
    let u;
    try {
      u = await getUsuarioPrueba();
      if (!u || !u.nombre) throw new Error("respuesta vacía");
    } catch {
      u = USUARIO_PRUEBA;
    }
    setUser(u);
    setGuest((g) => ({
      ...g,
      name: u.nombre,
      email: u.email,
      phone: u.telefono,
      nationality: u.nacionalidad || g.nationality,
    }));
    return u;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setGuest({ name: "", email: "", phone: "", nationality: "Portugal", requests: "" });
  }, []);

  const value = useMemo(
    () => ({
      search,
      setSearch,
      room,
      setRoom,
      booking,
      setBooking,
      bookingRef,
      setBookingRef,
      guest,
      setGuest,
      user,
      login,
      logout,
    }),
    [search, room, booking, bookingRef, guest, user, login, logout]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking debe usarse dentro de <BookingProvider>");
  return ctx;
}
