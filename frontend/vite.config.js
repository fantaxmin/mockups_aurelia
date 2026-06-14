import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Acceso a la lógica y datos compartidos del monorepo.
      "@shared": path.join(repoRoot, "shared"),
    },
  },
  server: {
    port: 5173,
    // Permite importar archivos fuera de /frontend (la carpeta /shared).
    fs: { allow: [repoRoot] },
    // Redirige las llamadas /api al backend Express durante el desarrollo.
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
