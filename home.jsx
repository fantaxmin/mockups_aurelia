/* Screen 1 — Home / Landing -> window.Home */
(function () {
  const { useState } = React;

  function SearchForm({ search, setSearch, onSubmit, floating }) {
    const d = window.UI.dates;
    const [guestsOpen, setGuestsOpen] = useState(false);
    const guestLabel = search.adults + search.children + " guest" + (search.adults + search.children > 1 ? "s" : "");

    return (
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.1fr auto",
          alignItems: "stretch",
          gap: 0,
          padding: 8,
          background: "#fff",
          boxShadow: floating ? "var(--shadow-lg)" : "var(--shadow-md)",
          borderColor: "transparent",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <FieldCell icon="pin" label="Destination">
          <input className="sf-input" value={search.destination} onChange={(e) => setSearch({ ...search, destination: e.target.value })} placeholder="Where to?" />
        </FieldCell>
        <FieldCell icon="cal" label="Check-in" divider>
          <input type="date" className="sf-input" value={search.checkIn}
            onChange={(e) => { const ci = e.target.value; setSearch({ ...search, checkIn: ci, checkOut: ci >= search.checkOut ? d.addDays(ci, 1) : search.checkOut }); }} />
        </FieldCell>
        <FieldCell icon="cal" label="Check-out" divider>
          <input type="date" className="sf-input" min={d.addDays(search.checkIn, 1)} value={search.checkOut}
            onChange={(e) => setSearch({ ...search, checkOut: e.target.value })} />
        </FieldCell>
        <div style={{ position: "relative" }}>
          <FieldCell icon="users" label="Guests" divider>
            <button type="button" className="sf-input" style={{ textAlign: "left", background: "transparent", border: 0, padding: 0, color: "var(--ink)" }} onClick={() => setGuestsOpen((v) => !v)}>
              {guestLabel}{search.rooms > 1 ? " · " + search.rooms + " rooms" : ""}
            </button>
          </FieldCell>
          {guestsOpen ? (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setGuestsOpen(false)} />
              <div className="card card--raise" style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, width: 290, padding: 18, zIndex: 11, background: "#fff" }}>
                {[["adults", "Adults", "Ages 13+"], ["children", "Children", "Ages 0–12"], ["rooms", "Rooms", ""]].map(([k, lab, sub]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: k !== "rooms" ? "1px solid var(--line-2)" : "0" }}>
                    <div><div style={{ fontWeight: 600, fontSize: 14.5 }}>{lab}</div>{sub ? <div className="muted" style={{ fontSize: 12.5 }}>{sub}</div> : null}</div>
                    <window.UI.Counter value={search[k]} min={k === "adults" || k === "rooms" ? 1 : 0} max={k === "rooms" ? 5 : 9} onChange={(v) => setSearch({ ...search, [k]: v })} />
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <button className="btn btn--gold btn--lg" type="submit" style={{ borderRadius: "var(--radius)", margin: 0 }}>
          <window.Icon name="search" size={18} /> Search Availability
        </button>
      </form>
    );
  }

  function FieldCell({ icon, label, children, divider }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderLeft: divider ? "1px solid var(--line-2)" : "0" }}>
        <span style={{ color: "var(--gold-ink)", flex: "none" }}><window.Icon name={icon} size={19} /></span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>{label}</div>
          {children}
        </div>
      </div>
    );
  }

  function RoomCard({ room, onOpen, onBook }) {
    return (
      <article className="card" style={{ display: "flex", flexDirection: "column", cursor: "pointer", transition: "transform .25s ease, box-shadow .25s ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        onClick={() => onOpen(room)}>
        <window.UI.Img label={room.name + " · photo"} className="" style={{ height: 248 }} />
        <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
            <span className="badge badge--soft"><span className="dot" style={{ color: "var(--gold)" }} />{room.type}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)" }}>
              <window.Stars value={room.rating} size={14} /><span className="tnum" style={{ fontWeight: 600, color: "var(--ink)" }}>{room.rating}</span>
            </span>
          </div>
          <h3 className="display" style={{ fontSize: 23, margin: "0 0 8px" }}>{room.name}</h3>
          <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{room.blurb}</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
            <div>
              <span className="display" style={{ fontSize: 26 }}>{window.UI.money(room.price)}</span>
              <span className="muted" style={{ fontSize: 13.5 }}> / night</span>
            </div>
            <button className="btn btn--navy" onClick={(e) => { e.stopPropagation(); onBook(room); }} style={{ padding: "12px 22px" }}>Book Now</button>
          </div>
        </div>
      </article>
    );
  }

  function Home({ search, setSearch, onSearch, onOpenRoom, onBookRoom, onRooms }) {
    const data = window.AURELIA;
    const featured = data.ROOMS.filter((r) => ["classic-double", "deluxe-king", "junior-suite"].includes(r.id));

    return (
      <div className="screen">
        <window.TopNav dark active="Home" onHome={() => {}} onRooms={onRooms} />

        {/* HERO */}
        <section style={{ position: "relative", marginTop: -78 }}>
          <window.UI.Img label="hero · luxury hotel façade at dusk" tone="ph--dark" style={{ height: "clamp(620px, 86vh, 840px)", minHeight: 620 }}>
            <div className="scrim" />
          </window.UI.Img>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div className="wrap" style={{ paddingBottom: 70 }}>
              <div className="eyebrow on-dark fade-in" style={{ marginBottom: 22 }}>{data.LOCATION} · Est. 1924</div>
              <h1 className="display-thin fade-in" style={{ fontSize: 72, color: "#fff", margin: 0, maxWidth: 880 }}>
                A grand hotel,<br />quietly reimagined.
              </h1>
              <p className="fade-in" style={{ fontSize: 19, color: "rgba(255,255,255,.82)", maxWidth: 520, lineHeight: 1.6, marginTop: 22 }}>
                Light-filled rooms, a rooftop pool over the rooftops of Lisbon, and a welcome that feels like coming home.
              </p>
            </div>
            {/* search bar floats over hero edge */}
            <div className="wrap" style={{ transform: "translateY(50%)" }}>
              <SearchForm search={search} setSearch={setSearch} onSubmit={onSearch} floating />
            </div>
          </div>
        </section>

        {/* spacer for floating bar */}
        <div style={{ height: 70 }} />

        {/* FEATURED ROOMS */}
        <section className="wrap section" style={{ paddingTop: 60 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44 }}>
            <window.UI.SectionHead eyebrow="Rooms & Suites" title="Featured stays" sub="Three of our most-requested rooms, each with Aurelia's signature comforts." />
            <button className="btn btn--ghost" onClick={onRooms} style={{ flex: "none" }}>View all rooms <window.Icon name="arrowRight" size={16} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {featured.map((r) => <RoomCard key={r.id} room={r} onOpen={onOpenRoom} onBook={onBookRoom} />)}
          </div>
        </section>

        {/* EXPERIENCE STRIP */}
        <section style={{ background: "var(--navy-900)" }}>
          <div className="wrap" style={{ padding: "84px 40px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <window.UI.SectionHead eyebrow="The Aurelia Way" title="Every detail, considered." onDark
                sub="From the linen on your bed to the light at golden hour on the terrace — we obsess over the small things so your stay feels effortless." />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 40 }}>
                {[["pool", "Rooftop pool & spa"], ["concierge", "24/7 concierge"], ["breakfast", "Garden breakfast"], ["key", "Contactless check-in"]].map(([ic, t]) => (
                  <div key={t} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <span style={{ width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", border: "1px solid var(--line-on-dark)", color: "var(--gold-2)", flex: "none" }}><window.Icon name={ic} size={20} /></span>
                    <span style={{ color: "#fff", fontSize: 15.5, fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <window.UI.Img label="terrace · rooftop pool" tone="ph--dark" style={{ height: 420, borderRadius: "var(--radius-lg)" }} />
          </div>
        </section>

        <window.Footer />
        <style>{`.sf-input{font-family:var(--ff-text);font-size:15px;color:var(--ink);border:0;outline:none;background:transparent;width:100%;padding:0;font-weight:600}.sf-input::placeholder{color:var(--muted-2);font-weight:400}`}</style>
      </div>
    );
  }

  window.Home = Home;
  window.SearchForm = SearchForm;
})();
