/* Indicador de progreso de 3 pasos del checkout. */
import { Fragment } from "react";
import { Icon } from "../Icon.jsx";

const STEPS = ["Your Details", "Payment", "Confirmation"];

export function StepIndicator({ step }) {
  return (
    <div className="flex flex-wrap items-center justify-center" style={{ gap: 0, marginBottom: 8 }}>
      {STEPS.map((s, i) => {
        const state = i < step ? "done" : i === step ? "active" : "todo";
        return (
          <Fragment key={s}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  flex: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: "var(--font-display)",
                  background: state === "done" ? "var(--color-gold)" : state === "active" ? "var(--color-navy-900)" : "#fff",
                  color: state === "todo" ? "var(--color-muted2)" : state === "done" ? "#1c1503" : "#fff",
                  border: state === "todo" ? "1px solid var(--line)" : "0",
                }}
              >
                {state === "done" ? <Icon name="checkSmall" size={15} sw={2.6} /> : i + 1}
              </span>
              <span style={{ fontSize: 14.5, fontWeight: state === "active" ? 700 : 500, color: state === "todo" ? "var(--color-muted)" : "var(--color-ink)" }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <span className="max-sm:w-6 sm:w-16" style={{ height: 1.5, background: i < step ? "var(--color-gold)" : "var(--line)", margin: "0 22px" }} />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
