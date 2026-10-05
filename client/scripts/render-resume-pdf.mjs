// Renders the real resume data through the same jsPDF calls used by
// Resume.jsx, then extracts the text back out of the generated PDF. This is
// the closest local approximation of what an ATS parser receives: if the
// headings, contact fields and keywords come back as plain text, the exported
// PDF is machine-readable.
//
// Run:  node scripts/render-resume-pdf.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { jsPDF } from "jspdf";
import { FALLBACK_PORTFOLIO, FALLBACK_PROJECTS } from "../src/data/fallback.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(here, "..", "ats-resume-proof.pdf");

const portfolio = FALLBACK_PORTFOLIO;
const projects = FALLBACK_PROJECTS;

const doc = new jsPDF({ unit: "pt", format: "a4" });
const W = doc.internal.pageSize.getWidth();
const M = 48;
let y = 132;

doc.setTextColor(17, 24, 39);
doc.setFont("helvetica", "bold");
doc.setFontSize(26);
doc.text(portfolio.name.toUpperCase(), M, 62, {
  link: "https://github.com/kavadrushi01-source"
});
doc.setFont("helvetica", "normal");
doc.setFontSize(12.5);
doc.setTextColor(15, 118, 110);
doc.text("MERN Stack Developer", M, 82);

// Labelled, clickable contact details in a two-column grid so nothing overflows.
doc.setFontSize(9);
const CONTACT = [
  { label: "Email", value: "kavadrushi01@gmail.com", url: "mailto:kavadrushi01@gmail.com" },
  { label: "Phone", value: "+91 93285 81846", url: "tel:+919328581846" },
  { label: "GitHub", value: "github.com/kavadrushi01-source", url: "https://github.com/kavadrushi01-source" },
  { label: "LinkedIn", value: "linkedin.com/in/kavad-rushi-b24484411", url: "https://linkedin.com/in/kavad-rushi-b24484411" }
];
const COL_W = (W - M * 2) / 2;
const overflow = [];
CONTACT.forEach((c, i) => {
  const x = M + (i % 2) * COL_W;
  const cy = 99 + Math.floor(i / 2) * 13;
  doc.setTextColor(90, 100, 115);
  doc.text(`${c.label}: `, x, cy);
  const lw = doc.getTextWidth(`${c.label}: `);
  const room = COL_W - lw - 10;
  let shown = c.value;
  if (doc.getTextWidth(shown) > room) {
    while (shown.length > 4 && doc.getTextWidth(`${shown}...`) > room) shown = shown.slice(0, -1);
    shown = `${shown}...`;
  }
  const rightEdge = x + lw + doc.getTextWidth(shown);
  if (rightEdge > W - M + 0.5) overflow.push(`${c.label} ends at ${rightEdge.toFixed(1)} > ${(W - M).toFixed(1)}`);
  doc.setTextColor(15, 118, 110);
  doc.text(shown, x + lw, cy, { link: c.url });
});
if (overflow.length) {
  console.error(`CONTACT OVERFLOW: ${overflow.join("; ")}`);
  process.exit(1);
}
doc.setDrawColor(15, 118, 110);
doc.setLineWidth(1.4);
doc.line(M, 118, W - M, 118);

const section = (title) => {
  y += 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 118, 110);
  const t = title.toUpperCase();
  doc.text(t, M, y);
  const tw = doc.getTextWidth(t);
  doc.setDrawColor(15, 118, 110);
  doc.setLineWidth(0.8);
  doc.line(M, y + 5, M + tw, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(30, 41, 59);
  y += 19;
};

// Normalise typographic punctuation to ASCII: em/en dashes, curly quotes,
// ellipsis and non-breaking spaces are valid WinAnsi but are mangled or
// dropped by some ATS PDF readers.
const ascii = (s) =>
  String(s)
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const PAGE_H = doc.internal.pageSize.getHeight();
const BOTTOM = PAGE_H - 62;
const ensureRoom = (needed) => {
  if (y + needed > BOTTOM) {
    doc.addPage();
    y = 60;
  }
};

section("Professional Summary");
doc.setTextColor(50, 60, 80);
doc.setFontSize(10);
const sumLines = doc.splitTextToSize(ascii(portfolio.about.join(" ")), W - M * 2);
doc.text(sumLines, M, y);
y += sumLines.length * 13 + 2;

section("Technical Skills");
doc.setTextColor(50, 60, 80);
doc.setFontSize(9.5);
const SKILL_GROUPS = [
  ["Frontend", "React.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Vite, Zustand, React Router, Framer Motion"],
  ["Backend", "Node.js, Express.js, REST API, JWT Authentication, Google OAuth, Zod, Helmet, Rate Limiting"],
  ["Databases", "MongoDB, Mongoose, MySQL, SQL, Data Modelling"],
  ["Maps and Location", "Leaflet, OpenStreetMap, Nominatim Geocoding, OSRM Routing, Haversine Formula, GPS Tracking"],
  ["Payments", "Razorpay (Card, Netbanking, Wallet, UPI, Cash on Delivery)"],
  ["Tools and Cloud", "Git, GitHub, Postman, Vercel, Render, Serverless Functions, CI/CD"]
];
SKILL_GROUPS.forEach(([label, items]) => {
  const itemLines = doc.splitTextToSize(items, W - M * 2 - 120);
  ensureRoom(itemLines.length * 12 + 3);
  doc.setFont("helvetica", "bold");
  doc.text(`${label}: `, M, y);
  const lw = doc.getTextWidth(`${label}: `);
  doc.setFont("helvetica", "normal");
  doc.text(itemLines, M + lw, y);
  y += itemLines.length * 12 + 3;
});

