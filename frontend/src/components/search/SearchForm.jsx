/* Formulario de búsqueda de disponibilidad (destino, fechas, huéspedes). */
import { useState } from "react";
import { FieldCell } from "./FieldCell.jsx";
import { Counter } from "../ui/Counter.jsx";
import { Icon } from "../Icon.jsx";
import { sumarDias } from "../../lib/format.js";

export function SearchForm({ search, setSearch, onSubmit, floating }) {
  const [guestsOpen, setGuestsOpen] = useState(false);
  const totalGuests = search.adults + search.children;
  const guestLabel = totalGuests + " guest" + (totalGuests > 1 ? "s" : "");

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="card search-form grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.1fr_auto]"
      style={{
        alignItems: "stretch",
        padding: 8,
        background: "#fff",
        boxShadow: floating ? "var(--shadow-lg)" : "var(--shadow-md)",
        borderColor: "transparent",
        borderRadius: "var(--radius-aurelia-lg)",
      }}
    >
      <FieldCell icon="pin" label="Destination" htmlFor="sf-destination">
        <input id="sf-destination" className="sf-input" aria-label="Destination" value={search.destination} onChange={(e) => setSearch({ ...search, destination: e.target.value })} placeholder="Where to?" />
      </FieldCell>
      <FieldCell icon="cal" label="Check-in" htmlFor="sf-checkin" divider>
        <input
          id="sf-checkin"
          type="date"
          className="sf-input"
          aria-label="Check-in date"
          value={search.checkIn}
          onChange={(e) => {
            const ci = e.target.value;
            setSearch({ ...search, checkIn: ci, checkOut: ci >= search.checkOut ? sumarDias(ci, 1) : search.checkOut });
          }}
        />
      </FieldCell>
      <FieldCell icon="cal" label="Check-out" htmlFor="sf-checkout" divider>
        <input id="sf-checkout" type="date" className="sf-input" aria-label="Check-out date" min={sumarDias(search.checkIn, 1)} value={search.checkOut} onChange={(e) => setSearch({ ...search, checkOut: e.target.value })} />
      </FieldCell>
      <div className="relative md:border-l" style={{ borderColor: "var(--line-2)" }}>
        <FieldCell icon="users" label="Guests">
          <button
            type="button"
            className="sf-input"
            aria-label="Seleccionar huéspedes y habitaciones"
            aria-haspopup="true"
            aria-expanded={guestsOpen}
            style={{ textAlign: "left", background: "transparent", border: 0, padding: 0, color: "var(--color-ink)" }}
            onClick={() => setGuestsOpen((v) => !v)}
          >
            {guestLabel}{search.rooms > 1 ? " · " + search.rooms + " rooms" : ""}
          </button>
        </FieldCell>
        {guestsOpen ? (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setGuestsOpen(false)} />
            <div className="card card--raise" style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, width: 290, padding: 18, zIndex: 11, background: "#fff" }}>
              {[["adults", "Adults", "Ages 13+"], ["children", "Children", "Ages 0–12"], ["rooms", "Rooms", ""]].map(([k, lab, sub]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: k !== "rooms" ? "1px solid var(--line-2)" : "0" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14.5 }}>{lab}</div>
                    {sub ? <div className="muted" style={{ fontSize: 12.5 }}>{sub}</div> : null}
                  </div>
                  <Counter value={search[k]} min={k === "adults" || k === "rooms" ? 1 : 0} max={k === "rooms" ? 5 : 9} onChange={(v) => setSearch({ ...search, [k]: v })} />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <button className="btn btn--gold btn--lg" type="submit" style={{ borderRadius: "var(--radius-aurelia)", margin: 0 }}>
        <Icon name="search" size={18} /> Search Availability
      </button>
    </form>
  );
}
