/* Screen 4 — Checkout (Details + Payment) -> window.Checkout */
(function () {
  const { useState } = React;

  const NATIONS = ["Portugal", "United Kingdom", "United States", "Spain", "France", "Germany", "Brazil", "Italy", "Netherlands", "Other"];

  function StepIndicator({ step }) {
    const steps = ["Your Details", "Payment", "Confirmation"];
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 8 }}>
        {steps.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "todo";
          return (
            <React.Fragment key={s}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  width: 34, height: 34, borderRadius: 999, display: "grid", placeItems: "center", flex: "none",
                  fontWeight: 700, fontSize: 14, fontFamily: "var(--ff-display)",
                  background: state === "done" ? "var(--gold)" : state === "active" ? "var(--navy-900)" : "#fff",
                  color: state === "todo" ? "var(--muted-2)" : state === "done" ? "#1c1503" : "#fff",
                  border: state === "todo" ? "1px solid var(--line)" : "0",
                }}>{state === "done" ? <window.Icon name="checkSmall" size={15} sw={2.6} /> : i + 1}</span>
                <span style={{ fontSize: 14.5, fontWeight: state === "active" ? 700 : 500, color: state === "todo" ? "var(--muted)" : "var(--ink)" }}>{s}</span>
              </div>
              {i < steps.length - 1 ? <span style={{ width: 64, height: 1.5, background: i < step ? "var(--gold)" : "var(--line)", margin: "0 22px" }} /> : null}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  function Field({ label, children, error, hint }) {
    return (
      <div className="field">
        <label className="field__label">{label}</label>
        {children}
        {error ? <span className="field__error">{error}</span> : hint ? <span className="muted" style={{ fontSize: 12 }}>{hint}</span> : null}
      </div>
    );
  }

  function Checkout({ booking, guest, setGuest, onComplete, onBack, onHome, onRooms }) {
    const d = window.UI.dates;
    const { room, totals, search } = booking;
    const [step, setStep] = useState(0); // 0 details, 1 payment
    const [errors, setErrors] = useState({});

    const set = (k, v) => setGuest({ ...guest, [k]: v });

    function validateDetails() {
      const e = {};
      if (!guest.name.trim()) e.name = "Please enter your full name";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(guest.email)) e.email = "Enter a valid email address";
      if (guest.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number";
      setErrors(e);
      return Object.keys(e).length === 0;
    }
    function validatePayment() {
      const e = {};
      if (guest.card.replace(/\s/g, "").length < 15) e.card = "Enter a valid card number";
      if (!/^\d{2}\s*\/\s*\d{2}$/.test(guest.exp)) e.exp = "MM / YY";
      if (guest.cvc.length < 3) e.cvc = "3–4 digits";
      if (!guest.cardName.trim()) e.cardName = "Name on card required";
      setErrors(e);
      return Object.keys(e).length === 0;
    }

    function next() {
      if (step === 0) { if (validateDetails()) { setStep(1); setErrors({}); window.scrollTo({ top: 0, behavior: "smooth" }); } }
      else { if (validatePayment()) onComplete(); }
    }

    return (
      <div className="screen" style={{ background: "var(--paper)", minHeight: "100vh" }}>
        <window.TopNav active="Rooms" onHome={onHome} onRooms={onRooms} />

        <div className="wrap" style={{ padding: "40px 40px 28px" }}>
          <StepIndicator step={step} />
        </div>

        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 382px", gap: 48, padding: "0 40px 96px", alignItems: "start" }}>
          {/* FORM */}
          <main>
            <button onClick={() => (step === 0 ? onBack() : setStep(0))} className="muted" style={{ border: 0, background: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, marginBottom: 18, fontWeight: 500 }}>
              <window.Icon name="chevLeft" size={15} /> {step === 0 ? "Back to room" : "Back to details"}
            </button>

            {step === 0 ? (
              <div className="fade-in">
                <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px" }}>Your details</h1>
                <p className="muted" style={{ margin: "0 0 28px", fontSize: 15 }}>Tell us who's staying. We'll send the confirmation to your email.</p>
                <div className="card" style={{ padding: 28, display: "grid", gap: 20 }}>
                  <Field label="Full name" error={errors.name}>
                    <input className={"input" + (errors.name ? " input--error" : "")} value={guest.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Eleanor Vance" />
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                    <Field label="Email" error={errors.email}>
                      <input className={"input" + (errors.email ? " input--error" : "")} value={guest.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
                    </Field>
                    <Field label="Phone number" error={errors.phone}>
                      <input className={"input" + (errors.phone ? " input--error" : "")} value={guest.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+351 …" />
                    </Field>
                  </div>
                  <Field label="Nationality">
                    <window.UI.Select value={guest.nationality} onChange={(e) => set("nationality", e.target.value)}>
                      {NATIONS.map((nn) => <option key={nn} value={nn}>{nn}</option>)}
                    </window.UI.Select>
                  </Field>
                  <Field label="Special requests" hint="Optional — early check-in, high floor, allergies, celebrations.">
                    <textarea className="textarea" value={guest.requests} onChange={(e) => set("requests", e.target.value)} placeholder="Anything we should know before you arrive?" />
                  </Field>
                </div>
              </div>
            ) : (
              <div className="fade-in">
                <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px" }}>Payment</h1>
                <p className="muted" style={{ margin: "0 0 28px", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 7 }}><window.Icon name="lock" size={15} /> Encrypted & secure. You can cancel free of charge until 24h before arrival.</p>
                <div className="card" style={{ padding: 28, display: "grid", gap: 20 }}>
                  <Field label="Card number" error={errors.card}>
                    <div style={{ position: "relative" }}>
                      <input className={"input" + (errors.card ? " input--error" : "")} inputMode="numeric" value={guest.card}
                        onChange={(e) => set("card", e.target.value.replace(/[^\d]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())} placeholder="1234 5678 9012 3456" style={{ paddingRight: 44 }} />
                      <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}><window.Icon name="card" size={20} /></span>
                    </div>
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                    <Field label="Expiry" error={errors.exp}>
                      <input className={"input" + (errors.exp ? " input--error" : "")} value={guest.exp}
                        onChange={(e) => { let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + " / " + v.slice(2); set("exp", v); }} placeholder="MM / YY" />
                    </Field>
                    <Field label="CVC" error={errors.cvc}>
                      <input className={"input" + (errors.cvc ? " input--error" : "")} inputMode="numeric" value={guest.cvc} onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" />
                    </Field>
                  </div>
                  <Field label="Name on card" error={errors.cardName}>
                    <input className={"input" + (errors.cardName ? " input--error" : "")} value={guest.cardName} onChange={(e) => set("cardName", e.target.value)} placeholder="As printed on card" />
                  </Field>
                </div>
              </div>
            )}

            <button className="btn btn--gold btn--lg" style={{ marginTop: 24 }} onClick={next}>
              {step === 0 ? <>Continue to Payment <window.Icon name="arrowRight" size={17} /></> : <>Pay {window.UI.money(totals.total)} <window.Icon name="arrowRight" size={17} /></>}
            </button>

            {/* TRUST BADGES */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 34 }}>
              {[["shield", "Secure booking", "256-bit SSL encryption"], ["cancel", "Free cancellation", "Until 24h before arrival"], ["support", "24/7 support", "Concierge on call"]].map(([ic, t, s]) => (
                <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "16px 16px", border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "#fff" }}>
                  <span style={{ color: "var(--gold-ink)", flex: "none" }}><window.Icon name={ic} size={22} /></span>
                  <div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{t}</div><div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{s}</div></div>
                </div>
              ))}
            </div>
          </main>

          {/* ORDER SUMMARY */}
          <aside style={{ position: "sticky", top: 96 }}>
            <window.OrderSummary booking={booking} />
          </aside>
        </div>
        <window.Footer />
      </div>
    );
  }

  // Shared summary (used in checkout)
  function OrderSummary({ booking }) {
    const d = window.UI.dates;
    const { room, totals, search } = booking;
    const guests = search.adults + search.children;
    return (
      <div className="card" style={{ overflow: "hidden" }}>
        <window.UI.Img label={room.name} style={{ height: 150 }} />
        <div style={{ padding: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{window.AURELIA.HOTEL}</div>
          <h3 className="display" style={{ fontSize: 20, margin: "0 0 4px" }}>{room.name}</h3>
          <span className="badge badge--soft">{room.type}</span>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "18px 0", padding: "16px 0", borderTop: "1px solid var(--line-2)", borderBottom: "1px solid var(--line-2)" }}>
            <SumCell label="Check-in" value={d.fmtShort(search.checkIn)} sub={d.DAYS[d.fromISO(search.checkIn).getDay()]} />
            <SumCell label="Check-out" value={d.fmtShort(search.checkOut)} sub={d.DAYS[d.fromISO(search.checkOut).getDay()]} />
            <SumCell label="Guests" value={guests + " guest" + (guests > 1 ? "s" : "")} />
            <SumCell label="Nights" value={totals.n + " night" + (totals.n > 1 ? "s" : "")} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14 }}>
            <Line a={window.UI.money(room.price) + " × " + totals.n} b={window.UI.money(totals.roomTotal)} />
            <Line a="Taxes (12%)" b={window.UI.money(totals.taxes)} />
            <Line a="Service fee" b={window.UI.money(totals.fee)} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
            <span style={{ fontWeight: 700 }}>Total <span className="muted" style={{ fontWeight: 400, fontSize: 12.5 }}>incl. taxes</span></span>
            <span className="display tnum" style={{ fontSize: 24 }}>{window.UI.money(totals.total)}</span>
          </div>
          <div style={{ marginTop: 16, padding: "11px 14px", background: "color-mix(in oklab, #1f7a52 9%, white)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#1c5f41", fontWeight: 500 }}>
            <window.Icon name="cancel" size={16} /> Free cancellation until 24h before check-in
          </div>
        </div>
      </div>
    );
  }

  function SumCell({ label, value, sub }) {
    return <div><div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>{label}</div><div style={{ fontWeight: 600, fontSize: 15 }}>{value}{sub ? <span className="muted" style={{ fontWeight: 400, fontSize: 12 }}> · {sub}</span> : null}</div></div>;
  }
  function Line({ a, b }) {
    return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, lineHeight: 1.4 }}><span className="muted" style={{ minWidth: 0 }}>{a}</span><span className="tnum" style={{ fontWeight: 600, whiteSpace: "nowrap", flex: "none" }}>{b}</span></div>;
  }

  window.Checkout = Checkout;
  window.OrderSummary = OrderSummary;
})();
