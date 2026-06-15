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
        <Field label="Card number" htmlFor="pay-card" error={errors.card}>
          <div style={{ position: "relative" }}>
            <input
              id="pay-card"
              name="cardnumber"
              autoComplete="cc-number"
              inputMode="numeric"
              className={"input" + (errors.card ? " input--error" : "")}
              value={guest.card || ""}
              onChange={(e) => set("card", e.target.value.replace(/[^\d]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
              placeholder="1234 5678 9012 3456"
              style={{ paddingRight: 44 }}
              aria-invalid={errors.card ? true : undefined}
              aria-describedby={errors.card ? "pay-card-error" : undefined}
            />
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--color-muted)" }}>
              <Icon name="card" size={20} />
            </span>
          </div>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
          <Field label="Expiry" htmlFor="pay-exp" error={errors.exp}>
            <input
              id="pay-exp"
              name="exp"
              autoComplete="cc-exp"
              className={"input" + (errors.exp ? " input--error" : "")}
              value={guest.exp || ""}
              onChange={(e) => {
                let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                if (v.length > 2) v = v.slice(0, 2) + " / " + v.slice(2);
                set("exp", v);
              }}
              placeholder="MM / YY"
              aria-invalid={errors.exp ? true : undefined}
              aria-describedby={errors.exp ? "pay-exp-error" : undefined}
            />
          </Field>
          <Field label="CVC" htmlFor="pay-cvc" error={errors.cvc}>
            <input
              id="pay-cvc"
              name="cvc"
              autoComplete="cc-csc"
              inputMode="numeric"
              className={"input" + (errors.cvc ? " input--error" : "")}
              value={guest.cvc || ""}
              onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              aria-invalid={errors.cvc ? true : undefined}
              aria-describedby={errors.cvc ? "pay-cvc-error" : undefined}
            />
          </Field>
        </div>
        <Field label="Name on card" htmlFor="pay-name" error={errors.cardName}>
          <input
            id="pay-name"
            name="ccname"
            autoComplete="cc-name"
            className={"input" + (errors.cardName ? " input--error" : "")}
            value={guest.cardName || ""}
            onChange={(e) => set("cardName", e.target.value)}
            placeholder="As printed on card"
            aria-invalid={errors.cardName ? true : undefined}
            aria-describedby={errors.cardName ? "pay-name-error" : undefined}
          />
        </Field>
      </div>
    </div>
  );
}
