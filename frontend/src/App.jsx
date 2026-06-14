/* Router de la aplicación — las 5 pantallas del flujo de reserva. */
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Results from "./screens/Results.jsx";
import Detail from "./screens/Detail.jsx";
import Checkout from "./screens/Checkout.jsx";
import Confirmation from "./screens/Confirmation.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Results />} />
      <Route path="/rooms/:id" element={<Detail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
