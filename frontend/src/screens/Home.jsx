/* Pantalla 1 — Home / Landing. */
import { useNavigate } from "react-router-dom";
import { TopNav } from "../components/TopNav.jsx";
import { Footer } from "../components/Footer.jsx";
import { Img } from "../components/ui/Img.jsx";
import { SectionHead } from "../components/ui/SectionHead.jsx";
import { Icon } from "../components/Icon.jsx";
import { SearchForm } from "../components/search/SearchForm.jsx";
import { FeaturedRoomCard } from "../components/rooms/FeaturedRoomCard.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { useToast } from "../components/Toast.jsx";
import { HABITACIONES } from "@shared/data/habitaciones.js";
import { UBICACION } from "@shared/data/hotel.js";
import buscarDisponibilidad from "@shared/logic/buscarDisponibilidad.js";

const EXPERIENCIAS = [
  ["pool", "Rooftop pool & spa"],
  ["concierge", "24/7 concierge"],
  ["breakfast", "Garden breakfast"],
  ["key", "Contactless check-in"],
];

export default function Home() {
  const navigate = useNavigate();
  const toast = useToast();
  const { search, setSearch, setRoom } = useBooking();

  const featured = HABITACIONES.filter((r) => ["classic-double", "deluxe-king", "junior-suite"].includes(r.id));

  function onSearch() {
    try {
      // CU-01 — valida los criterios; lanza Error si algo es inválido.
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
  }

  function openRoom(room) {
    setRoom(room);
    navigate("/rooms/" + room.id);
  }

  return (
    <div className="screen">
      <TopNav dark active="Home" />

      {/* HERO */}
      <section style={{ position: "relative", marginTop: -78 }}>
        <Img label="hero · luxury hotel façade at dusk" tone="ph--dark" style={{ height: "clamp(600px, 86vh, 840px)", minHeight: 540 }}>
          <div className="scrim" />
        </Img>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div className="wrap" style={{ paddingBottom: 70 }}>
            <div className="eyebrow on-dark fade-in" style={{ marginBottom: 22 }}>{UBICACION} · Est. 1924</div>
            <h1 className="display-thin fade-in hero-title text-4xl sm:text-5xl md:text-[72px]" style={{ color: "#fff", margin: 0, maxWidth: 880, lineHeight: 1.05 }}>
              A grand hotel,<br />quietly reimagined.
            </h1>
            <p className="fade-in" style={{ fontSize: 19, color: "rgba(255,255,255,.82)", maxWidth: 520, lineHeight: 1.6, marginTop: 22 }}>
              Light-filled rooms, a rooftop pool over the rooftops of Lisbon, and a welcome that feels like coming home.
            </p>
          </div>
          <div className="wrap" style={{ transform: "translateY(50%)" }}>
            <SearchForm search={search} setSearch={setSearch} onSubmit={onSearch} floating />
          </div>
        </div>
      </section>

      <div style={{ height: 70 }} />

      {/* FEATURED ROOMS */}
      <section className="wrap section" style={{ paddingTop: 60 }}>
        <div className="flex justify-between items-end flex-wrap gap-4" style={{ marginBottom: 44 }}>
          <SectionHead eyebrow="Rooms & Suites" title="Featured stays" sub="Three of our most-requested rooms, each with Aurelia's signature comforts." />
          <button className="btn btn--ghost" onClick={() => navigate("/rooms")} style={{ flex: "none" }}>
            View all rooms <Icon name="arrowRight" size={16} />
          </button>
        </div>
        <div className="grid gap-7 grid-cols-1 md:grid-cols-3">
          {featured.map((r) => <FeaturedRoomCard key={r.id} room={r} onOpen={openRoom} />)}
        </div>
      </section>

      {/* EXPERIENCE STRIP */}
      <section style={{ background: "var(--color-navy-900)" }}>
        <div className="wrap grid gap-16 items-center grid-cols-1 md:grid-cols-[1.1fr_1fr]" style={{ padding: "84px 40px" }}>
          <div>
            <SectionHead
              eyebrow="The Aurelia Way"
              title="Every detail, considered."
              onDark
              sub="From the linen on your bed to the light at golden hour on the terrace — we obsess over the small things so your stay feels effortless."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7" style={{ marginTop: 40 }}>
              {EXPERIENCIAS.map(([ic, t]) => (
                <div key={t} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", border: "1px solid var(--line-on-dark)", color: "var(--color-gold2)", flex: "none" }}>
                    <Icon name={ic} size={20} />
                  </span>
                  <span style={{ color: "#fff", fontSize: 15.5, fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <Img label="terrace · rooftop pool" tone="ph--dark" style={{ height: 420, borderRadius: "var(--radius-aurelia-lg)" }} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
