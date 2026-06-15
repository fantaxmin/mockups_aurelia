/* Placeholder de imagen con etiqueta (representa una foto del hotel).
   Semánticamente es una imagen: role="img" + aria-label. Si no tiene etiqueta
   es puramente decorativa y se oculta a lectores de pantalla. */
export function Img({ label, tone = "", className = "", style, children, decorative = false }) {
  const accesible = label && !decorative;
  return (
    <div
      className={"ph " + tone + " " + className}
      style={style}
      role={accesible ? "img" : undefined}
      aria-label={accesible ? label : undefined}
      aria-hidden={accesible ? undefined : true}
    >
      {label ? <span className="ph__label">{label}</span> : null}
      {children}
    </div>
  );
}
