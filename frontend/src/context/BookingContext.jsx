/**
 * Estado global del flujo de reserva (búsqueda, habitación, datos del huésped,
 * desglose de precio y referencia). Lo comparten las 5 pantallas.
 */
import { createContext, useContext, useMemo, useState } from "react";
import { HABITACIONES } from "@shared/data/habitaciones.js";
import { sumarDias } from "@shared/logic/fechas.js";

const BookingContext = createContext(null);

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
    }),
    [search, room, booking, bookingRef, guest]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking debe usarse dentro de <BookingProvider>");
  return ctx;
}
