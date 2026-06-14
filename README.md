# Hotel Aurelia — Sistema de Reservas en Línea

Aplicación funcional construida a partir de los mockups del proyecto **Hotel Aurelia**
(documento *TorresLopez_Aurelia.pdf*). Implementa el flujo completo de reserva en cinco
pantallas, con backend, base de datos con expiración automática y pruebas unitarias.

Metodología de referencia: **RUP** — cada pantalla y cada función corresponde a un caso
de uso (CU-01 … CU-05), y cada caso de uso tiene pruebas asociadas.

---

## Arquitectura

Monorepo **pnpm** con un único `pnpm install`:

```
hotel-aurelia/
├── shared/              Código compartido (fuente única de verdad)
│   ├── data/            Datos: habitaciones, reseñas, hotel
│   └── logic/           Lógica de negocio (ESM), un módulo por caso de uso
├── backend/             API REST — Express + SQLite con TTL
│   └── src/
│       ├── config.js    Configuración (puerto, CORS, ruta BD, TTL)
│       ├── db.js        SQLite, esquema, usuario de prueba, limpieza TTL
│       ├── services/    Orquestación (reservas)
│       ├── routes/      Endpoints (express.Router)
│       └── server.js    Bootstrap de Express
├── frontend/            SPA — React + Vite + React Router + Tailwind v4
│   └── src/
│       ├── components/  Un componente por archivo
│       ├── screens/     Las 5 pantallas
│       ├── context/     Estado del flujo de reserva
│       └── lib/         API y helpers de formato
└── tests/               19 pruebas Jest (T01-01 … T05-03)
```

### Stack
- **Frontend:** React 18, Vite 6, React Router 6, Tailwind CSS v4, lucide-react.
- **Backend:** Node + Express 4, better-sqlite3.
- **Pruebas:** Jest (ESM nativo).
- **Todo en JavaScript / ESM.**

---

## Casos de uso → código → pruebas

| Caso de uso | Lógica (`shared/logic/`) | Pantalla | Pruebas |
|---|---|---|---|
| CU-01 Buscar disponibilidad | `buscarDisponibilidad.js` | Home | T01-01…04 |
| CU-02 Filtrar habitaciones | `filtrarHabitaciones.js` | Results | T02-01…05 |
| CU-03 Calcular precio | `calcularPrecio.js` | Detail | T03-01…03 |
| CU-04 Validar datos del huésped | `validarDatosHuesped.js` | Checkout | T04-01…04 |
| CU-05 Confirmar reserva | `confirmarReserva.js` | Confirmation | T05-01…03 |

La **misma** lógica la usan el backend (API), el frontend (UI) y las pruebas: una sola
fuente de verdad.

### Manejo de errores (UX)
La lógica de negocio lanza `Error` con un mensaje específico (lo que verifican las pruebas).
La UI atrapa ese error y lo muestra como **toast/pop-up** y como error inline en los campos;
nunca queda solo en consola.

---

## Requisitos
- Node.js ≥ 18
- pnpm ≥ 9

## Instalación
```bash
pnpm install
```

## Ejecución (desarrollo)
Levanta backend (`:4000`) y frontend (`:5173`) a la vez:
```bash
pnpm dev
```
Luego abre **http://localhost:5173**. Vite redirige `/api` al backend automáticamente.

Por separado:
```bash
pnpm dev:backend
pnpm dev:frontend
```

## Pruebas
```bash
pnpm test      # 19/19 pruebas (CU-01 … CU-05)
```

## Build de producción
```bash
pnpm build     # genera frontend/dist
```

---

## Base de datos y expiración automática (TTL)

Las reservas se guardan en **SQLite** (`backend/data/aurelia.sqlite`, ignorado por git).
Cada reserva incluye `expires_at`; un barrido periódico (y uno al arrancar) **elimina las
reservas vencidas**. Por defecto el TTL es **24 horas** y el barrido cada **1 hora**.

Ajustable por variables de entorno:

| Variable | Por defecto | Descripción |
|---|---|---|
| `PORT` | `4000` | Puerto del backend |
| `TTL_MS` | `86400000` (24 h) | Tiempo de vida de cada reserva |
| `SWEEP_INTERVAL_MS` | `3600000` (1 h) | Frecuencia de limpieza |
| `DB_PATH` | `backend/data/aurelia.sqlite` | Ruta del archivo SQLite |
| `CORS_ORIGIN` | `http://localhost:5173` | Origen permitido |

### Usuario de prueba
Al arrancar se siembra un usuario de prueba (**Eleanor Vance**). El checkout precarga sus
datos automáticamente (`GET /api/usuario-prueba`).

---

## API (resumen)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servicio |
| GET | `/api/hotel` | Metadatos del hotel + reseñas |
| GET | `/api/habitaciones` | Catálogo (filtros opcionales: `tipo`, `precioMax`, `ratingMin`) |
| GET | `/api/usuario-prueba` | Usuario de prueba |
| POST | `/api/disponibilidad` | CU-01 |
| POST | `/api/precio` | CU-03 |
| POST | `/api/reservas` | CU-04 + CU-05 (crea y persiste con TTL) |
| GET | `/api/reservas/:ref` | Consulta por referencia |

Los errores de negocio se devuelven como `400 { "error": "mensaje" }`.

---

## Git
- `main` — rama estable.
- `dev` — rama de desarrollo.
