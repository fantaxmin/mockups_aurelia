/* Encabezado de sección (eyebrow + título + subtítulo). */
export function SectionHead({ eyebrow, title, sub, align = "left", onDark = false }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? 640 : 760, marginInline: align === "center" ? "auto" : 0 }}>
      {eyebrow ? (
        <div className={"eyebrow" + (onDark ? " on-dark" : "")} style={{ marginBottom: 16 }}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className="display" style={{ fontSize: 38, margin: 0, color: onDark ? "#fff" : "var(--color-ink)" }}>
        {title}
      </h2>
      {sub ? (
        <p
          className="muted"
          style={{ fontSize: 16.5, lineHeight: 1.6, marginTop: 14, color: onDark ? "rgba(255,255,255,.7)" : "var(--color-muted)" }}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
