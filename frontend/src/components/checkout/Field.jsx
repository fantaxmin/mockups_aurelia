/* Campo de formulario con etiqueta asociada, error y/o pista accesibles. */
export function Field({ label, htmlFor, children, error, hint }) {
  const errorId = htmlFor ? htmlFor + "-error" : undefined;
  const hintId = htmlFor ? htmlFor + "-hint" : undefined;
  return (
    <div className="field">
      <label className="field__label" htmlFor={htmlFor}>{label}</label>
      {children}
      {error ? (
        <span className="field__error" id={errorId} role="alert">{error}</span>
      ) : hint ? (
        <span className="muted" id={hintId} style={{ fontSize: 12 }}>{hint}</span>
      ) : null}
    </div>
  );
}
