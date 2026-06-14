/* Tarjeta de "próximos pasos" tras confirmar la reserva. */
import { Icon } from "../Icon.jsx";

export function NextStepCard({ icon, title, body, cta }) {
  return (
    <article className="card" style={{ padding: 28, display: "flex", flexDirection: "column", height: "100%" }}>
      <span style={{ width: 50, height: 50, borderRadius: 999, background: "var(--color-navy-900)", color: "var(--color-gold2)", display: "grid", placeItems: "center", marginBottom: 18 }}>
        <Icon name={icon} size={23} />
      </span>
      <h3 className="display" style={{ fontSize: 19, margin: "0 0 10px" }}>{title}</h3>
      <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{body}</p>
      <button type="button" className="btn btn--ghost" style={{ alignSelf: "flex-start" }}>
        {cta} <Icon name="arrowRight" size={15} />
      </button>
    </article>
  );
}