section("Projects");
projects.slice(0, 2).forEach((p) => {
  ensureRoom(200);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(15, 23, 42);
  doc.text(p.title, M, y);
  const titleW = doc.getTextWidth(p.title);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(` - ${p.subtitle}`, M + titleW + 4, y);
  y += 13;
  doc.setFontSize(9);
  doc.setTextColor(13, 148, 136);
  const tech = doc.splitTextToSize(`Tech: ${p.tech.join(", ")}`, W - M * 2);
  doc.text(tech, M, y);
  y += tech.length * 11 + 2;
  doc.setFontSize(9.5);
  doc.setTextColor(50, 60, 80);
  const lines = doc.splitTextToSize(ascii(p.description), W - M * 2);
  doc.text(lines, M, y + 10);
  y += lines.length * 12 + 6;
  // Mirror the resume's filter: drop the maps bullet so the chatbot
  // highlight fits inside the 5-bullet cap (see Resume.jsx).
  (p.highlights || [])
    .filter((h) => !h.startsWith("Maps & routing with no paid keys"))
    .slice(0, 5)
    .forEach((h) => {
    ensureRoom(34);
    const bl = doc.splitTextToSize(`-  ${ascii(h)}`, W - M * 2 - 12);
    doc.text(bl, M + 12, y + 10);
    y += bl.length * 12 + 3;
  });
  [p.live, p.github].filter(Boolean).forEach((url) => {
    ensureRoom(24);
    const label = url === p.live ? "Live Application" : "Source Code";
    const shown = url.replace(/^https?:\/\//, "");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(2, 132, 199);
    doc.text(`${label}: `, M + 12, y + 10);
    const lw = doc.getTextWidth(`${label}: `);
    doc.setFont("helvetica", "normal");
    doc.text(shown, M + 12 + lw, y + 10, { link: url });
    y += 15;
  });
  y += 8;
});

section("Education");
portfolio.education.forEach((e) => {
  ensureRoom(56);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(17, 24, 39);
  doc.text(e.degree, M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `${e.institution}   |   ${e.period}${e.cgpa ? `   |   CGPA: ${e.cgpa}` : ""}`,
    M,
    y + 14
  );
  doc.setTextColor(90, 100, 115);
  doc.text(
    "Relevant Coursework: Data Structures, Algorithms, Database Management Systems, Web Development, Operating Systems",
    M,
    y + 28
  );
  y += 44;
});

doc.setProperties({
  title: `${portfolio.name} - Resume - MERN Stack Developer`,
  author: portfolio.name,
  keywords: "MERN Stack Developer, React.js, Node.js, Express.js, MongoDB, MySQL, Leaflet, OpenStreetMap, Razorpay"
});

fs.writeFileSync(outFile, Buffer.from(doc.output("arraybuffer")));
console.log(`wrote ${outFile} (${doc.internal.getNumberOfPages()} page(s))`);

// --- Prove the text is extractable, the way an ATS would read it -------------
const raw = fs.readFileSync(outFile).toString("latin1");
const extracted = (raw.match(/\((?:[^()\\]|\\.)*\)/g) || [])
  .map((s) => s.slice(1, -1).replace(/\\([()\\])/g, "$1"))
  .join(" ");

const nonAscii = (extracted.match(/[\u0080-\uFFFF]/g) || []);
const mustContain = [
  "KAVAD RUSHI", "MERN Stack Developer", "Email", "kavadrushi01@gmail.com",
  "PROFESSIONAL SUMMARY", "TECHNICAL SKILLS", "PROJECTS", "EDUCATION",
  "MongoDB", "Express.js", "Leaflet", "OpenStreetMap", "OSRM", "Razorpay",
  "Bachelor of Computer Applications", "FoodHub", "Wanderlust"
];
const missing = mustContain.filter((k) => !extracted.includes(k));
// The resume deliberately drops the long maps bullet; the extracted text
// must prove both that it is gone and that the chatbot line made it in.
const mustNotContain = ["Maps & routing with no paid keys"];
const mustAlsoContain = ["Foodie", "100+ hand-written intents"];
const unwanted = mustNotContain.filter((k) => extracted.includes(k));
const missing2 = mustAlsoContain.filter((k) => !extracted.includes(k));
console.log(`extracted text: ${extracted.length} chars`);
console.log(`non-ASCII chars in extracted text: ${nonAscii.length}`);
if (nonAscii.length) console.log(`  sample: ${JSON.stringify(nonAscii.slice(0, 8))}`);
console.log(missing.length ? `MISSING: ${missing.join(", ")}` : "all probe keywords present in extracted text");
console.log(unwanted.length ? `UNWANTED: ${unwanted.join(", ")}` : "maps bullet absent from extracted text");
console.log(missing2.length ? `MISSING: ${missing2.join(", ")}` : "chatbot line present in extracted text");
if (missing.length || unwanted.length || missing2.length) process.exit(1);