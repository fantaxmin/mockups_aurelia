/**
 * Configuración central del backend del Hotel Aurelia.
 * Valores ajustables por variables de entorno.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT = Number(process.env.PORT) || 4000;

// Origen permitido para CORS (servidor de desarrollo de Vite).
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Ruta del archivo SQLite. Se ignora en git (datos efímeros).
export const DB_PATH = process.env.DB_PATH || path.join(__dirname, "..", "data", "aurelia.sqlite");

// Tiempo de vida de los datos guardados (TTL). Por defecto 24 horas.
export const TTL_MS = Number(process.env.TTL_MS) || 24 * 60 * 60 * 1000;

// Frecuencia del barrido de limpieza de datos expirados. Por defecto 1 hora.
export const SWEEP_INTERVAL_MS = Number(process.env.SWEEP_INTERVAL_MS) || 60 * 60 * 1000;
