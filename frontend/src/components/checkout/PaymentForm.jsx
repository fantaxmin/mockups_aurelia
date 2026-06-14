/* Paso 2 del checkout — pago (simulado, no se cobra). */
import { Field } from "./Field.jsx";
import { Icon } from "../Icon.jsx";

export function PaymentForm({ guest, set, errors }) {
  return (
    <div className="fade-in">
      <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px" }}>Payment</h1>
      <p className="muted" style={{ margin: "0 0 28px", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 7 }}>
        <Icon name="lock" size={15} /> Encrypted & secure. You can cancel free of charge until 24h before arrival.
      </p>
      <div className="card" style={{ padding: 28, display: "grid", gap: 20 }}>
        <Field label="Card number" error={errors.card}>
          <div style={{ position: "relative" }}>
            <input
              className={"input" + (errors.card ? " input--error" : "")}
              inputMode="numeric"
              value={guest.card || ""}
              onChange={(e) => set("card", e.target.value.replace(/[^\d]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
              placeholder="1234 5678 9012 3456"
              style={{ paddingRight: 44 }}
            />
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--color-muted)" }}>
              <Icon name="card" size={20} />
            </span>
          </div>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
          <Field label="Expiry" error={errors.exp}>
            <input
              className={"input" + (errors.exp ? " input--error" : "")}
              value={guest.exp || ""}
              onChange={(e) => {
                let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                if (v.length > 2) v = v.slice(0, 2) + " / " + v.slice(2);
                set("exp", v);
              }}
              placeholder="MM / YY"
            />
          </Field>
          <Field label="CVC" error={errors.cvc}>
            <input className={"input" + (errors.cvc ? " input--error" : "")} inputMode="numeric" value={guest.cvc || ""} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" />
          </Field>
        </div>
        <Field label="Name on card" error={errors.cardName}>
          <input className={"input" + (errors.cardName ? " input--error" : "")} value={guest.cardName || ""} onChange={(e) => set("cardName", e.target.value)} placeholder="As printed on card" />
        </Field>
      </div>
    </div>
  );
}
