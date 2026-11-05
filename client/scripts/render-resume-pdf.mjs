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
import {
  PORTFOLIO_URL,
  RESUME_PROJECT_ORDER,
  RESUME_PROJECTS
} from "../src/data/resumeProjects.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(here, "..", "ats-resume-proof.pdf");

const portfolio = FALLBACK_PORTFOLIO;
const projects = FALLBACK_PROJECTS;

const doc = new jsPDF({ unit: "pt", format: "a4" });
const W = doc.internal.pageSize.getWidth();
const M = 48;
let y = 132;

doc.setTextColor(0, 0, 0);
doc.setFont("helvetica", "bold");
doc.setFontSize(28);
doc.text(portfolio.name.toUpperCase(), M, 62, {
  link: "https://github.com/kavadrushi01-source"
});
doc.setFont("helvetica", "normal");
doc.setFontSize(12.5);
doc.setTextColor(55, 55, 55);
doc.text("MERN Stack Developer", M, 82);

// Labelled, clickable contact details in a two-column grid so nothing overflows.
doc.setFontSize(9);
const CONTACT = [
  { label: "Email", value: "kavadrushi01@gmail.com", url: "mailto:kavadrushi01@gmail.com" },
  { label: "Phone", value: "+91 93285 81846", url: "tel:+919328581846" },
  { label: "GitHub", value: "github.com/kavadrushi01-source", url: "https://github.com/kavadrushi01-source" },
  { label: "Portfolio", value: "mern-portfolio-client-three.vercel.app", url: PORTFOLIO_URL }
];
const COL_W = (W - M * 2) / 2;
const overflow = [];
CONTACT.forEach((c, i) => {
  const x = M + (i % 2) * COL_W;
  const cy = 99 + Math.floor(i / 2) * 13;
  doc.setTextColor(145, 145, 145);
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
  doc.setTextColor(75, 75, 75);
  doc.text(shown, x + lw, cy, { link: c.url });
});
if (overflow.length) {
  console.error(`CONTACT OVERFLOW: ${overflow.join("; ")}`);
  process.exit(1);
}
doc.setDrawColor(120, 120, 120);
doc.setLineWidth(1.4);
doc.line(M, 118, W - M, 118);

const section = (title) => {
  y += 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(0, 0, 0);
  const t = title.toUpperCase();
  doc.text(t, M, y);
  const tw = doc.getTextWidth(t);
  doc.setDrawColor(90, 90, 90);
  doc.setLineWidth(1);
  doc.line(M, y + 5, M + tw, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(65, 65, 65);
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
  if (y + needed > BOTTOM) throw new Error("Resume content exceeds one A4 page.");
};

section("Technical Skills");
doc.setTextColor(65, 65, 65);
doc.setFontSize(9.5);
const SKILL_GROUPS = [
  ["Frontend", "React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Next.js"],
  ["Backend", "Node.js, Express.js, REST API"],
  ["Databases", "MongoDB, MySQL"],
  ["Tools and Cloud", "Git, GitHub, Vercel, Render"]
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
RESUME_PROJECT_ORDER
  .map((title) => projects.find((project) => project.title === title))
  .filter(Boolean)
  .forEach((p) => {
  const resumeProject = RESUME_PROJECTS[p.title];
  ensureRoom(170);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(p.title, M, y);
  const titleW = doc.getTextWidth(p.title);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(115, 115, 115);
  const subtitle = doc.splitTextToSize(` - ${p.subtitle}`, W - M * 2 - titleW - 4);
  doc.text(subtitle, M + titleW + 4, y);
  y += 13;
  doc.setFontSize(8.5);
  doc.setTextColor(75, 75, 75);
  const tech = doc.splitTextToSize(`Tech: ${resumeProject.tech}`, W - M * 2);
  doc.text(tech, M, y);
  y += tech.length * 9 + 1;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  const lines = doc.splitTextToSize(ascii(resumeProject.description), W - M * 2);
  doc.text(lines, M, y + 9);
  y += lines.length * 10 + 3;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(85, 85, 85);
  resumeProject.highlights.forEach((h) => {
    const bl = doc.splitTextToSize(`-  ${ascii(h)}`, W - M * 2 - 10);
    ensureRoom(bl.length * 9 + 3);
    doc.text(bl, M + 10, y + 8);
    y += bl.length * 9 + 2;
  });
  ensureRoom(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(75, 75, 75);
  doc.text("More info: GitHub | Portfolio", M + 10, y + 8);
  const githubStart = M + 10 + doc.getTextWidth("More info: ");
  const githubWidth = doc.getTextWidth("GitHub");
  const separatorWidth = doc.getTextWidth(" | ");
  doc.link(githubStart, y, githubWidth, 10, { url: p.github });
  doc.link(githubStart + githubWidth + separatorWidth, y, doc.getTextWidth("Portfolio"), 10, { url: PORTFOLIO_URL });
  y += 12;
});

section("Education");
portfolio.education.forEach((e) => {
  ensureRoom(56);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(e.degree, M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(105, 105, 105);
  doc.text(
    `${e.institution}   |   ${e.period}${e.cgpa ? `   |   CGPA: ${e.cgpa}` : ""}`,
    M,
    y + 14
  );
  doc.setTextColor(140, 140, 140);
  doc.text(
    "Coursework: Data Structures, Algorithms, Database Systems, Web Development",
    M,
    y + 28
  );
  y += 44;
});

ensureRoom(20);
if (doc.internal.getNumberOfPages() !== 1) {
  throw new Error("Resume PDF must contain exactly one page.");
}

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
  "TECHNICAL SKILLS", "PROJECTS", "EDUCATION",
  "MongoDB", "Express.js", "Leaflet", "OpenStreetMap", "OSRM", "Razorpay",
  "Bachelor of Computer Applications", "FoodHub", "Studyfy", "Portfolio",
  "mern-portfolio-client-three.vercel.app",
  "Multi-tenant", "Groq AI", "Prisma", "Next.js", "admin@foodhub.com",
  "Admin@123", "user@foodhub.com", "User@123", "delivery@foodhub.com",
  "Delivery@123", "Socket.io", "report-card remarks", "attendance anomalies",
  "six core roles"
];
const missing = mustContain.filter((k) => !extracted.includes(k));
const mustNotContain = ["linkedin.com/in/kavad-rushi-b24484411"];
const mustAlsoContain = [
  "Foodie",
  "100+ intents",
  "tenant isolation",
  "school platform",
  "GitHub",
  "Portfolio"
];
const unwanted = mustNotContain.filter((k) => extracted.includes(k));
const missing2 = mustAlsoContain.filter((k) => !extracted.includes(k));
console.log(`extracted text: ${extracted.length} chars`);
console.log(`non-ASCII chars in extracted text: ${nonAscii.length}`);
if (nonAscii.length) console.log(`  sample: ${JSON.stringify(nonAscii.slice(0, 8))}`);
console.log(missing.length ? `MISSING: ${missing.join(", ")}` : "all probe keywords present in extracted text");
console.log(unwanted.length ? `UNWANTED: ${unwanted.join(", ")}` : "LinkedIn absent from extracted text");
console.log(missing2.length ? `MISSING: ${missing2.join(", ")}` : "condensed project summaries present");
if (missing.length || unwanted.length || missing2.length) process.exit(1);