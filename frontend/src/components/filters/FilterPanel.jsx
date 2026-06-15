/* Panel lateral de filtros de la pantalla de resultados (CU-02). */
import { FilterGroup } from "./FilterGroup.jsx";
import { Check } from "../ui/Check.jsx";
import { Stars } from "../Stars.jsx";
import { money } from "../../lib/format.js";
import { AMENIDADES, TIPOS_HABITACION } from "@shared/data/habitaciones.js";

const AMEN_LISTA = ["wifi", "ac", "pool", "parking", "breakfast"];

export function FilterPanel({ min, max, maxPrice, setMaxPrice, types, setTypes, amen, setAmen, minRating, setMinRating, typeCounts, activeCount, onReset }) {
  const toggle = (val, list, set) => set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  return (
    <div className="card" style={{ padding: "22px 22px 8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h3 className="display" style={{ fontSize: 18, margin: 0 }}>Filters</h3>
        {activeCount > 0 ? (
          <button type="button" onClick={onReset} style={{ border: 0, background: "none", color: "var(--color-goldink)", fontSize: 13, fontWeight: 600 }}>
            Clear ({activeCount})
          </button>
        ) : null}
      </div>

      <FilterGroup title="Price per night">
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 12 }}>
          <span className="muted">{money(min)}</span>
          <span style={{ fontWeight: 700 }}>Up to {money(maxPrice)}</span>
        </div>
        <input type="range" className="range" min={min} max={max} step={10} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
      </FilterGroup>

      <FilterGroup title="Room type">
        {TIPOS_HABITACION.map((t) => (
          <Check key={t} label={t} count={typeCounts[t] || 0} checked={types.includes(t)} onChange={() => toggle(t, types, setTypes)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Amenities">
        {AMEN_LISTA.map((a) => (
          <Check key={a} label={AMENIDADES[a]} checked={amen.includes(a)} onChange={() => toggle(a, amen, setAmen)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Guest rating" last>
        <div role="radiogroup" aria-label="Guest rating">
          {[4.5, 4, 3.5, 0].map((r) => (
            <label key={r} className="check">
              <input
                type="radio"
                name="guest-rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
              />
              <span
                className="check__box"
                style={{ borderRadius: 999, background: minRating === r ? "var(--color-navy-900)" : "#fff", borderColor: minRating === r ? "var(--color-navy-900)" : "var(--line)" }}
              >
                {minRating === r ? <span style={{ width: 7, height: 7, borderRadius: 999, background: "#fff" }} aria-hidden="true" /> : null}
              </span>
              <span className="check__label" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {r === 0 ? "Any rating" : <><Stars value={r} size={13} /> {r}+</>}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
