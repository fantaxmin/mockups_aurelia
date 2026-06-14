/* Tarjeta de reserva (sticky) con selección de fechas/huéspedes y desglose. */
import { Counter } from "../ui/Counter.jsx";
import { Icon } from "../Icon.jsx";
import { money, sumarDias } from "../../lib/format.js";
import calcularPrecio from "@shared/logic/calcularPrecio.js";

export function BookingCard({ room, search, setSearch, onConfirm }) {
  // CU-03 — desglose del precio (las fechas siempre son válidas en esta vista).
  const totals = calcularPrecio(search.checkIn, search.checkOut, room.price);
  const guests = search.adults + search.children;

  return (
    <div className="card card--raise" style={{ padding: 24, background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 4 }}>
        <div style={{ whiteSpace: "nowrap" }}>
          <span className="display" style={{ fontSize: 30 }}>{money(room.price)}</span>
          <span className="muted"> / night</span>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, flex: "none" }}>
          <Icon name="star" size={14} style={{ color: "var(--color-gold)" }} /><b className="tnum">{room.rating}</b>
        </span>
      </div>
      <p className="muted" style={{ fontSize: 12.5, margin: "2px 0 18px" }}>Best available rate · free cancellation</p>

      {/* fechas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--line)", borderRadius: "var(--radius-aurelia)", overflow: "hidden" }}>
        <label style={{ padding: "11px 14px", borderRight: "1px solid var(--line)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--color-muted)" }}>Check-in</div>
          <input
            type="date"
            value={search.checkIn}
            onChange={(e) => {
              const ci = e.target.value;
              setSearch({ ...search, checkIn: ci, checkOut: ci >= search.checkOut ? sumarDias(ci, 1) : search.checkOut });
            }}
            style={{ border: 0, outline: 0, fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 600, width: "100%", padding: 0, marginTop: 3, background: "transparent" }}
          />
        </label>
        <label style={{ padding: "11px 14px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--color-muted)" }}>Check-out</div>
          <input
            type="date"
            min={sumarDias(search.checkIn, 1)}
            value={search.checkOut}
            onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
            style={{ border: 0, outline: 0, fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 600, width: "100%", padding: 0, marginTop: 3, background: "transparent" }}
          />
        </label>
      </div>

      {/* huéspedes */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid var(--line)", borderTop: 0, borderRadius: "0 0 var(--radius-aurelia) var(--radius-aurelia)", padding: "10px 14px", marginTop: -1, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--color-muted)" }}>Guests</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 3 }}>{guests} guest{guests > 1 ? "s" : ""}</div>
        </div>
        <Counter value={search.adults} min={1} max={room.sleeps + 2} onChange={(v) => setSearch({ ...search, adults: v })} />
      </div>

      {/* desglose */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14.5, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="muted" style={{ borderBottom: "1px dashed var(--line)" }}>{money(room.price)} × {totals.noches} nights</span>
          <span className="tnum" style={{ fontWeight: 600 }}>{money(totals.subtotal)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="muted">Taxes (12%)</span>
          <span className="tnum" style={{ fontWeight: 600 }}>{money(totals.impuestos)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="muted">Service fee</span>
          <span className="tnum" style={{ fontWeight: 600 }}>{money(totals.cargoServicio)}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0 18px" }}>
        <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
        <span className="display tnum" style={{ fontSize: 26 }}>{money(totals.total)}</span>
      </div>

      <button type="button" className="btn btn--gold btn--lg btn--block" onClick={() => onConfirm(totals)}>Confirm Reservation</button>
      <div className="muted" style={{ fontSize: 12, textAlign: "center", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Icon name="lock" size={13} /> You won't be charged yet
      </div>
    </div>
  );
}
