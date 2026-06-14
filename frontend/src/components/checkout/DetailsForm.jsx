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
        <Field label="Full name" error={errors.name}>
          <input className={"input" + (errors.name ? " input--error" : "")} value={guest.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Eleanor Vance" />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
          <Field label="Email" error={errors.email}>
            <input className={"input" + (errors.email ? " input--error" : "")} value={guest.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
          </Field>
          <Field label="Phone number" error={errors.phone}>
            <input className={"input" + (errors.phone ? " input--error" : "")} value={guest.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+351 …" />
          </Field>
        </div>
        <Field label="Nationality">
          <Select value={guest.nationality} onChange={(e) => set("nationality", e.target.value)}>
            {NATIONS.map((nn) => <option key={nn} value={nn}>{nn}</option>)}
          </Select>
        </Field>
        <Field label="Special requests" hint="Optional — early check-in, high floor, allergies, celebrations.">
          <textarea className="textarea" value={guest.requests} onChange={(e) => set("requests", e.target.value)} placeholder="Anything we should know before you arrive?" />
        </Field>
      </div>
    </div>
  );
}
