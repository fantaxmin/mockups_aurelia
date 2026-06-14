/* Grupo de filtros con título (precio, tipo, amenidades, calificación). */
export function FilterGroup({ title, children, last }) {
  return (
    <div style={{ padding: "18px 0", borderBottom: last ? "0" : "1px solid var(--line-2)" }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 14 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
