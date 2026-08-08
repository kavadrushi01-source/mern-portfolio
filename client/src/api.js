import { FALLBACK_PORTFOLIO, FALLBACK_PROJECTS } from "./data/fallback.js";

// Optional build-time override: VITE_API_URL=https://your-api.onrender.com
// Otherwise requests go to the same origin (works via vite proxy in dev, or
// via vercel.json rewrites / render single-service in production).
const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

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