/* Campo de formulario con etiqueta, error y/o pista. */
export function Field({ label, children, error, hint }) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      {children}
      {error ? <span className="field__error">{error}</span> : hint ? <span className="muted" style={{ fontSize: 12 }}>{hint}</span> : null}
    </div>
  );
}
