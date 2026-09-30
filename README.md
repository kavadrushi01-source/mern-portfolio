# Kavad Rushi — MERN Portfolio

A full-stack MERN portfolio built from scratch. Frontend in **React + Vite**, backend in **Node.js + Express** exposing a **REST API**, with MongoDB through **Mongoose** (falls back to in-memory storage so it runs anywhere). Contact form messages go straight to WhatsApp via `wa.me` links.

## Features

- **Hero** — portrait illustration, name, "MERN Stack Developer", Explore / Resume / Contact buttons
- **Explore** — Introduction (auto-generated), Education timeline, Skills chips
- **Projects** — FoodHub (featured, real payments + JWT/bcrypt/Zod/Email/Google OAuth), served via the REST API
- **Resume** — inline credentials + **Visit Resume** page (print/save-as-PDF) + **Download Resume (PDF)** generated client-side with jsPDF
- **Contact** — GitHub / LinkedIn / WhatsApp buttons + a message form (Name, Number, Message) that saves via `POST /api/contact` and opens WhatsApp with the message pre-filled
- Clean dark UI, fully responsive

## Stack

MongoDB • Express • React (Vite) • Node.js • REST API • Mongoose • jsPDF • Git & GitHub

## Getting started

```bash
npm install        # installs root + server + client (npm workspaces)
npm run dev        # starts API (:4000) + frontend (:5173) together
```

- Frontend: http://localhost:5173
- API: http://localhost:4000

## API

| Method | Endpoint          | Description                              |
| ------ | ----------------- | ---------------------------------------- |
| GET    | `/api/portfolio`  | Name, title, about, education, skills, socials |
| GET    | `/api/projects`   | Project list                             |
| POST   | `/api/contact`    | `{name, number, message}` → saves message + returns WhatsApp link |
| GET    | `/api/portfolio/health` | Health check (used by `render.yaml`) |

## Configuration (server/.env)

- `MONGODB_URI` — set your MongoDB Atlas string to persist contact messages (empty = in-memory)
- `WHATSAPP_NUMBER` — whose WhatsApp receives form messages (digits only, e.g. `919328581846`)
- `GITHUB_URL`, `LINKEDIN_URL` — drive the contact buttons
- `PORTFOLIO_OWNER_NAME`, `PORTFOLIO_TITLE` — shown in the hero and footer
- `PORT` — API port; must match the Vite dev proxy (`/api` → `:4000` in `client/vite.config.js`)
- `CLIENT_ORIGIN` — origin allowed by CORS in dev
- `CLIENT_DIST` — where the built client lives (relative to `server/` or absolute); default `../client/dist`

## Production build

```bash
npm run build      # builds client -> client/dist (and mirrors it to ./dist for Vercel)
npm start          # Express serves API + built client together
```

## Deployment

### Render (backend + full app)

The whole MERN app deploys as **one service** — Express serves the API and the built React client.

1. Push this repo to GitHub.
2. On Render → **New → Blueprint** → pick the repo. `render.yaml` is auto-detected.
3. Optional: in the service's **Environment** tab, add your `MONGODB_URI` (MongoDB Atlas). Without it the API runs on in-memory storage.
4. Deploy → open `https://<your-app>.onrender.com`. This is your **API + site** URL.

### Vercel (frontend only, static)

The client is backend-independent: `client/src/api.js` tries same-origin `/api/*`
first and falls back to the bundled data in `client/src/data/fallback.js`, so the
built Vite app can be hosted on its own.

1. On Vercel → **Import Project**, pick the repo. Framework preset: **Vite**.
2. **Root Directory** = `client` (this turns the repo into a client-root project,
   which is what `client/vercel.json` is written for).
3. Leave **Build command** `npm run build` and **Output directory** `dist`;
   `client/vercel.json` pins both, and vercel.json settings win over the dashboard.
4. Clear any **Production Override** warning at the top of *Settings → Build and
   Deployment Settings*. A stale Output Directory override is the usual cause of
   `Error: No Output Directory named "dist" found after the Build completed`.
5. Deploy. To point the API at a live backend instead of the bundled fallback,
   set the env var `VITE_API_URL=https://<your-app>.onrender.com`.

> Which `vercel.json` is used?
> - Root Directory = `client` → **`client/vercel.json`** (build `npm run build`, output `dist`).
> - Root Directory = repository root → **`vercel.json`** (build `npm run build`, output `client/dist`).
>
> `client/scripts/emit-root-dist.mjs` mirrors the build to `<repo-root>/dist` after
> every build, so the output directory resolves correctly under either setting.

> Notes
> - Contact-form messages save on the Render service (MongoDB/in-memory) and open in WhatsApp via `wa.me`.
> - Free Render services sleep after inactivity — the first load after a pause can take ~30–60s.

Happy building!