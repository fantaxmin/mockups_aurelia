/* Galería de la habitación: miniaturas laterales + imagen principal. */
import { useState } from "react";
import { Img } from "../ui/Img.jsx";
import { Icon } from "../Icon.jsx";
import { GALERIA } from "@shared/data/hotel.js";

export function Gallery({ room }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-4 grid-cols-[80px_1fr] sm:grid-cols-[96px_1fr]">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }} role="group" aria-label="Miniaturas">
        {GALERIA.map((g, i) => (
          <button
            key={g}
            type="button"
            onClick={() => setActive(i)}
            aria-label={"Ver " + g}
            aria-pressed={active === i}
            style={{
              border: 0,
              padding: 0,
              borderRadius: "var(--radius-aurelia)",
              overflow: "hidden",
              cursor: "pointer",
              outline: active === i ? "2px solid var(--color-gold)" : "1px solid var(--line)",
              outlineOffset: active === i ? "1px" : 0,
            }}
          >
            <Img label="" style={{ height: 72, opacity: active === i ? 1 : 0.7 }}>
              <span style={{ fontSize: 9, fontFamily: "ui-monospace,monospace", color: "rgba(20,35,57,.5)" }}>{g}</span>
            </Img>
          </button>
        ))}
      </div>
      <Img label={room.name + " · " + GALERIA[active]} style={{ height: "clamp(280px, 50vw, 466px)", borderRadius: "var(--radius-aurelia-lg)" }}>
        <span style={{ position: "absolute", top: 16, right: 16 }} className="badge badge--gold">
          <Icon name="expand" size={13} /> {active + 1} / {GALERIA.length}
        </span>
      </Img>
    </div>
  );
}
