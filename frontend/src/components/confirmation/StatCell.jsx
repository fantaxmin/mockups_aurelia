/* Celda de dato de la tarjeta de confirmación (etiqueta + valor + subtítulo). */
export function StatCell({ label, value, sub, highlight }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 5 }}>
        {label}
      </div>
      <div className="display tnum" style={{ fontSize: highlight ? 19 : 16, color: highlight ? "var(--color-goldink)" : "var(--color-ink)" }}>
        {value}
      </div>
      {sub ? <div className="muted" style={{ fontSize: 12 }}>{sub}</div> : null}
    </div>
  );
}
