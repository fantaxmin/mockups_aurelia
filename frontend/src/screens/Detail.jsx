/* Pantalla 3 — Detalle de habitación. */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopNav } from "../components/TopNav.jsx";
import { Footer } from "../components/Footer.jsx";
import { Icon } from "../components/Icon.jsx";
import { Stars } from "../components/Stars.jsx";
import { Gallery } from "../components/detail/Gallery.jsx";
import { BookingCard } from "../components/detail/BookingCard.jsx";
import { ReviewCard } from "../components/reviews/ReviewCard.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { HABITACIONES, AMENIDADES } from "@shared/data/habitaciones.js";
import { RESENAS } from "@shared/data/resenas.js";
import { UBICACION } from "@shared/data/hotel.js";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search, setSearch, room, setRoom, setBooking } = useBooking();

  // Resuelve la habitación por el parámetro de URL (soporta enlace directo).
  const habitacion = HABITACIONES.find((r) => r.id === id) || room;

  useEffect(() => {
    if (habitacion && habitacion.id !== room?.id) setRoom(habitacion);
  }, [habitacion, room, setRoom]);

  if (!habitacion) return null;

  function onConfirm(totals) {
    setBooking({ room: habitacion, totals, search: { ...search } });
    navigate("/checkout");
  }

  return (
    <div className="screen" style={{ background: "var(--color-paper)" }}>
      <TopNav active="Rooms" />

      {/* breadcrumb */}
      <div className="wrap" style={{ padding: "22px 40px 0", display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, flexWrap: "wrap" }}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="muted">Home</a>
        <Icon name="chevRight" size={13} />
        <a href="/rooms" onClick={(e) => { e.preventDefault(); navigate("/rooms"); }} className="muted">Rooms</a>
        <Icon name="chevRight" size={13} />
        <span style={{ fontWeight: 600 }}>{habitacion.name}</span>
      </div>

      {/* GALERÍA */}
      <section className="wrap" style={{ padding: "20px 40px 0" }}>
        <Gallery room={habitacion} />
      </section>

      {/* CONTENIDO */}
      <section className="wrap detail-grid grid gap-14 items-start grid-cols-1 lg:grid-cols-[1fr_392px]" style={{ padding: "40px 40px 96px" }}>
        {/* IZQUIERDA */}
        <div>
          <div><span className="badge badge--soft">{habitacion.type}</span></div>
          <h1 className="display display-xl" style={{ fontSize: 40, margin: "14px 0 0" }}>{habitacion.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 16, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Stars value={habitacion.rating} /><span style={{ fontWeight: 700 }} className="tnum">{habitacion.rating}</span>
              <span className="muted">· {habitacion.reviews} reviews</span>
            </span>
            <span className="divider-v" style={{ height: 16 }} />
            <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="pin" size={15} />{UBICACION}</span>
          </div>

          <div className="flex flex-wrap" style={{ gap: 28, marginTop: 26, paddingBottom: 28, borderBottom: "1px solid var(--line)" }}>
            {[["bed", habitacion.beds], ["users", "Sleeps " + habitacion.sleeps], ["expand", habitacion.sqm + " m²"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 42, height: 42, borderRadius: 999, border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--color-goldink)" }}>
                  <Icon name={ic} size={19} />
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>

          <h2 className="display" style={{ fontSize: 22, margin: "32px 0 12px" }}>About this room</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-ink)", margin: 0, maxWidth: 620 }}>{habitacion.desc}</p>

          <h2 className="display" style={{ fontSize: 22, margin: "38px 0 18px" }}>Amenities</h2>
          <div className="amenities-grid grid grid-cols-1 sm:grid-cols-2" style={{ gap: "16px 24px", maxWidth: 560 }}>
            {habitacion.amenities.map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "var(--color-goldink)" }}><Icon name={a} size={20} /></span>
                <span style={{ fontSize: 14.5 }}>{AMENIDADES[a]}</span>
              </div>
            ))}
          </div>

          {/* RESEÑAS */}
          <div style={{ marginTop: 46, paddingTop: 38, borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
              <h2 className="display" style={{ fontSize: 22, margin: 0 }}>Guest reviews</h2>
              <span className="badge badge--gold"><Icon name="star" size={13} />{habitacion.rating} · {habitacion.reviews} reviews</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {RESENAS.map((rv) => <ReviewCard key={rv.name} review={rv} />)}
            </div>
          </div>
        </div>

        {/* DERECHA — tarjeta de reserva sticky */}
        <aside className="detail-aside lg:sticky" style={{ top: 96 }}>
          <BookingCard room={habitacion} search={search} setSearch={setSearch} onConfirm={onConfirm} />
        </aside>
      </section>
      <Footer />
    </div>
  );
}
