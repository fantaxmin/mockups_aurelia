/* Tarjeta de resultado de búsqueda (listado de habitaciones disponibles). */
import { Img } from "../ui/Img.jsx";
import { Icon } from "../Icon.jsx";
import { Stars } from "../Stars.jsx";
import { money, noches } from "../../lib/format.js";
import { AMENIDADES } from "@shared/data/habitaciones.js";

export function ResultCard({ room, search, onOpen, onReserve }) {
  const n = noches(search.checkIn, search.checkOut);
  return (
    <article className="card result-card grid grid-cols-1 md:grid-cols-[300px_1fr] overflow-hidden transition-shadow hover:shadow-[var(--shadow-md)]">
      <Img label={room.name} style={{ minHeight: 232 }} onClick={() => onOpen(room)}>
        <span style={{ position: "absolute", top: 14, left: 14 }}>
          <span className="badge badge--avail"><span className="dot" />Available · {room.badge}</span>
        </span>
      </Img>
      <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
              <span className="badge badge--soft">{room.type}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <Stars value={room.rating} size={14} />
                <span className="tnum" style={{ fontWeight: 600 }}>{room.rating}</span>
                <span className="muted">({room.reviews})</span>
              </span>
            </div>
            <h3 className="display" style={{ fontSize: 22, margin: "0 0 6px", cursor: "pointer" }} onClick={() => onOpen(room)}>{room.name}</h3>
            <div className="muted" style={{ fontSize: 13.5, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="bed" size={15} />{room.beds}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="users" size={15} />Sleeps {room.sleeps}</span>
              <span className="tnum">{room.sqm} m²</span>
            </div>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.55, margin: "14px 0 16px" }}>{room.blurb}</p>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 18 }}>
          {room.amenities.slice(0, 5).map((a) => (
            <span key={a} style={{ color: "var(--color-goldink)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
              <Icon name={a} size={16} />{AMENIDADES[a]}
            </span>
          ))}
          {room.amenities.length > 5 ? <span className="muted" style={{ fontSize: 12.5, alignSelf: "center" }}>+{room.amenities.length - 5} more</span> : null}
        </div>
        <div className="flex flex-wrap gap-4 items-end justify-between" style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line-2)" }}>
          <div>
            <span className="display" style={{ fontSize: 25 }}>{money(room.price)}</span>
            <span className="muted" style={{ fontSize: 13.5 }}> / night</span>
            <div className="muted" style={{ fontSize: 12.5 }}>{money(room.price * n)} total · {n} nights</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--ghost" onClick={() => onOpen(room)}>Details</button>
            <button className="btn btn--gold" onClick={() => onReserve(room)}>Reserve</button>
          </div>
        </div>
      </div>
    </article>
  );
}
