/* Calificación con estrellas (soporta media estrella) sobre lucide-react. */
import { Star, StarHalf } from "lucide-react";

const GOLD = "var(--color-gold)";
const EMPTY = "rgba(20,35,57,.16)";

export function Stars({ value = 0, size = 15 }) {
  const items = [];
  for (let i = 1; i <= 5; i++) {
    const diff = value - i;
    let icon;
    if (diff >= 0) {
      icon = <Star size={size} color={GOLD} fill={GOLD} />;
    } else if (diff > -1) {
      // media estrella sobre una vacía
      icon = (
        <span style={{ position: "relative", width: size, height: size, display: "inline-block" }}>
          <span style={{ position: "absolute", inset: 0, color: EMPTY }}>
            <Star size={size} color={EMPTY} fill={EMPTY} />
          </span>
          <span style={{ position: "absolute", inset: 0 }}>
            <StarHalf size={size} color={GOLD} fill={GOLD} />
          </span>
        </span>
      );
    } else {
      icon = <Star size={size} color={EMPTY} fill={EMPTY} />;
    }
    items.push(
      <span key={i} style={{ display: "inline-flex" }}>
        {icon}
      </span>
    );
  }
  return (
    <span className="stars" aria-label={value + " stars"}>
      {items}
    </span>
  );
}
