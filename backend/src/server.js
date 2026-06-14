/**
 * Servidor Express del Hotel Aurelia.
 * Monta CORS y JSON, expone la API en /api e inicia la limpieza TTL.
 */
import express from "express";
import cors from "cors";
import { PORT, CORS_ORIGIN, TTL_MS } from "./config.js";
import api from "./routes/api.js";
import { iniciarLimpiezaAutomatica } from "./db.js";

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Healthcheck simple.
app.get("/api/health", (_req, res) => res.json({ ok: true, ttlHoras: TTL_MS / 3_600_000 }));

app.use("/api", api);

// Inicia el barrido periódico de datos expirados.
iniciarLimpiezaAutomatica();

app.listen(PORT, () => {
  console.log(`API Hotel Aurelia escuchando en http://localhost:${PORT}`);
  console.log(`TTL de reservas: ${TTL_MS / 3_600_000} h — se eliminan automáticamente al expirar.`);
});
