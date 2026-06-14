/* Celda de dato del resumen de reserva (etiqueta + valor + subtítulo). */
export function SummaryCell({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontWeight: 600, fontSize: 15 }}>
        {value}
        {sub ? <span className="muted" style={{ fontWeight: 400, fontSize: 12 }}> · {sub}</span> : null}
      </div>
    </div>
  );
}
