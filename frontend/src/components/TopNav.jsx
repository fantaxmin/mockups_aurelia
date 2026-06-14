/* Navegación superior, con menú desplegable en móvil. */
import { useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/" aria-label="Aurelia — inicio">
            <Logo dark={dark} />
          </Link>

          <nav className="nav__links" aria-label="Principal">
            {LINKS.map((l, i) => (
              <Link
                key={l.label + i}
                to={l.to}
                className={"nav__link" + (l.label === active ? " nav__link--active" : "")}
                aria-current={l.label === active ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            <button type="button" className="nav__link nav__cta-signin max-[820px]:hidden" style={{ fontWeight: 500 }}>
              Sign In
            </button>
            <Link to="/rooms" className={"btn " + (dark ? "btn--gold" : "btn--navy") + " max-[820px]:hidden"} style={{ padding: "11px 22px" }}>
              Book a Stay
            </Link>
            <button
              type="button"
              className="nav__toggle min-[821px]:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
              style={{ color: dark ? "#fff" : "var(--color-ink)", display: "inline-flex" }}
            >
              <Icon name={open ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <nav id="menu-movil" aria-label="Móvil" className="min-[821px]:hidden" style={{ background: "var(--color-paper)", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap" style={{ padding: "12px 0 18px", display: "flex", flexDirection: "column", gap: 4 }}>
            {LINKS.map((l, i) => (
              <Link
                key={l.label + i}
                to={l.to}
                className="nav__link"
                style={{ color: "var(--color-ink)", padding: "10px 0" }}
                aria-current={l.label === active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/rooms" className="btn btn--navy" style={{ marginTop: 8 }} onClick={() => setOpen(false)}>
              Book a Stay
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
