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

## Configuration (server/.env)

- `MONGODB_URI` — set your MongoDB Atlas string to persist contact messages (empty = in-memory)
- `WHATSAPP_NUMBER` — whose WhatsApp receives form messages (digits only, e.g. `919328581846`)
- `GITHUB_URL`, `LINKEDIN_URL` — driven the contact buttons

## Production build

```bash
npm run build      # builds client -> client/dist
npm start          # Express serves API + built client together
```

## Deployment

### Render (backend + full app)

The whole MERN app deploys as **one service** — Express serves the API and the built React client.

1. Push this repo to GitHub.
2. On Render → **New → Blueprint** → pick the repo. `render.yaml` is auto-detected.
3. Optional: in the service's **Environment** tab, add your `MONGODB_URI` (MongoDB Atlas). Without it the API runs on in-memory storage.
4. Deploy → open `https://<your-app>.onrender.com`. This is your **API + site** URL.

### Vercel (frontend) → points at Render

1. On Vercel → **Import Project**, pick the repo. Framework preset: **Vite**.
2. **Build command** `npm run build`, **Output directory** `client/dist`.
3. Or let `vercel.json` handle it automatically.
4. In `vercel.json`, replace `YOUR-RENDER-URL` with your `https://<your-app>.onrender.com`.
   - Alternative: instead of editing the file, add a Vercel env var `VITE_API_URL=https://<your-app>.onrender.com` (API calls go straight to Render).
5. Deploy. Your portfolio is live on Vercel with `/api` backed by Render.

> Notes
> - Contact-form messages save on the Render service (MongoDB/in-memory) and open in WhatsApp via `wa.me`.
> - Free Render services sleep after inactivity — the first load after a pause can take ~30–60s.

Happy building!