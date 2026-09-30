import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Resume({ portfolio, projects }) {
  const [busy, setBusy] = useState(false);

  function downloadPdf() {
    setBusy(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const M = 48;
      let y = 60;

      doc.setFillColor(10, 81, 74);
      doc.rect(0, 0, W, 110, "F");

      doc.setTextColor(255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text(portfolio.name.toUpperCase(), M, 52);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.setTextColor(167, 243, 208);
      doc.text(portfolio.title, M, 74);
      doc.setFontSize(11);
      doc.text(
        "+91 93285 81846  •  kavadrushi01@gmail.com  •  github.com/kavadrushi01-source",
        M,
        93
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(6, 95, 70);

      const section = (title) => {
        y += 22;
        doc.setFontSize(14);
        doc.text(title.toUpperCase(), M, y);
        doc.setDrawColor(20, 184, 166);
        doc.setLineWidth(2);
        doc.line(M, y + 6, M + 170, y + 6);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(30, 41, 59);
        y += 20;
      };

      y = 130;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Summary", M, y + 12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(50, 60, 80);
      y += 30;
      portfolio.about.forEach((t) => {
        const lines = doc.splitTextToSize(t, W - M * 2);
        doc.text(lines, M, y);
        y += lines.length * 14 + 4;
      });

      section("Education");
      portfolio.education.forEach((e) => {
        doc.setFont("helvetica", "bold");
        doc.text(e.degree, M, y);
        doc.setFont("helvetica", "normal");
        doc.text(
          `${e.institution}   |   ${e.period}${e.cgpa ? `   |   CGPA: ${e.cgpa}` : ""}`,
          M,
          y + 15
        );
        y += 34;
      });

      doc.setFont("helvetica", "bold");
      doc.text("Skills", M, y);
      doc.setTextColor(20, 184, 166);
      doc.setLineWidth(2);
      doc.line(M, y + 6, M + 100, y + 6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(50, 60, 80);
      y += 22;
      // Wrap instead of one long line - with 11+ skills a single line would
      // run off the right edge of the A4 page.
      const skillLines = doc.splitTextToSize(portfolio.skills.join("  •  "), W - M * 2);
      doc.text(skillLines, M, y);
      y += skillLines.length * 14;

      section("Projects");
      projects.slice(0, 2).forEach((p) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`${p.title} — ${p.subtitle}`, M, y);
        y += 13;
        // Tech stack line (teal)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(13, 148, 136);
        const tech = doc.splitTextToSize(p.tech.join(" • "), W - M * 2);
        doc.text(tech, M, y);
        y += tech.length * 12 + 2;
        // Description
        doc.setTextColor(50, 60, 80);
        const lines = doc.splitTextToSize(p.description, W - M * 2);
        doc.text(lines, M, y + 10);
        y += lines.length * 13 + 6;
        // Key highlights as bullets (capped so both projects fit one A4 page)
        (p.highlights || []).slice(0, 3).forEach((h) => {
          const bl = doc.splitTextToSize(`•  ${h}`, W - M * 2 - 12);
          doc.text(bl, M + 12, y + 10);
          y += bl.length * 13 + 3;
        });
        // Live link so recruiters can open the project straight from the PDF
        if (p.live) {
          doc.setTextColor(13, 118, 110);
          doc.text(`Live: ${p.live.replace(/^https?:\/\//, "")}`, M + 12, y + 10);
          y += 16;
        }
        y += 8;
      });

      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      doc.text(
        "kavadrushi01@gmail.com  •  +91 93285 81846  •  Available for work",
        M,
        doc.internal.pageSize.getHeight() - 20
      );

      doc.save(`${portfolio.name.replace(/\s+/g, "_")}_Resume.pdf`);
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
              {projects.slice(0, 2).map((p) => (
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