/* Pie de página del sitio. */
import { Link } from "react-router-dom";
import { HOTEL, UBICACION } from "@shared/data/hotel.js";

const NAV_COLS = [
  { h: "Explore", items: ["Rooms & Suites", "Dining", "Spa & Wellness", "Experiences"] },
  { h: "Guests", items: ["Reservations", "Online Check-in", "Concierge", "FAQ"] },
];

const linkBtn = { fontSize: 14.5, color: "rgba(255,255,255,.7)", background: "none", border: 0, padding: 0, cursor: "pointer", textAlign: "left" };

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap" style={{ padding: "72px 40px 0" }}>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
              <span className="logo" style={{ color: "#fff", fontSize: 20 }}>
                <svg className="logo__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke="var(--color-gold2)" strokeWidth="1.4" />
                  <path d="M16 7l5.5 12.5h-3.1L16 13.4l-2.4 6.1h-3.1L16 7Z" fill="var(--color-gold2)" />
                  <path d="M11 22.5h10" stroke="var(--color-gold2)" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                AURELIA
              </span>
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(255,255,255,.6)", maxWidth: 290, margin: 0 }}>
              A modern grand hotel on Lisbon's most storied avenue — where understated luxury meets effortless warmth.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="eyebrow on-dark" style={{ marginBottom: 16 }}>{HOTEL}</h2>
            <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5, color: "rgba(255,255,255,.7)" }}>
              <span>Avenida da Liberdade</span>
              <span>{UBICACION}</span>
              <a href="tel:+351210000000" style={{ color: "rgba(255,255,255,.7)" }}>+351 21 000 0000</a>
            </address>
          </div>

          {/* Navegación */}
          {NAV_COLS.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h2 className="eyebrow on-dark" style={{ marginBottom: 16 }}>{c.h}</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {c.items.map((it) => (
                  <li key={it}>
                    <button type="button" style={linkBtn}>{it}</button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center" style={{ marginTop: 56, padding: "24px 0", borderTop: "1px solid rgba(255,255,255,.12)" }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>© 2026 {HOTEL}. All rights reserved.</span>
          <nav aria-label="Legal" style={{ display: "flex", gap: 26 }}>
            {["Privacy", "Terms", "Cookies"].map((x) => (
              <button key={x} type="button" style={{ ...linkBtn, fontSize: 13, color: "rgba(255,255,255,.5)" }}>{x}</button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
