# VIN Decoder

A single-page application for decoding Vehicle Identification Numbers (VIN) and viewing detailed vehicle information. Built as a portfolio project to demonstrate a modern React + TypeScript workflow: server-state management, form validation, client-side routing, and persisted local state.

**Live demo:** https://vin-decoder-ruddy.vercel.app  
**Repository:** https://github.com/PustovoitA/Vin-Decoder

## Features

- 🔍 **VIN lookup** — enter a 17-character VIN and get decoded vehicle data (make, model, year, and more)
- ✅ **Real-time form validation** — instant feedback on VIN format via `react-hook-form`
- 🕓 **Search history** — the last 3 lookups are saved locally and persist across sessions
- ⚡ **Async state handling** — loading, error, and success states managed with TanStack Query
- 🧭 **Client-side routing** — nested layouts and a 404 fallback via React Router v7

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Server state | TanStack Query (`useQuery`, `useMutation`) |
| Client state | Zustand (with `persist` middleware) |
| Forms & validation | React Hook Form |
| Routing | React Router v7 (`createBrowserRouter`, Layout/Outlet) |
| Linting | ESLint + typescript-eslint |
| Deployment | Vercel |

## How It Works

1. The user enters a VIN into a validated input field.
2. On submit, a mutation request is sent via TanStack Query to decode the VIN.
3. The result is displayed, and the query is added to a history list capped at 3 entries.
4. History is persisted to local storage using Zustand's `persist` middleware, so it survives page reloads.
5. Failed requests are handled gracefully and do **not** pollute the search history.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/PustovoitA/Vin-Decoder.git
cd Vin-Decoder
npm install
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level components
├── store/          # Zustand store (VIN history)
├── hooks/          # Custom hooks / TanStack Query hooks
├── types/          # TypeScript types
└── router/         # React Router configuration
```

## Author

**Andrii Pustovoit**  
Frontend Developer | React / TypeScript  
[LinkedIn](https://linkedin.com/in/andrii-pustovoit-0b6176358) · [GitHub](https://github.com/PustovoitA)
