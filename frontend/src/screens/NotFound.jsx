/* Pantalla 404 — ruta no disponible. */
import { Link } from "react-router-dom";
import { TopNav } from "../components/TopNav.jsx";
import { Footer } from "../components/Footer.jsx";

export default function NotFound() {
  return (
    <div className="screen flex min-h-screen flex-col bg-paper">
      <TopNav active="" />

      <main className="grid flex-1 place-items-center px-6 py-[120px]">
        <div className="mx-auto max-w-[560px] text-center">
          <div className="display tnum text-[96px] leading-none text-gold">404</div>
          <div className="eyebrow mt-[18px] mb-[14px]">Page not found</div>
          <h1 className="display mb-4 text-[40px] text-ink">
            This page isn't available yet
          </h1>
          <p className="mx-auto mb-8 max-w-[460px] text-[17px] leading-[1.6] text-muted">
            The page you're looking for doesn't exist or is still being prepared.
            Let's get you back to where the good stays are.
          </p>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <Link to="/" className="btn btn--navy">
              Back to Home
            </Link>
            <Link to="/rooms" className="btn btn--ghost">
              Browse Rooms
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
