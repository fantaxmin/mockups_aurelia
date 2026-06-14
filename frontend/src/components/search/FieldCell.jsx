/* Celda de un campo del formulario de búsqueda (ícono + etiqueta + control). */
import { Icon } from "../Icon.jsx";

export function FieldCell({ icon, label, htmlFor, children, divider }) {
  return (
    <div className={"sf-cell flex items-center gap-3 " + (divider ? "md:border-l" : "")} style={{ padding: "12px 18px", borderColor: "var(--line-2)" }}>
      <span style={{ color: "var(--color-goldink)", flex: "none" }} aria-hidden="true">
        <Icon name={icon} size={19} />
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <label htmlFor={htmlFor} style={{ display: "block", fontSize: 10.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 2 }}>
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
