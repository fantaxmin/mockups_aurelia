/* Top navigation + footer -> window */
(function () {
  function Logo({ dark }) {
    return (
      <span className="logo">
        <svg className="logo__mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke={dark ? "var(--gold-2)" : "var(--gold)"} strokeWidth="1.4" />
          <path d="M16 7l5.5 12.5h-3.1L16 13.4l-2.4 6.1h-3.1L16 7Z" fill={dark ? "var(--gold-2)" : "var(--gold)"} />
          <path d="M11 22.5h10" stroke={dark ? "var(--gold-2)" : "var(--gold)"} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        AURELIA
      </span>
    );
  }

  const LINKS = ["Home", "Rooms", "Services", "About", "Contact"];

  function TopNav({ dark = false, active = "Home", onHome, onRooms }) {
    function go(label) {
      if (label === "Home") onHome && onHome();
      else if (label === "Rooms") onRooms && onRooms();
    }
    return (
      <header className={"nav" + (dark ? " nav--dark" : "")} style={{ background: dark ? "transparent" : "rgba(247,244,238,.86)", backdropFilter: dark ? "none" : "saturate(180%) blur(12px)", borderBottom: dark ? "1px solid var(--line-on-dark)" : "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="nav__inner">
            <a href="#" onClick={(e) => { e.preventDefault(); onHome && onHome(); }} aria-label="Aurelia home"><Logo dark={dark} /></a>
            <nav className="nav__links">
              {LINKS.map((l) => (
                <a key={l} href="#" className={"nav__link" + (l === active ? " nav__link--active" : "")}
                  onClick={(e) => { e.preventDefault(); go(l); }}>{l}</a>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a href="#" className={"nav__link"} onClick={(e) => e.preventDefault()} style={{ fontWeight: 500 }}>Sign In</a>
              <button className={"btn " + (dark ? "btn--gold" : "btn--navy")} style={{ padding: "11px 22px" }} onClick={onRooms}>Book a Stay</button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  function Footer() {
    const cols = [
      { h: "Hotel Aurelia", items: ["Avenida da Liberdade", "Lisbon, Portugal", "+351 21 000 0000"] },
      { h: "Explore", items: ["Rooms & Suites", "Dining", "Spa & Wellness", "Experiences"] },
      { h: "Guests", items: ["Reservations", "Online Check-in", "Concierge", "FAQ"] },
    ];
    return (
      <footer className="footer">
        <div className="wrap" style={{ padding: "72px 40px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr", gap: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
                <span className="logo" style={{ color: "#fff", fontSize: 20 }}>
                  <svg className="logo__mark" viewBox="0 0 32 32" fill="none">
                    <rect x="1.5" y="1.5" width="29" height="29" rx="2" stroke="var(--gold-2)" strokeWidth="1.4" />
                    <path d="M16 7l5.5 12.5h-3.1L16 13.4l-2.4 6.1h-3.1L16 7Z" fill="var(--gold-2)" />
                    <path d="M11 22.5h10" stroke="var(--gold-2)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  AURELIA
                </span>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(255,255,255,.6)", maxWidth: 290, margin: 0 }}>
                A modern grand hotel on Lisbon's most storied avenue — where understated luxury meets effortless warmth.
              </p>
            </div>
            {cols.map((c) => (
              <div key={c.h}>
                <div className="eyebrow on-dark" style={{ marginBottom: 16 }}>{c.h}</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                  {c.items.map((it) => <li key={it}><a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 14.5, color: "rgba(255,255,255,.7)", transition: "color .15s" }}>{it}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 56, padding: "24px 0", borderTop: "1px solid rgba(255,255,255,.12)" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>© 2026 Hotel Aurelia. All rights reserved.</span>
            <div style={{ display: "flex", gap: 26 }}>
              {["Privacy", "Terms", "Cookies"].map((x) => <a key={x} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>{x}</a>)}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  window.TopNav = TopNav;
  window.Footer = Footer;
  window.Logo = Logo;
})();
