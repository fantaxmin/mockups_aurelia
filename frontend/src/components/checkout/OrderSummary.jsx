/* Resumen permanente de la reserva (sticky en el checkout). */
import { Img } from "../ui/Img.jsx";
import { Icon } from "../Icon.jsx";
import { SummaryCell } from "./SummaryCell.jsx";
import { money, fmtShort, nombreDia } from "../../lib/format.js";
import { HOTEL } from "@shared/data/hotel.js";

export function OrderSummary({ booking }) {
  const { room, totals, search } = booking;
  const guests = search.adults + search.children;
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <Img label={room.name} style={{ height: 150 }} />
      <div style={{ padding: 22 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{HOTEL}</div>
        <h3 className="display" style={{ fontSize: 20, margin: "0 0 4px" }}>{room.name}</h3>
        <span className="badge badge--soft">{room.type}</span>

        <div className="grid grid-cols-2 gap-3" style={{ margin: "18px 0", padding: "16px 0", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
          <SummaryCell label="Check-in" value={fmtShort(search.checkIn)} sub={nombreDia(search.checkIn)} />
          <SummaryCell label="Check-out" value={fmtShort(search.checkOut)} sub={nombreDia(search.checkOut)} />
          <SummaryCell label="Guests" value={guests + " guest" + (guests > 1 ? "s" : "")} />
          <SummaryCell label="Nights" value={totals.noches + " night" + (totals.noches > 1 ? "s" : "")} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="muted">{money(room.price)} × {totals.noches}</span>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontWeight: 700 }}>Total <span className="muted" style={{ fontWeight: 400, fontSize: 12.5 }}>incl. taxes</span></span>
          <span className="display tnum" style={{ fontSize: 24 }}>{money(totals.total)}</span>
        </div>
        <div style={{ marginTop: 16, padding: "11px 14px", background: "color-mix(in oklab, var(--color-success) 9%, white)", borderRadius: "var(--radius-aurelia)", display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#1c5f41", fontWeight: 500 }}>
          <Icon name="cancel" size={16} /> Free cancellation until 24h before check-in
        </div>
      </div>
    </div>
  );
}
