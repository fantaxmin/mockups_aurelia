/* Select nativo estilizado con ícono de chevron. */
import { Icon } from "../Icon.jsx";

export function Select({ value, onChange, children, error, ...p }) {
  return (
    <div className="select-wrap">
      <select className={"select" + (error ? " select--error" : "")} value={value} onChange={onChange} {...p}>
        {children}
      </select>
      <span className="select-wrap__chev">
        <Icon name="chevDown" size={16} />
      </span>
    </div>
  );
}
