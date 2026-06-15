/* Pantalla 4 — Checkout (datos del huésped + pago). */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "../components/TopNav.jsx";
import { Footer } from "../components/Footer.jsx";
import { Icon } from "../components/Icon.jsx";
import { StepIndicator } from "../components/checkout/StepIndicator.jsx";
import { DetailsForm } from "../components/checkout/DetailsForm.jsx";
import { PaymentForm } from "../components/checkout/PaymentForm.jsx";
import { OrderSummary } from "../components/checkout/OrderSummary.jsx";
import { TrustBadges } from "../components/checkout/TrustBadges.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { useToast } from "../components/Toast.jsx";
import { money } from "../lib/format.js";
import { getUsuarioPrueba, crearReserva } from "../lib/api.js";
import validarDatosHuesped from "@shared/logic/validarDatosHuesped.js";

export default function Checkout() {
  const navigate = useNavigate();
  const toast = useToast();
  const { booking, guest, setGuest, setBooking, setBookingRef } = useBooking();

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);

  // Sin reserva en curso → volver a resultados.
  useEffect(() => {
    if (!booking) navigate("/rooms", { replace: true });
  }, [booking, navigate]);

  // Prellena con el usuario de prueba si los datos están vacíos.
  useEffect(() => {
    if (!guest.name && !guest.email) {
      getUsuarioPrueba()
        .then((u) => {
          if (u && u.nombre) {
            setGuest((g) => ({ ...g, name: u.nombre, email: u.email, phone: u.telefono, nationality: u.nacionalidad || g.nationality }));
            toast.success("Datos de prueba cargados");
          }
        })
        .catch(() => {/* backend opcional: si no responde, el formulario queda vacío */});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!booking) return null;

  const set = (k, v) => setGuest({ ...guest, [k]: v });

  function mapearErrorHuesped(msg) {
    if (/email/i.test(msg)) return { email: msg };
    if (/teléfono|telefono/i.test(msg)) return { phone: msg };
    return { name: msg };
  }

  function validarPago() {
    const e = {};
    if ((guest.card || "").replace(/\s/g, "").length < 15) e.card = "Enter a valid card number";
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(guest.exp || "")) e.exp = "MM / YY";
    if ((guest.cvc || "").length < 3) e.cvc = "3–4 digits";
    if (!(guest.cardName || "").trim()) e.cardName = "Name on card required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function finalizar() {
    setEnviando(true);
    try {
      // CU-04 + CU-05 en el backend: valida, calcula, confirma y persiste (con TTL).
      const reserva = await crearReserva({
        habitacionId: booking.room.id,
        checkIn: booking.search.checkIn,
        checkOut: booking.search.checkOut,
        huespedes: booking.search.adults + booking.search.children,
        nombre: guest.name,
        email: guest.email,
        telefono: guest.phone,
        nacionalidad: guest.nationality,
        solicitudes: guest.requests,
      });
      setBookingRef(reserva.ref);
      setBooking({ ...booking, guest: { ...guest } });
      navigate("/confirmation");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setEnviando(false);
    }
  }

  function next() {
    if (step === 0) {
      try {
        // CU-04 — valida los datos del huésped (lógica compartida).
        validarDatosHuesped({ nombre: guest.name, email: guest.email, telefono: guest.phone });
        setErrors({});
        setStep(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setErrors(mapearErrorHuesped(err.message));
        toast.error(err.message);
      }
    } else {
      if (validarPago()) finalizar();
      else toast.error("Revisa los datos de la tarjeta");
    }
  }

  return (
    <div className="screen" style={{ background: "var(--color-paper)", minHeight: "100vh" }}>
      <TopNav active="Rooms" />

      <div className="wrap" style={{ padding: "40px 40px 28px" }}>
        <StepIndicator step={step} />
      </div>

      <div className="wrap checkout-grid grid gap-12 items-start grid-cols-1 lg:grid-cols-[1fr_382px]" style={{ padding: "0 40px 96px" }}>
        {/* FORMULARIO */}
        <main>
          <button
            type="button"
            onClick={() => (step === 0 ? navigate(-1) : setStep(0))}
            className="muted"
            style={{ border: 0, background: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, marginBottom: 18, fontWeight: 500 }}
          >
            <Icon name="chevLeft" size={15} /> {step === 0 ? "Back to room" : "Back to details"}
          </button>

          <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
            {step === 0 ? <DetailsForm guest={guest} set={set} errors={errors} /> : <PaymentForm guest={guest} set={set} errors={errors} />}

            <button type="submit" className="btn btn--gold btn--lg" style={{ marginTop: 24 }} disabled={enviando}>
              {step === 0 ? (
                <>Continue to Payment <Icon name="arrowRight" size={17} /></>
              ) : enviando ? (
                "Procesando…"
              ) : (
                <>Pay {money(booking.totals.total)} <Icon name="arrowRight" size={17} /></>
              )}
            </button>
          </form>

          <TrustBadges />
        </main>

        {/* RESUMEN */}
        <aside className="checkout-aside lg:sticky" style={{ top: 96 }}>
          <OrderSummary booking={booking} />
        </aside>
      </div>
      <Footer />
    </div>
  );
}
