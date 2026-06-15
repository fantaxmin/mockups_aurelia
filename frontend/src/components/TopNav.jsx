/* Navegación superior, con menú desplegable en móvil. */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { Logo } from "./Logo.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { useToast } from "./Toast.jsx";
import { useBusqueda } from "../hooks/useBusqueda.js";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const primerNombre = (nombre) => String(nombre || "").trim().split(" ")[0] || "";
const iniciales = (nombre) =>
  String(nombre || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");

export function TopNav({ dark = false, active = "Home" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useBooking();
  const toast = useToast();
  // "Book a Stay" dispara la búsqueda con los criterios actuales (igual que
  // "Search Availability"): valida y lleva a resultados, o muestra el error.
  const handleBookStay = useBusqueda();

  function handleSignOut() {
    logout();
    toast.success("Sesión cerrada");
  }

  // La nav es sticky: al hacer scroll dejamos un fondo sólido para que no
  // se vea transparente sobre el contenido (sobre todo la variante oscura).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solo la variante oscura arranca transparente (sobre el hero). Al hacer
  // scroll pasa a navy sólido; la clara siempre tiene fondo papel opaco.
  const transparent = dark && !scrolled;

  const headerCls = [
    "nav border-b transition-[background-color,border-color,box-shadow] duration-200 ease-out",
    dark ? "nav--dark" : "",
    transparent
      ? "bg-transparent border-transparent"
      : "backdrop-blur-md backdrop-saturate-[1.8] " +
        (dark
          ? "bg-navy-900 border-[color:var(--line-on-dark)]"
          : "bg-paper border-[color:var(--line)]"),
    scrolled ? "shadow-[0_1px_24px_rgba(17,24,39,0.08)]" : "shadow-none",
  ].join(" ");

  return (
    <header className={headerCls}>
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
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="nav__link nav__cta-signin max-[820px]:hidden"
                style={{ fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}
                title="Cerrar sesión"
                aria-label={"Cerrar sesión de " + user.nombre}
              >
                <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: 999, background: "var(--color-gold)", color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>
                  {iniciales(user.nombre)}
                </span>
                {primerNombre(user.nombre)}
              </button>
            ) : (
              <Link
                to="/login"
                className="nav__link nav__cta-signin max-[820px]:hidden"
                style={{ fontWeight: 500 }}
              >
                Sign In
              </Link>
            )}
            <button type="button" onClick={handleBookStay} className={"btn " + (dark ? "btn--gold" : "btn--navy") + " max-[820px]:hidden"} style={{ padding: "11px 22px" }}>
              Book a Stay
            </button>
            <button
              type="button"
              className="nav__toggle inline-flex min-[821px]:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
              style={{ color: dark ? "#fff" : "var(--color-ink)" }}
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
            {user ? (
              <button type="button" className="nav__link" style={{ color: "var(--color-ink)", padding: "10px 0", textAlign: "left" }} onClick={() => { handleSignOut(); setOpen(false); }}>
                Sign out ({primerNombre(user.nombre)})
              </button>
            ) : (
              <Link to="/login" className="nav__link" style={{ color: "var(--color-ink)", padding: "10px 0" }} onClick={() => setOpen(false)}>
                Sign In
              </Link>
            )}
            <button type="button" className="btn btn--navy" style={{ marginTop: 8 }} onClick={() => { setOpen(false); handleBookStay(); }}>
              Book a Stay
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
