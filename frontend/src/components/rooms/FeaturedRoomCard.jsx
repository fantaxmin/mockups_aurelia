/* Tarjeta de habitación destacada (sección "Featured stays" del Home). */
import { Link } from "react-router-dom";
import { Img } from "../ui/Img.jsx";
import { Stars } from "../Stars.jsx";
import { money } from "../../lib/format.js";

export function FeaturedRoomCard({ room, onOpen }) {
  return (
    <article className="card flex flex-col transition-transform hover:-translate-y-1">
      <Img label={room.name + " · photo"} decorative style={{ height: 248 }} />
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
          <span className="badge badge--soft"><span className="dot" style={{ color: "var(--color-gold)" }} aria-hidden="true" />{room.type}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-muted)" }}>
            <Stars value={room.rating} size={14} />
            <span className="tnum" style={{ fontWeight: 600, color: "var(--color-ink)" }}>{room.rating}</span>
          </span>
        </div>
        <h3 className="display" style={{ fontSize: 23, margin: "0 0 8px" }}>
          <Link to={"/rooms/" + room.id} style={{ color: "inherit" }}>{room.name}</Link>
        </h3>
        <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{room.blurb}</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
          <p style={{ margin: 0 }}>
            <span className="display" style={{ fontSize: 26 }}>{money(room.price)}</span>
            <span className="muted" style={{ fontSize: 13.5 }}> / night</span>
          </p>
          <button type="button" className="btn btn--navy" onClick={() => onOpen(room)} style={{ padding: "12px 22px" }}>
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}
