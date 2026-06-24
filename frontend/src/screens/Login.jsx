/* Pantalla de inicio de sesión (demo) — prellenada con el usuario de prueba. */
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { TopNav } from "../components/TopNav.jsx";
import { Footer } from "../components/Footer.jsx";
import { Icon } from "../components/Icon.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { useToast } from "../components/Toast.jsx";

// Credenciales de demo (coinciden con el usuario de prueba sembrado en el backend).
const DEMO = { email: "eleanor.vance@email.com", password: "aurelia-demo" };

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, login } = useBooking();
  const [email, setEmail] = useState(DEMO.email);
  const [password, setPassword] = useState(DEMO.password);
  const [busy, setBusy] = useState(false);

  // Ya hay sesión → no tiene sentido el login.
  if (user) return <Navigate to="/" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const u = await login();
      toast.success("Welcome back, " + (u.nombre.split(" ")[0] || u.nombre));
      navigate("/");
    } catch {
      toast.error("No se pudo iniciar sesión");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="screen flex min-h-screen flex-col bg-paper">
      <TopNav active="" />

      <main className="grid flex-1 place-items-center px-6 py-[80px]">
        <div className="card card--raise" style={{ width: "100%", maxWidth: 420, padding: "36px 34px", background: "#fff" }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Members</div>
          <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px", color: "var(--color-ink)" }}>Sign in</h1>
          <p className="muted" style={{ margin: "0 0 24px", fontSize: 14.5 }}>
            Access your bookings and member rates.
          </p>

          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <label style={{ display: "block" }}>
              <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--color-muted)", marginBottom: 6 }}>Email</span>
              <input
                type="email"
                className="input"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label style={{ display: "block" }}>
              <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--color-muted)", marginBottom: 6 }}>Password</span>
              <input
                type="password"
                className="input"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="btn btn--navy" disabled={busy} style={{ marginTop: 4 }}>
              {busy ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="muted" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontSize: 12.5, lineHeight: 1.5 }}>
            <Icon name="key" size={14} />
            Demo: prellenado con el usuario de prueba. Pulsa <b style={{ color: "var(--color-ink)" }}>Sign In</b> para entrar.
          </p>
          <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>
            <Link to="/" className="muted" style={{ textDecoration: "underline" }}>Back to home</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
