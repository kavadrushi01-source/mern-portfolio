import { FALLBACK_PORTFOLIO, FALLBACK_PROJECTS } from "./data/fallback.js";

// API base URL, in priority order:
// 1. VITE_API_URL build env (if you set it in Vercel's dashboard)
// 2. production builds call Render directly (Render allows CORS "*")
// 3. local dev falls back to the vite proxy (same origin)
const BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "https://kavad-rushi-portfolio.onrender.com" : "");

async function getJSON(url) {
  const res = await fetch(`${BASE}${url}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchPortfolio() {
  try {
    return await getJSON("/api/portfolio");
  } catch {
    return FALLBACK_PORTFOLIO;
  }
}

export async function fetchProjects() {
  try {
    return await getJSON("/api/projects");
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function sendContact({ name, number, message }) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, number, message })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}