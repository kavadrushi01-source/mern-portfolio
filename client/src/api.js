import { FALLBACK_PORTFOLIO, FALLBACK_PROJECTS } from "./data/fallback.js";

// API base URL, in priority order:
// 1. VITE_API_URL build env (if a backend lives elsewhere)
// 2. same origin ("") - on Render the Express server answers /api/*
//    directly; on Vercel (no backend) same-origin /api/* 404s fast and
//    every caller below falls back to bundled data. Never point PROD at
//    a sleeping backend URL here: each visit would hang until it times
//    out before the fallback kicks in.
const BASE = import.meta.env.VITE_API_URL || "";

// Owner's WhatsApp (must match server default + fallback socials) - used
// only when no backend is reachable to build the link instead.
const OWNER_WHATSAPP = "919328581846";

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

export async function sendContact({ name, number, message, to }) {
  const clean = {
    name: (name ?? "").trim(),
    number: (number ?? "").trim(),
    message: (message ?? "").trim()
  };
  if (!clean.name || !clean.number || !clean.message) {
    throw new Error("name, number and message are required");
  }
  if (clean.message.length > 2000) {
    throw new Error("Message is too long (max 2000 chars)");
  }
  // Server first (saves a backup copy when a backend is awake)...
  try {
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean)
    });
    const data = await res.json();
    if (res.ok) return data;
  } catch {
    // ...backend asleep or absent - fall through to the local link below.
  }
  // ...otherwise deliver directly: the visitor's own WhatsApp carries the
  // message, which was always the real delivery channel anyway (the
  // server only ever opened this same link for them).
  const text =
    `New Portfolio Message\n` +
    `----------------------\n` +
    `Name: ${clean.name}\nNumber: ${clean.number}\n\nMessage:\n${clean.message}`;
  const digits = String(to || OWNER_WHATSAPP).replace(/[^0-9]/g, "");
  return {
    success: true,
    local: true,
    whatsapp: `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
  };
}