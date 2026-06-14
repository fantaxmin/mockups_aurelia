/* Checkbox estilizado con etiqueta y conteo opcional. */
import { Icon } from "../Icon.jsx";

export function Check({ checked, onChange, label, count }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="check__box">
        <Icon name="checkSmall" size={12} sw={2.6} />
      </span>
      <span className="check__label">{label}</span>
      {count != null ? <span className="check__count tnum">{count}</span> : null}
    </label>
  );
}
