/* Sellos de confianza del checkout (seguridad, cancelación, soporte). */
import { Icon } from "../Icon.jsx";

const BADGES = [
  ["shield", "Secure booking", "256-bit SSL encryption"],
  ["cancel", "Free cancellation", "Until 24h before arrival"],
  ["support", "24/7 support", "Concierge on call"],
];

export function TrustBadges() {
  return (
    <div className="trust-grid grid grid-cols-1 sm:grid-cols-3 gap-3.5" style={{ marginTop: 34 }}>
      {BADGES.map(([ic, t, s]) => (
        <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "16px", border: "1px solid var(--line)", borderRadius: "var(--radius-aurelia)", background: "#fff" }}>
          <span style={{ color: "var(--color-goldink)", flex: "none" }}><Icon name={ic} size={22} /></span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>{t}</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
