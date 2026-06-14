/**
 * Configuración de Jest para ESM nativo (sin Babel).
 * Se ejecuta con NODE_OPTIONS=--experimental-vm-modules (ver script "test").
 */
export default {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  // No se aplican transformaciones: los módulos ya son ESM nativo.
  transform: {},
  verbose: true,
};
