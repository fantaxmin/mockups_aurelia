/* Navegación superior, con menú desplegable en móvil. */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { Logo } from "./Logo.jsx";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Services", to: "/rooms" },
  { label: "About", to: "/" },
  { label: "Contact", to: "/" },
];

export function TopNav({ dark = false, active = "Home" }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={"nav" + (dark ? " nav--dark" : "")}
      style={{
        background: dark ? "transparent" : "rgba(247,244,238,.86)",
        backdropFilter: dark ? "none" : "saturate(180%) blur(12px)",
        borderBottom: dark ? "1px solid var(--line-on-dark)" : "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <div className="nav__inner">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} aria-label="Aurelia home">
            <Logo dark={dark} />
          </a>

          <nav className="nav__links">
            {LINKS.map((l, i) => (
              <a
                key={l.label + i}
                href={l.to}
                className={"nav__link" + (l.label === active ? " nav__link--active" : "")}
                onClick={(e) => { e.preventDefault(); navigate(l.to); }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            <a href="/" className="nav__link nav__cta-signin max-[820px]:hidden" style={{ fontWeight: 500 }} onClick={(e) => e.preventDefault()}>
              Sign In
            </a>
            <button
              className={"btn " + (dark ? "btn--gold" : "btn--navy") + " max-[820px]:hidden"}
              style={{ padding: "11px 22px" }}
              onClick={() => navigate("/rooms")}
            >
              Book a Stay
            </button>
            <button
              className="nav__toggle min-[821px]:hidden"
              aria-label="Abrir menú"
              onClick={() => setOpen((v) => !v)}
              style={{ color: dark ? "#fff" : "var(--color-ink)", display: "inline-flex" }}
            >
              <Icon name={open ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="min-[821px]:hidden" style={{ background: "var(--color-paper)", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap" style={{ padding: "12px 0 18px", display: "flex", flexDirection: "column", gap: 4 }}>
            {LINKS.map((l, i) => (
              <a
                key={l.label + i}
                href={l.to}
                className="nav__link"
                style={{ color: "var(--color-ink)", padding: "10px 0" }}
                onClick={(e) => { e.preventDefault(); setOpen(false); navigate(l.to); }}
              >
                {l.label}
              </a>
            ))}
            <button className="btn btn--navy" style={{ marginTop: 8 }} onClick={() => { setOpen(false); navigate("/rooms"); }}>
              Book a Stay
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
