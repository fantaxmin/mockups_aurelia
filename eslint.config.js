/**
 * Configuración de ESLint (flat config). Red de seguridad mínima:
 *  - reglas recomendadas de JS,
 *  - awareness de JSX (para que los componentes usados en JSX no se marquen
 *    como imports sin usar),
 *  - reglas de React Hooks (dependencias y reglas de hooks).
 */
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const unusedVars = ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }];

export default [
  { ignores: ["**/dist/**", "**/node_modules/**", "**/data/**", "**/*.db*"] },

  js.configs.recommended,

  // Frontend — React + navegador.
  {
    files: ["frontend/**/*.{js,jsx}"],
    plugins: { react, "react-hooks": reactHooks },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    rules: {
      "no-unused-vars": unusedVars,
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Backend + lógica compartida + pruebas — Node (+ Jest en tests).
  {
    files: ["backend/**/*.js", "shared/**/*.js", "tests/**/*.js", "*.config.js"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.node, ...globals.jest },
    },
    rules: {
      "no-unused-vars": unusedVars,
    },
  },
];
