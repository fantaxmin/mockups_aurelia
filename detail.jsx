/* Screen 3 — Room Detail -> window.Detail */
(function () {
  const { useState } = React;

  function Detail({ room, search, setSearch, onConfirm, onHome, onRooms, onBack }) {
    const d = window.UI.dates;
    const data = window.AURELIA;
    const [active, setActive] = useState(0);
    const gallery = data.GALLERY;
    const n = d.nights(search.checkIn, search.checkOut);
    const guests = search.adults + search.children;

    const roomTotal = room.price * n;
    const taxes = Math.round(roomTotal * 0.12);
    const fee = 28;
    const total = roomTotal + taxes + fee;

    return (
      <div className="screen" style={{ background: "var(--paper)" }}>
        <window.TopNav active="Rooms" onHome={onHome} onRooms={onRooms} />

        {/* breadcrumb */}
        <div className="wrap" style={{ padding: "22px 40px 0", display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }} className="muted">Home</a>
          <window.Icon name="chevRight" size={13} />
          <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="muted">Rooms</a>
          <window.Icon name="chevRight" size={13} />
          <span style={{ fontWeight: 600 }}>{room.name}</span>
        </div>

        {/* GALLERY */}
        <section className="wrap" style={{ padding: "20px 40px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {gallery.map((g, i) => (
                <button key={g} onClick={() => setActive(i)} style={{ border: 0, padding: 0, borderRadius: "var(--radius)", overflow: "hidden", cursor: "pointer", outline: active === i ? "2px solid var(--gold)" : "1px solid var(--line)", outlineOffset: active === i ? "1px" : 0 }}>
                  <window.UI.Img label={"" } style={{ height: 72, opacity: active === i ? 1 : 0.7 }}>
                    <span style={{ fontSize: 9, fontFamily: "ui-monospace,monospace", color: "rgba(20,35,57,.5)" }}>{g}</span>
                  </window.UI.Img>
                </button>
              ))}
            </div>
            <window.UI.Img label={room.name + " · " + gallery[active]} style={{ height: 466, borderRadius: "var(--radius-lg)" }}>
              <span style={{ position: "absolute", top: 16, right: 16 }} className="badge badge--gold"><window.Icon name="expand" size={13} /> {active + 1} / {gallery.length}</span>
            </window.UI.Img>
          </div>
        </section>

        {/* CONTENT */}
        <section className="wrap" style={{ padding: "40px 40px 96px", display: "grid", gridTemplateColumns: "1fr 392px", gap: 56, alignItems: "start" }}>
          {/* LEFT */}
          <div>
            <div><span className="badge badge--soft">{room.type}</span></div>
            <h1 className="display" style={{ fontSize: 40, margin: "14px 0 0" }}>{room.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 16, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><window.Stars value={room.rating} /><span style={{ fontWeight: 700 }} className="tnum">{room.rating}</span><span className="muted">· {room.reviews} reviews</span></span>
              <span className="divider-v" style={{ height: 16 }} />
              <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><window.Icon name="pin" size={15} />{data.LOCATION}</span>
            </div>

            <div style={{ display: "flex", gap: 28, marginTop: 26, paddingBottom: 28, borderBottom: "1px solid var(--line)" }}>
              {[["bed", room.beds], ["users", "Sleeps " + room.sleeps], ["expand", room.sqm + " m²"]].map(([ic, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 999, border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--gold-ink)" }}><window.Icon name={ic} size={19} /></span>
                  <span style={{ fontSize: 14.5, fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>

            <h2 className="display" style={{ fontSize: 22, margin: "32px 0 12px" }}>About this room</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--ink)", margin: 0, maxWidth: 620 }}>{room.desc}</p>

            <h2 className="display" style={{ fontSize: 22, margin: "38px 0 18px" }}>Amenities</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px", maxWidth: 560 }}>
              {room.amenities.map((a) => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: "var(--gold-ink)" }}><window.Icon name={a} size={20} /></span>
                  <span style={{ fontSize: 14.5 }}>{data.AMENITIES[a]}</span>
                </div>
              ))}
            </div>

            {/* REVIEWS */}
            <div style={{ marginTop: 46, paddingTop: 38, borderTop: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
                <h2 className="display" style={{ fontSize: 22, margin: 0 }}>Guest reviews</h2>
                <span className="badge badge--gold"><window.Icon name="star" size={13} />{room.rating} · {room.reviews} reviews</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {data.REVIEWS.map((rv) => (
                  <div key={rv.name} className="card" style={{ padding: 22 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 12 }}>
                      <span style={{ width: 44, height: 44, borderRadius: 999, background: "var(--navy-900)", color: "var(--gold-2)", display: "grid", placeItems: "center", fontFamily: "var(--ff-display)", fontWeight: 600, fontSize: 15 }}>{rv.initials}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>{rv.name}</div>
                        <div className="muted" style={{ fontSize: 12.5 }}>{rv.date}</div>
                      </div>
                      <window.Stars value={rv.rating} size={15} />
                    </div>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "var(--ink)" }}>“{rv.text}”</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — sticky booking card */}
          <aside style={{ position: "sticky", top: 96 }}>
            <div className="card card--raise" style={{ padding: 24, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 4 }}>
                <div style={{ whiteSpace: "nowrap" }}><span className="display" style={{ fontSize: 30 }}>{window.UI.money(room.price)}</span><span className="muted"> / night</span></div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, flex: "none" }}><window.Icon name="star" size={14} style={{ color: "var(--gold)" }} /><b className="tnum">{room.rating}</b></span>
              </div>
              <p className="muted" style={{ fontSize: 12.5, margin: "2px 0 18px" }}>Best available rate · free cancellation</p>

              {/* date pickers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                <label style={{ padding: "11px 14px", borderRight: "1px solid var(--line)" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)" }}>Check-in</div>
                  <input type="date" value={search.checkIn} onChange={(e) => { const ci = e.target.value; setSearch({ ...search, checkIn: ci, checkOut: ci >= search.checkOut ? d.addDays(ci, 1) : search.checkOut }); }}
                    style={{ border: 0, outline: 0, fontFamily: "var(--ff-text)", fontSize: 14, fontWeight: 600, width: "100%", padding: 0, marginTop: 3, background: "transparent" }} />
                </label>
                <label style={{ padding: "11px 14px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)" }}>Check-out</div>
                  <input type="date" min={d.addDays(search.checkIn, 1)} value={search.checkOut} onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
                    style={{ border: 0, outline: 0, fontFamily: "var(--ff-text)", fontSize: 14, fontWeight: 600, width: "100%", padding: 0, marginTop: 3, background: "transparent" }} />
                </label>
              </div>

              {/* guests */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid var(--line)", borderTop: 0, borderRadius: "0 0 var(--radius) var(--radius)", padding: "10px 14px", marginTop: -1, marginBottom: 18 }}>
                <div><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)" }}>Guests</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 3 }}>{guests} guest{guests > 1 ? "s" : ""}</div></div>
                <window.UI.Counter value={search.adults} min={1} max={room.sleeps + 2} onChange={(v) => setSearch({ ...search, adults: v })} />
              </div>

              {/* price breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14.5, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                <Row a={<span className="muted" style={{ borderBottom: "1px dashed var(--line)" }}>{window.UI.money(room.price)} × {n} nights</span>} b={window.UI.money(roomTotal)} />
                <Row a={<span className="muted">Taxes (12%)</span>} b={window.UI.money(taxes)} />
                <Row a={<span className="muted">Service fee</span>} b={window.UI.money(fee)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0 18px" }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                <span className="display tnum" style={{ fontSize: 26 }}>{window.UI.money(total)}</span>
              </div>

              <button className="btn btn--gold btn--lg btn--block" onClick={() => onConfirm(room, { n, roomTotal, taxes, fee, total })}>Confirm Reservation</button>
              <div className="muted" style={{ fontSize: 12, textAlign: "center", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <window.Icon name="lock" size={13} /> You won't be charged yet
              </div>
            </div>
          </aside>
        </section>
        <window.Footer />
      </div>
    );
  }

  function Row({ a, b }) {
    return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, lineHeight: 1.4 }}><span style={{ minWidth: 0 }}>{a}</span><span className="tnum" style={{ fontWeight: 600, whiteSpace: "nowrap", flex: "none" }}>{b}</span></div>;
  }

  window.Detail = Detail;
})();
