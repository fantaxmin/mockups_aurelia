/* Router de la aplicación — las 5 pantallas del flujo de reserva. */
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Results from "./screens/Results.jsx";
import Detail from "./screens/Detail.jsx";
import Checkout from "./screens/Checkout.jsx";
import Confirmation from "./screens/Confirmation.jsx";
import Login from "./screens/Login.jsx";
import NotFound from "./screens/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Results />} />
      <Route path="/rooms/:id" element={<Detail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/login" element={<Login />} />
      {/* Rutas no disponibles todavía → 404 (en vez de redirigir en silencio). */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
