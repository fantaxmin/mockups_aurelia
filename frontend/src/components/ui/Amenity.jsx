/* Amenidad en línea (ícono + etiqueta). */
import { AMENIDADES } from "@shared/data/habitaciones.js";
import { Icon } from "../Icon.jsx";

export function Amenity({ akey, label }) {
  const lbl = label || AMENIDADES[akey] || akey;
  return (
    <span className="amen">
      <Icon name={akey} size={16} />
      {lbl}
    </span>
  );
}
