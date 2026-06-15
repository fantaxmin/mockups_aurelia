/* Pantalla 5 — Confirmación de reserva. */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "../components/TopNav.jsx";
import { Footer } from "../components/Footer.jsx";
import { Img } from "../components/ui/Img.jsx";
import { SectionHead } from "../components/ui/SectionHead.jsx";
import { Icon } from "../components/Icon.jsx";
import { NextStepCard } from "../components/confirmation/NextStepCard.jsx";
import { StatCell } from "../components/confirmation/StatCell.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { money, fmtShort, fmtLong } from "../lib/format.js";
import { HOTEL, UBICACION } from "@shared/data/hotel.js";

const NEXT_STEPS = [
  ["key", "Online check-in", "Skip the front desk — check in online from 24 hours before arrival and head straight to your room.", "Set up check-in"],
  ["concierge", "Contact the concierge", "Arrange airport transfers, dining reservations or a surprise for a special occasion.", "Message concierge"],
  ["map", "Find the hotel", "Avenida da Liberdade 120, Lisbon. 20 minutes from the airport, steps from the metro.", "View hotel map"],
];

export default function Confirmation() {
  const navigate = useNavigate();
  const { booking, guest, bookingRef } = useBooking();

  // Sin referencia → no hay confirmación que mostrar.
  useEffect(() => {
    if (!bookingRef || !booking) navigate("/", { replace: true });
  }, [bookingRef, booking, navigate]);

  if (!bookingRef || !booking) return null;

  const { room, totals, search } = booking;
  const datos = booking.guest || guest;
  const guests = search.adults + search.children;
  const nombre = (datos.name || "").split(" ")[0] || "guest";

  return (
    <div className="screen" style={{ background: "var(--color-paper)", minHeight: "100vh" }}>
      <TopNav active="Home" />

      {/* banda hero */}
      <section style={{ background: "var(--color-navy-900)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 2px, transparent 2px 14px)" }} />
        <div className="wrap" style={{ padding: "72px 40px 96px", textAlign: "center", position: "relative" }}>
          <div className="check-pop" style={{ width: 84, height: 84, borderRadius: 999, background: "color-mix(in oklab, #28a06a 92%, white)", display: "grid", placeItems: "center", margin: "0 auto 26px", boxShadow: "0 0 0 10px rgba(40,160,106,.18)" }}>
            <Icon name="checkSmall" size={40} sw={2.4} style={{ color: "#fff" }} label="Reserva confirmada" />
          </div>
          <div className="eyebrow on-dark" style={{ marginBottom: 14 }}>Reservation complete</div>
          <h1 className="display" style={{ fontSize: 48, color: "#fff", margin: "0 0 14px" }}>Booking Confirmed!</h1>
          <p style={{ color: "rgba(255,255,255,.78)", fontSize: 17, maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
            Thank you, {nombre}. A confirmation has been sent to <b style={{ color: "#fff" }}>{datos.email || "your email"}</b>. We can't wait to welcome you.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 26, padding: "12px 22px", border: "1px solid var(--line-on-dark)", borderRadius: 100, background: "rgba(255,255,255,.04)" }}>
            <span style={{ color: "rgba(255,255,255,.6)", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>Booking ref</span>
            <span className="display tnum" style={{ color: "var(--color-gold2)", fontSize: 18, letterSpacing: ".08em" }}>{bookingRef}</span>
          </div>
        </div>
      </section>

      {/* tarjeta resumen */}
      <div className="wrap" style={{ padding: "0 40px", marginTop: -56, position: "relative", zIndex: 2 }}>
        <article className="card card--raise" aria-label="Resumen de la reserva" style={{ maxWidth: 720, margin: "0 auto", overflow: "hidden", background: "#fff" }}>
          <div className="confirm-card-grid grid grid-cols-1 sm:grid-cols-[200px_1fr]">
            <Img label={room.name} decorative style={{ minHeight: 200 }} />
            <div style={{ padding: "26px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{HOTEL} · {UBICACION}</div>
                  <h2 className="display" style={{ fontSize: 26, margin: "0 0 6px" }}>{room.name}</h2>
                  <span className="badge badge--soft">{room.type}</span>
                </div>
                <span className="badge badge--avail"><span className="dot" aria-hidden="true" />Confirmed</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-[18px]" style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid var(--line-2)" }}>
                <StatCell label="Guest" value={datos.name || "—"} />
                <StatCell label="Check-in" value={fmtShort(search.checkIn)} sub={fmtLong(search.checkIn).split(",")[0]} />
                <StatCell label="Check-out" value={fmtShort(search.checkOut)} sub={fmtLong(search.checkOut).split(",")[0]} />
                <StatCell label="Guests" value={guests + " guest" + (guests > 1 ? "s" : "")} />
                <StatCell label="Nights" value={totals.noches} />
                <StatCell label="Total paid" value={money(totals.total)} highlight />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3" style={{ padding: "20px 28px", borderTop: "1px solid var(--line)", background: "var(--color-paper)" }}>
            <button type="button" className="btn btn--navy" onClick={() => window.print()}><Icon name="download" size={17} /> Download Confirmation PDF</button>
            <button type="button" className="btn btn--ghost" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </article>
      </div>

      {/* PRÓXIMOS PASOS */}
      <section className="wrap section" style={{ paddingTop: 80 }}>
        <SectionHead align="center" eyebrow="Before you arrive" title="Helpful next steps" sub="A few things to make your stay seamless from the moment you land." />
        <ul className="nextsteps-grid grid grid-cols-1 md:grid-cols-3 gap-[22px]" style={{ listStyle: "none", margin: 0, padding: 0, marginTop: 44 }}>
          {NEXT_STEPS.map(([ic, t, body, cta]) => (
            <li key={t}><NextStepCard icon={ic} title={t} body={body} cta={cta} /></li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
}
