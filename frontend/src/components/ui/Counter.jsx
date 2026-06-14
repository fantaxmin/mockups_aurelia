/* Contador +/- (huéspedes, habitaciones). */
import { Icon } from "../Icon.jsx";

export function Counter({ value, onChange, min = 1, max = 9 }) {
  return (
    <div className="counter">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="disminuir">
        <Icon name="minus" size={16} />
      </button>
      <span className="counter__val tnum">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="aumentar">
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
