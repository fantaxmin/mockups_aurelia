/* Tarjeta de reseña de un huésped. */
import { Stars } from "../Stars.jsx";

export function ReviewCard({ review }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 12 }}>
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "var(--color-navy-900)",
            color: "var(--color-gold2)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {review.initials}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{review.name}</div>
          <div className="muted" style={{ fontSize: 12.5 }}>{review.date}</div>
        </div>
        <Stars value={review.rating} size={15} />
      </div>
      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "var(--color-ink)" }}>“{review.text}”</p>
    </div>
  );
}
