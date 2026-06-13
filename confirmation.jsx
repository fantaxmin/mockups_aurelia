/* Screen 5 — Booking Confirmation -> window.Confirmation */
(function () {
  function Confirmation({ booking, guest, bookingRef, onHome, onRooms }) {
    const d = window.UI.dates;
    const { room, totals, search } = booking;
    const guests = search.adults + search.children;

    return (
      <div className="screen" style={{ background: "var(--paper)", minHeight: "100vh" }}>
        <window.TopNav active="Home" onHome={onHome} onRooms={onRooms} />

        {/* hero band */}
        <section style={{ background: "var(--navy-900)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 2px, transparent 2px 14px)" }} />
          <div className="wrap" style={{ padding: "72px 40px 96px", textAlign: "center", position: "relative" }}>
            <div className="check-pop" style={{ width: 84, height: 84, borderRadius: 999, background: "color-mix(in oklab, #28a06a 92%, white)", display: "grid", placeItems: "center", margin: "0 auto 26px", boxShadow: "0 0 0 10px rgba(40,160,106,.18)" }}>
              <window.Icon name="checkSmall" size={40} sw={2.4} style={{ color: "#fff" }} />
            </div>
            <div className="eyebrow on-dark" style={{ marginBottom: 14 }}>Reservation complete</div>
            <h1 className="display" style={{ fontSize: 48, color: "#fff", margin: "0 0 14px" }}>Booking Confirmed!</h1>
            <p style={{ color: "rgba(255,255,255,.78)", fontSize: 17, maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
              Thank you, {guest.name.split(" ")[0] || "guest"}. A confirmation has been sent to <b style={{ color: "#fff" }}>{guest.email || "your email"}</b>. We can't wait to welcome you.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 26, padding: "12px 22px", border: "1px solid var(--line-on-dark)", borderRadius: 100, background: "rgba(255,255,255,.04)" }}>
              <span style={{ color: "rgba(255,255,255,.6)", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>Booking ref</span>
              <span className="display tnum" style={{ color: "var(--gold-2)", fontSize: 18, letterSpacing: ".08em" }}>{bookingRef}</span>
            </div>
          </div>
        </section>

        {/* summary card overlapping band */}
        <div className="wrap" style={{ padding: "0 40px", marginTop: -56, position: "relative", zIndex: 2 }}>
          <div className="card card--raise" style={{ maxWidth: 720, margin: "0 auto", overflow: "hidden", background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
              <window.UI.Img label={room.name} style={{ minHeight: 200 }} />
              <div style={{ padding: "26px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 8 }}>{window.AURELIA.HOTEL} · {window.AURELIA.LOCATION}</div>
                    <h2 className="display" style={{ fontSize: 26, margin: "0 0 6px" }}>{room.name}</h2>
                    <span className="badge badge--soft">{room.type}</span>
                  </div>
                  <span className="badge badge--avail"><span className="dot" />Confirmed</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 24, paddingTop: 22, borderTop: "1px solid var(--line-2)" }}>
                  <Cell label="Guest" value={guest.name || "—"} />
                  <Cell label="Check-in" value={d.fmtShort(search.checkIn)} sub={d.fmtLong(search.checkIn).split(",")[0]} />
                  <Cell label="Check-out" value={d.fmtShort(search.checkOut)} sub={d.fmtLong(search.checkOut).split(",")[0]} />
                  <Cell label="Guests" value={guests + " guest" + (guests > 1 ? "s" : "")} />
                  <Cell label="Nights" value={totals.n} />
                  <Cell label="Total paid" value={window.UI.money(totals.total)} highlight />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, padding: "20px 28px", borderTop: "1px solid var(--line)", background: "var(--paper)" }}>
              <button className="btn btn--navy" onClick={() => window.print()}><window.Icon name="download" size={17} /> Download Confirmation PDF</button>
              <button className="btn btn--ghost" onClick={onHome}>Back to Home</button>
            </div>
          </div>
        </div>

        {/* NEXT STEPS */}
        <section className="wrap section" style={{ paddingTop: 80 }}>
          <window.UI.SectionHead align="center" eyebrow="Before you arrive" title="Helpful next steps"
            sub="A few things to make your stay seamless from the moment you land." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 44 }}>
            {[
              ["key", "Online check-in", "Skip the front desk — check in online from 24 hours before arrival and head straight to your room.", "Set up check-in"],
              ["concierge", "Contact the concierge", "Arrange airport transfers, dining reservations or a surprise for a special occasion.", "Message concierge"],
              ["map", "Find the hotel", "Avenida da Liberdade 120, Lisbon. 20 minutes from the airport, steps from the metro.", "View hotel map"],
            ].map(([ic, t, body, cta]) => (
              <div key={t} className="card" style={{ padding: 28, display: "flex", flexDirection: "column" }}>
                <span style={{ width: 50, height: 50, borderRadius: 999, background: "var(--navy-900)", color: "var(--gold-2)", display: "grid", placeItems: "center", marginBottom: 18 }}><window.Icon name={ic} size={23} /></span>
                <h3 className="display" style={{ fontSize: 19, margin: "0 0 10px" }}>{t}</h3>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{body}</p>
                <button className="btn btn--ghost" style={{ alignSelf: "flex-start" }} onClick={(e) => e.preventDefault()}>{cta} <window.Icon name="arrowRight" size={15} /></button>
              </div>
            ))}
          </div>
        </section>

        <window.Footer />
        <style>{`.check-pop{animation:pop .5s cubic-bezier(.2,1.3,.4,1) both}@keyframes pop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}`}</style>
      </div>
    );
  }

  function Cell({ label, value, sub, highlight }) {
    return (
      <div>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 5 }}>{label}</div>
        <div className="display tnum" style={{ fontSize: highlight ? 19 : 16, color: highlight ? "var(--gold-ink)" : "var(--ink)" }}>{value}</div>
        {sub ? <div className="muted" style={{ fontSize: 12 }}>{sub}</div> : null}
      </div>
    );
  }

  window.Confirmation = Confirmation;
})();
