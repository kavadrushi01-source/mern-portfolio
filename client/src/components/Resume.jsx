import { useState } from "react";
import { jsPDF } from "jspdf";
import { PORTFOLIO_URL, RESUME_PROJECT_ORDER, RESUME_PROJECTS } from "../data/resumeProjects.js";

export default function Resume({ portfolio, projects }) {
  const [busy, setBusy] = useState(false);
  const resumeProjects = RESUME_PROJECT_ORDER
    .map((title) => projects.find((project) => project.title === title))
    .filter(Boolean);

  function downloadPdf() {
    setBusy(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const M = 48;
      let y = 60;

      /*
       * ATS-SAFE HEADER
       * The previous version painted a full-width dark teal banner with white
       * text. Greyscale conversion and some PDF parsers lose contrast on that,
       * so the header now uses dark ink on white with a rule underneath. All
       * 14 core PDF fonts are standard, so no font embedding is required and
       * text extraction is reliable.
       */
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

      /* Contact details are clickable links in a measured two-column grid. */
      doc.setFontSize(9);
      const CONTACT = [
        { label: "Email", value: "kavadrushi01@gmail.com", url: "mailto:kavadrushi01@gmail.com" },
        { label: "Phone", value: "+91 93285 81846", url: "tel:+919328581846" },
        { label: "GitHub", value: "github.com/kavadrushi01-source", url: "https://github.com/kavadrushi01-source" },
        { label: "Portfolio", value: "mern-portfolio-client-three.vercel.app", url: PORTFOLIO_URL }
      ];
      const COL_W = (W - M * 2) / 2;
      CONTACT.forEach((c, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = M + col * COL_W;
        const cy = 99 + row * 13;
        doc.setTextColor(145, 145, 145);
        doc.text(`${c.label}: `, x, cy);
        const lw = doc.getTextWidth(`${c.label}: `);
        // Clamp the value to the column so it can never spill into the margin.
        const room = COL_W - lw - 10;
        let shown = c.value;
        if (doc.getTextWidth(shown) > room) {
          while (shown.length > 4 && doc.getTextWidth(`${shown}...`) > room) {
            shown = shown.slice(0, -1);
          }
          shown = `${shown}...`;
        }
        doc.setTextColor(75, 75, 75);
        doc.text(shown, x + lw, cy, { link: c.url });
      });

      doc.setDrawColor(120, 120, 120);
      doc.setLineWidth(1.4);
      doc.line(M, 118, W - M, 118);

      // Standard, recognisable ATS section heading.
      const section = (title) => {
        y += 24;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0);
        doc.text(title.toUpperCase(), M, y);
        const tw = doc.getTextWidth(title.toUpperCase());
        doc.setDrawColor(90, 90, 90);
        doc.setLineWidth(1);
        doc.line(M, y + 5, M + tw, y + 5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(65, 65, 65);
        y += 19;
      };

      /*
       * The project/summary copy is authored with typographic punctuation
       * (em dashes, en dashes, curly quotes) that lives in fallback.js. Those
       * characters are valid in WinAnsi, but several ATS PDF readers and older
       * text extractors mangle or drop them. Normalising to ASCII here keeps
       * every sentence intact for keyword matching, and the source copy in
       * fallback.js stays nicely punctuated for the website.
       */
      const ascii = (s) =>
        String(s)
          .replace(/[\u2014\u2013]/g, "-") // em / en dash
          .replace(/[\u2018\u2019]/g, "'") // curly single quotes
          .replace(/[\u201C\u201D]/g, '"') // curly double quotes
          .replace(/\u2026/g, "...") // ellipsis
          .replace(/\u00A0/g, " ") // non-breaking space
          .replace(/\s+/g, " ")
          .trim();

      // Keep the entire resume on one page and fail clearly if it no longer fits.
      const PAGE_H = doc.internal.pageSize.getHeight();
      const BOTTOM = PAGE_H - 62;
      const ensureRoom = (needed) => {
        if (y + needed > BOTTOM) {
          throw new Error("Resume content exceeds one A4 page.");
        }
      };

      y = 138;
      /*
       * "PROFESSIONAL SUMMARY" is the standard ATS section name. The old
       * version drew an inline "Summary" heading, which many parsers do not
       * recognise as a section boundary.
       */
      /*
       * Section order is Technical Skills -> Projects -> Education. Recruiters
       * and ATS keyword scanners expect skills and shipped work up front.
       */
      section("Technical Skills");
      doc.setTextColor(65, 65, 65);
      doc.setFontSize(9.5);
      /*
       * Skills are grouped by category rather than emitted as one long run-on
       * line. Categorised lists match how ATS keyword matchers scan for
       * technologies and keep the block inside the page width.
       */
      const SKILL_GROUPS = [
        ["Frontend", "React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Next.js"],
        ["Backend", "Node.js, Express.js, REST API"],
        ["Databases", "MongoDB, MySQL"],
        ["Tools and Cloud", "Git, GitHub, Vercel, Render"]
      ];
      SKILL_GROUPS.forEach(([label, items]) => {
        const line = `${label}: ${items}`;
        const gl = doc.splitTextToSize(line, W - M * 2);
        ensureRoom(gl.length * 12 + 3);
        // Bold the category label, then the items in regular weight.
        doc.setFont("helvetica", "bold");
        doc.text(`${label}: `, M, y);
        const lw = doc.getTextWidth(`${label}: `);
        doc.setFont("helvetica", "normal");
        const itemLines = doc.splitTextToSize(items, W - M * 2 - lw);
        doc.text(itemLines, M + lw, y);
        y += Math.max(gl.length, itemLines.length) * 12 + 3;
      });

      section("Projects");
      const projectsShown = resumeProjects.length;
      resumeProjects.forEach((p, idx) => {
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
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
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
        if (idx < projectsShown - 1) {
          doc.setDrawColor(175, 175, 175);
          doc.setLineWidth(0.5);
          doc.line(M, y, W - M, y);
          y += 7;
        }
      });

      // Education sits after Projects so the strongest content leads. The
      // coursework line adds academic keyword coverage that a bare degree
      // line does not.
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

      ensureRoom(20);
      doc.setDrawColor(175, 175, 175);
      doc.setLineWidth(0.7);
      doc.line(M, y + 2, W - M, y + 2);

      /*
       * PDF document properties. Some ATS ingestion tools read Title / Author /
       * Subject / Keywords from the document info dictionary and use them to
       * seed the candidate record, so they are populated here.
       */
      doc.setProperties({
        title: `${portfolio.name} - Resume - MERN Stack Developer`,
        subject: "Resume - MERN Stack Developer (React.js, Node.js, Express.js, MongoDB, MySQL)",
        author: portfolio.name,
        keywords:
          "MERN Stack Developer, React.js, Node.js, Express.js, MongoDB, Mongoose, MySQL, TypeScript, JavaScript, REST API, JWT, Google OAuth, Tailwind CSS, Leaflet, OpenStreetMap, Nominatim, OSRM, Razorpay, bcrypt, Zod, Helmet, Git, GitHub, Vercel",
        creator: "Kavad Rushi Portfolio"
      });

      if (doc.internal.getNumberOfPages() !== 1) {
        throw new Error("Resume PDF must contain exactly one page.");
      }
      doc.save(`${portfolio.name.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (error) {
      console.error("[resume] PDF generation failed:", error);
      window.alert("The resume PDF could not be generated. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="resume" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Resume</span>
          <h2 className="section-title">
            Resume & <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-sub">
            Just visit my resume online, or download a copy as a PDF.
          </p>
        </div>

        <div className="resume-card card">
          <div className="resume-head">
            <div>
              <h3>{portfolio.name}</h3>
              <p>{portfolio.title} • Full-stack developer</p>
            </div>
            <div className="resume-actions">
              <a className="btn btn-outline" href="/resume" target="_blank" rel="noreferrer">
                Visit Resume ↗
              </a>
              <button className="btn btn-primary" onClick={downloadPdf} disabled={busy}>
                {busy ? "Preparing…" : "⬇ Download Resume"}
              </button>
            </div>
          </div>

          <div className="resume-body">
            <div className="resume-col">
              <h4>Education</h4>
              {portfolio.education.map((e, i) => (
                <div key={i} className="resume-row">
                  <strong>{e.degree}</strong>
                  <span>{e.institution}</span>
                  <em>{e.period}{e.cgpa ? ` · CGPA ${e.cgpa}` : ""}</em>
                </div>
              ))}
            </div>
            <div className="resume-col">
              <h4>Skills</h4>
              <div className="skill-grid">
                {portfolio.skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="resume-projects">
            <h4>Top Projects</h4>
            <div className="resume-proj-list">
              {resumeProjects.map((p) => (
                <div key={p.title} className="resume-proj">
                  <strong>{p.title}</strong> — {p.subtitle}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      Live ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}