/* Placeholder de imagen con etiqueta (representa una foto del hotel). */
export function Img({ label, tone = "", className = "", style, children, onClick }) {
  return (
    <div className={"ph " + tone + " " + className} style={style} onClick={onClick}>
      {label ? <span className="ph__label">{label}</span> : null}
      {children}
    </div>
  );
}
