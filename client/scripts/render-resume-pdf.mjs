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
  RESUME_PROJECTS,
  RESUME_SUMMARY
} from "../src/data/resumeProjects.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(here, "..", "ats-resume-proof.pdf");

const portfolio = FALLBACK_PORTFOLIO;
const projects = FALLBACK_PROJECTS;

const doc = new jsPDF({ unit: "pt", format: "a4" });
const W = doc.internal.pageSize.getWidth();
const M = 48;
let y = 138;

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
  y += 18;
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
  y += 14;
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
    throw new Error(`Resume content exceeds one A4 page at y=${y} (needed ${needed}, bottom ${BOTTOM}).`);
  }
};

section("Professional Summary");
doc.setTextColor(65, 65, 65);
doc.setFontSize(9.5);
const summaryLines = doc.splitTextToSize(RESUME_SUMMARY, W - M * 2);
ensureRoom(summaryLines.length * 12 + 6);
doc.text(summaryLines, M, y);
y += summaryLines.length * 12 + 6;

section("Technical Skills");
doc.setTextColor(65, 65, 65);
doc.setFontSize(9.5);
const SKILL_GROUPS = [
  ["Frontend", "React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Next.js"],
  ["Backend", "Node.js, Express.js, REST API, JWT authentication"],
  ["Databases", "MongoDB, Mongoose, MySQL"],
  ["Tools and Cloud", "Git, GitHub, Vercel, Render"]
];
SKILL_GROUPS.forEach(([label, items]) => {
  const gl = doc.splitTextToSize(`${label}: ${items}`, W - M * 2);
  const itemLines = doc.splitTextToSize(items, W - M * 2 - doc.getTextWidth(`${label}: `));
  ensureRoom(itemLines.length * 12 + 3);
  doc.setFont("helvetica", "bold");
  doc.text(`${label}: `, M, y);
  const lw = doc.getTextWidth(`${label}: `);
  doc.setFont("helvetica", "normal");
  doc.text(itemLines, M + lw, y);
  y += Math.max(gl.length, itemLines.length) * 12 + 3;
});

section("Projects");
const projectsShown = RESUME_PROJECT_ORDER.filter((title) =>
  projects.some((project) => project.title === title)
).length;
RESUME_PROJECT_ORDER
  .map((title) => projects.find((project) => project.title === title))
  .filter(Boolean)
  .forEach((p, idx) => {
  const resumeProject = RESUME_PROJECTS[p.title];
  ensureRoom(170);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(p.title, M, y);
  y += 13;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(115, 115, 115);
  doc.setFontSize(8.5);
  const subtitle = doc.splitTextToSize(resumeProject.subtitle, W - M * 2);
  doc.text(subtitle, M, y);
  y += subtitle.length * 10 + 1;
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
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text("Project Features", M, y + 8);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(85, 85, 85);
  resumeProject.highlights.forEach((h) => {
    const bl = doc.splitTextToSize(`-  ${ascii(h)}`, W - M * 2 - 10);
    ensureRoom(bl.length * 9 + 3);
    doc.text(bl, M + 10, y + 8);
    y += bl.length * 9 + 2;
  });
  y += 10;
  if (idx < projectsShown - 1) {
    doc.setDrawColor(175, 175, 175);
    doc.setLineWidth(0.7);
    doc.line(M, y, W - M, y);
    y += 12;
  }
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
    "Relevant Coursework: Data Structures, Algorithms, Database Management Systems, Web Development, Operating Systems",
    M,
    y + 28
  );
  y += 44;
});

ensureRoom(15);
if (doc.internal.getNumberOfPages() !== 1) {
  throw new Error("Resume PDF must contain exactly one page.");
}
const moreInfo = "For more info on these projects, visit GitHub or Portfolio.";
doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(75, 75, 75);
doc.text(moreInfo, M, y + 12);
const githubStart = M + doc.getTextWidth("For more info on these projects, visit ");
const githubWidth = doc.getTextWidth("GitHub");
const portfolioStart = githubStart + githubWidth + doc.getTextWidth(" or ");
doc.link(githubStart, y + 4, githubWidth, 10, {
  url: "https://github.com/kavadrushi01-source"
});
doc.link(portfolioStart, y + 4, doc.getTextWidth("Portfolio"), 10, {
  url: PORTFOLIO_URL
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
  "TECHNICAL SKILLS", "PROJECTS", "EDUCATION",
  "MongoDB", "Express.js", "Leaflet", "OpenStreetMap", "OSRM", "Razorpay",
  "Bachelor of Computer Applications", "FoodHub", "Studyfy", "Portfolio",
  "mern-portfolio-client-three.vercel.app", "Multi-tenant School Management System",
  "Prisma", "Next.js", "Socket.io", "six core roles",
  "Project Features", "For more info on these projects", "JWT", "OTP"
];
const mustAlsoContain = [
  "Built and deployed a food-delivery platform across three role-specific apps",
  "Integrated Razorpay checkout, order tracking, OTP-confirmed payment and delivery handoffs, and mapped rider routes.",
  "Built a chatbot covering menu, order, delivery, and payment questions with 100+ intents.",
  "Implemented JWT authentication and role-based permissions for customer, admin, and delivery workflows.",
  "Built a multi-tenant school management platform with tenant isolation across 20 data models",
  "Implemented Prisma tenant scoping across 20 models with cross-tenant regression tests and administrative audit logs.",
  "Delivered student, attendance, fees, exams, timetables, and homework workflows for six core roles.",
  "Added AI-assisted report-card remarks and attendance-anomaly insights, plus Socket.io messaging.",
  "GitHub",
  "Portfolio"
];
const missing = [...mustContain, ...mustAlsoContain].filter((k) => !extracted.includes(k));
const mustNotContain = [
  "linkedin.com/in/kavad-rushi-b24484411",
  "(SaaS)",
  "Groq AI",
  "admin@foodhub.com",
  "Admin@123",
  "delivery@foodhub.com"
];
const unwanted = mustNotContain.filter((k) => extracted.includes(k));
console.log(`extracted text: ${extracted.length} chars`);
console.log(`non-ASCII chars in extracted text: ${nonAscii.length}`);
if (nonAscii.length) console.log(`  sample: ${JSON.stringify(nonAscii.slice(0, 8))}`);
console.log(missing.length ? `MISSING: ${missing.join(", ")}` : "all probe keywords present in extracted text");
console.log(unwanted.length ? `UNWANTED: ${unwanted.join(", ")}` : "excluded resume details are absent");
if (missing.length || unwanted.length) process.exit(1);