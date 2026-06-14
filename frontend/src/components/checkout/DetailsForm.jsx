/* Paso 1 del checkout — datos del huésped. */
import { Field } from "./Field.jsx";
import { Select } from "../ui/Select.jsx";

const NATIONS = ["Portugal", "United Kingdom", "United States", "Spain", "France", "Germany", "Brazil", "Italy", "Netherlands", "Other"];

export function DetailsForm({ guest, set, errors }) {
  return (
    <div className="fade-in">
      <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px" }}>Your details</h1>
      <p className="muted" style={{ margin: "0 0 28px", fontSize: 15 }}>Tell us who's staying. We'll send the confirmation to your email.</p>
      <div className="card" style={{ padding: 28, display: "grid", gap: 20 }}>
        <Field label="Full name" htmlFor="co-name" error={errors.name}>
          <input
            id="co-name"
            name="name"
            autoComplete="name"
            className={"input" + (errors.name ? " input--error" : "")}
            value={guest.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Eleanor Vance"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "co-name-error" : undefined}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
          <Field label="Email" htmlFor="co-email" error={errors.email}>
            <input
              id="co-email"
              name="email"
              type="email"
              autoComplete="email"
              className={"input" + (errors.email ? " input--error" : "")}
              value={guest.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@email.com"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "co-email-error" : undefined}
            />
          </Field>
          <Field label="Phone number" htmlFor="co-phone" error={errors.phone}>
            <input
              id="co-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={"input" + (errors.phone ? " input--error" : "")}
              value={guest.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+351 …"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "co-phone-error" : undefined}
            />
          </Field>
        </div>
        <Field label="Nationality" htmlFor="co-nationality">
          <Select id="co-nationality" name="nationality" value={guest.nationality} onChange={(e) => set("nationality", e.target.value)}>
            {NATIONS.map((nn) => <option key={nn} value={nn}>{nn}</option>)}
          </Select>
        </Field>
        <Field label="Special requests" htmlFor="co-requests" hint="Optional — early check-in, high floor, allergies, celebrations.">
          <textarea
            id="co-requests"
            name="requests"
            className="textarea"
            value={guest.requests}
            onChange={(e) => set("requests", e.target.value)}
            placeholder="Anything we should know before you arrive?"
            aria-describedby="co-requests-hint"
          />
        </Field>
      </div>
    </div>
  );
}
