/* Formulario de búsqueda de disponibilidad (destino, fechas, huéspedes). */
import { useEffect, useRef, useState } from "react";
import { FieldCell } from "./FieldCell.jsx";
import { Counter } from "../ui/Counter.jsx";
import { Icon } from "../Icon.jsx";
import { sumarDias, hoyISO } from "../../lib/format.js";
import { getDestinos } from "../../lib/api.js";
import { NOMBRES_DESTINO, esDestinoValido } from "@shared/data/destinos.js";

export function SearchForm({ search, setSearch, onSubmit, floating }) {
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [guestsUp, setGuestsUp] = useState(false);
  const [destinos, setDestinos] = useState(NOMBRES_DESTINO);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const guestsCellRef = useRef(null);

  // Abre/cierra el popover de huéspedes; al abrir decide si desplegar hacia
  // arriba cuando no hay espacio suficiente abajo (p. ej. buscador flotante).
  function toggleGuests() {
    setGuestsOpen((open) => {
      if (!open) {
        const rect = guestsCellRef.current?.getBoundingClientRect();
        const espacioAbajo = window.innerHeight - (rect?.bottom ?? 0);
        setGuestsUp(espacioAbajo < 320);
      }
      return !open;
    });
  }

  // Consume el catálogo desde la tabla SQLite (vía API). Si el backend no
  // responde, se mantiene la lista local importada como respaldo.
  useEffect(() => {
    let activo = true;
    getDestinos("", 50)
      .then((lista) => { if (activo && Array.isArray(lista) && lista.length) setDestinos(lista); })
      .catch(() => { /* fallback: DESTINOS local */ });
    return () => { activo = false; };
  }, []);

  const hoy = hoyISO();
  const totalGuests = search.adults + search.children;
  const guestLabel = totalGuests + " guest" + (totalGuests > 1 ? "s" : "");
  const destinoInvalido = search.destination.trim() !== "" && !esDestinoValido(search.destination);

  // Abre el selector de fecha nativo desde cualquier punto de la celda.
  function abrirPicker(ref) {
    const el = ref.current;
    if (!el) return;
    el.focus();
    try { el.showPicker?.(); } catch { /* ya abierto o no soportado */ }
  }

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
        // .card aplica overflow:hidden y recortaba el popover de huéspedes.
        overflow: "visible",
      }}
    >
      <FieldCell icon="pin" label="Destination" htmlFor="sf-destination">
        <input
          id="sf-destination"
          className="sf-input"
          aria-label="Destination"
          list="sf-destinos"
          autoComplete="off"
          aria-invalid={destinoInvalido}
          value={search.destination}
          onChange={(e) => setSearch({ ...search, destination: e.target.value })}
          placeholder="Where to? (e.g. Lisbon)"
          style={destinoInvalido ? { color: "var(--color-danger)" } : undefined}
        />
        <datalist id="sf-destinos">
          {destinos.map((d) => <option key={d} value={d} />)}
        </datalist>
      </FieldCell>

      <FieldCell icon="cal" label="Check-in" htmlFor="sf-checkin" divider onActivate={() => abrirPicker(checkInRef)}>
        <input
          id="sf-checkin"
          ref={checkInRef}
          type="date"
          className="sf-input sf-date"
          aria-label="Check-in date"
          min={hoy}
          value={search.checkIn}
          onChange={(e) => {
            const ci = e.target.value;
            setSearch({ ...search, checkIn: ci, checkOut: ci >= search.checkOut ? sumarDias(ci, 1) : search.checkOut });
          }}
        />
      </FieldCell>

      <FieldCell icon="cal" label="Check-out" htmlFor="sf-checkout" divider onActivate={() => abrirPicker(checkOutRef)}>
        <input
          id="sf-checkout"
          ref={checkOutRef}
          type="date"
          className="sf-input sf-date"
          aria-label="Check-out date"
          min={sumarDias(search.checkIn, 1)}
          value={search.checkOut}
          onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
        />
      </FieldCell>

      <div ref={guestsCellRef} className="relative md:border-l" style={{ borderColor: "var(--line-2)" }}>
        <FieldCell icon="users" label="Guests" onActivate={toggleGuests}>
          <button
            type="button"
            className="sf-input"
            aria-label="Seleccionar huéspedes y habitaciones"
            aria-haspopup="true"
            aria-expanded={guestsOpen}
            style={{ textAlign: "left", background: "transparent", border: 0, padding: 0, color: "var(--color-ink)", cursor: "pointer" }}
            onClick={(e) => { e.stopPropagation(); toggleGuests(); }}
          >
            {guestLabel}{search.rooms > 1 ? " · " + search.rooms + " rooms" : ""}
          </button>
        </FieldCell>
        {guestsOpen ? (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setGuestsOpen(false)} />
            <div className="card card--raise" style={{ position: "absolute", [guestsUp ? "bottom" : "top"]: "calc(100% + 12px)", right: 0, width: 290, padding: 18, zIndex: 11, background: "#fff" }} onClick={(e) => e.stopPropagation()}>
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
