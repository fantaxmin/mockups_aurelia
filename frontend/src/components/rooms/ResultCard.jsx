/* Tarjeta de resultado de búsqueda (listado de habitaciones disponibles). */
import { Link } from "react-router-dom";
import { Img } from "../ui/Img.jsx";
import { Icon } from "../Icon.jsx";
import { Stars } from "../Stars.jsx";
import { money, noches } from "../../lib/format.js";
import { AMENIDADES } from "@shared/data/habitaciones.js";
import { destinoPorId, nombreDestino } from "@shared/data/destinos.js";

export function ResultCard({ room, search, onOpen, onReserve }) {
  const n = noches(search.checkIn, search.checkOut);
  const ubicacion = nombreDestino(destinoPorId(room.destinoId));
  return (
    <article className="card result-card grid grid-cols-1 md:grid-cols-[300px_1fr] overflow-hidden transition-shadow hover:shadow-[var(--shadow-md)]">
      <div style={{ position: "relative" }}>
        <Img label={room.name} decorative style={{ minHeight: 232, height: "100%" }} />
        <span style={{ position: "absolute", top: 14, left: 14 }}>
          <span className="badge badge--avail"><span className="dot" aria-hidden="true" />Available · {room.badge}</span>
        </span>
      </div>
      <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
              <span className="badge badge--soft">{room.type}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <Stars value={room.rating} size={14} />
                <span className="tnum" style={{ fontWeight: 600 }}>{room.rating}</span>
                <span className="muted">({room.reviews} reviews)</span>
              </span>
            </div>
            <h3 className="display" style={{ fontSize: 22, margin: "0 0 4px" }}>
              <Link to={"/rooms/" + room.id} style={{ color: "inherit" }}>{room.name}</Link>
            </h3>
            {ubicacion ? (
              <p style={{ display: "inline-flex", alignItems: "center", gap: 6, margin: "0 0 8px", fontSize: 13, color: "var(--color-goldink)", fontWeight: 600 }}>
                <Icon name="pin" size={14} />{ubicacion}
              </p>
            ) : null}
            <ul className="muted" style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 13.5, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <li style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="bed" size={15} />{room.beds}</li>
              <li style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="users" size={15} />Sleeps {room.sleeps}</li>
              <li className="tnum">{room.sqm} m²</li>
            </ul>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.55, margin: "14px 0 16px" }}>{room.blurb}</p>
        <ul style={{ listStyle: "none", margin: "0 0 18px", padding: 0, display: "flex", gap: 18, flexWrap: "wrap" }}>
          {room.amenities.slice(0, 5).map((a) => (
            <li key={a} style={{ color: "var(--color-goldink)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
              <Icon name={a} size={16} />{AMENIDADES[a]}
            </li>
          ))}
          {room.amenities.length > 5 ? <li className="muted" style={{ fontSize: 12.5, alignSelf: "center" }}>+{room.amenities.length - 5} more</li> : null}
        </ul>
        <div className="flex flex-wrap gap-4 items-end justify-between" style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line-2)" }}>
          <p style={{ margin: 0 }}>
            <span className="display" style={{ fontSize: 25 }}>{money(room.price)}</span>
            <span className="muted" style={{ fontSize: 13.5 }}> / night</span>
            <span className="muted" style={{ fontSize: 12.5, display: "block" }}>{money(room.price * n)} total · {n} nights</span>
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="btn btn--ghost" onClick={() => onOpen(room)}>Details</button>
            <button type="button" className="btn btn--gold" onClick={() => onReserve(room)}>Reserve</button>
          </div>
        </div>
      </div>
    </article>
  );
}
