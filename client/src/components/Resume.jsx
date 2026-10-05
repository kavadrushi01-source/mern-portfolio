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

      /*
       * ATS-SAFE HEADER
       * The previous version painted a full-width dark teal banner with white
       * text. Greyscale conversion and some PDF parsers lose contrast on that,
       * so the header now uses dark ink on white with a rule underneath. All
       * 14 core PDF fonts are standard, so no font embedding is required and
       * text extraction is reliable.
       */
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

      // Contact details as real, clickable PDF links. Written as labelled
      // "Label: value" text so parsers can pattern-match each field.
      doc.setFontSize(9.5);
      doc.setTextColor(55, 65, 81);
      const contactLine = [
        { label: "Email", value: "kavadrushi01@gmail.com", url: "mailto:kavadrushi01@gmail.com" },
        { label: "Phone", value: "+91 93285 81846", url: "tel:+919328581846" },
        { label: "GitHub", value: "github.com/kavadrushi01-source", url: "https://github.com/kavadrushi01-source" },
        { label: "LinkedIn", value: "linkedin.com/in/kavad-rushi-b24484411", url: "https://linkedin.com/in/kavad-rushi-b24484411" }
      ];
      let cx = M;
      contactLine.forEach((c, i) => {
        if (i > 0) {
          doc.setTextColor(120, 130, 145);
          doc.text("|", cx, 100);
          cx += doc.getTextWidth(" | ") + 2;
        }
        doc.setTextColor(90, 100, 115);
        doc.text(`${c.label}: `, cx, 100);
        cx += doc.getTextWidth(`${c.label}: `);
        doc.setTextColor(15, 118, 110);
        doc.text(c.value, cx, 100, { link: c.url });
        cx += doc.getTextWidth(c.value) + 8;
      });

      doc.setDrawColor(15, 118, 110);
      doc.setLineWidth(1.4);
      doc.line(M, 110, W - M, 110);

      // Standard, recognisable ATS section heading.
      const section = (title) => {
        y += 24;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(15, 118, 110);
        doc.text(title.toUpperCase(), M, y);
        const tw = doc.getTextWidth(title.toUpperCase());
        doc.setDrawColor(15, 118, 110);
        doc.setLineWidth(0.8);
        doc.line(M, y + 5, M + tw, y + 5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(30, 41, 59);
        y += 19;
      };

      // Keep content clear of the footer: start a fresh page instead of letting
      // a long project block run into it.
      const PAGE_H = doc.internal.pageSize.getHeight();
      const BOTTOM = PAGE_H - 62;
      const ensureRoom = (needed) => {
        if (y + needed > BOTTOM) {
          doc.addPage();
          y = 60;
        }
      };

      y = 132;
      /*
       * "PROFESSIONAL SUMMARY" is the standard ATS section name. The old
       * version drew an inline "Summary" heading, which many parsers do not
       * recognise as a section boundary.
       */
      section("Professional Summary");
      doc.setTextColor(50, 60, 80);
      doc.setFontSize(10);
      // Concatenate into one paragraph: some parsers split a multi-paragraph
      // summary into unrelated fields.
      const summary = portfolio.about.join(" ");
      const sumLines = doc.splitTextToSize(summary, W - M * 2);
      doc.text(sumLines, M, y);
      y += sumLines.length * 13 + 4;

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

      // Uses the same heading + spacing as every other section (the old inline
      // version drew "Skills" straight on top of the education line).
      section("Technical Skills");
      doc.setTextColor(50, 60, 80);
      doc.setFontSize(9.5);
      /*
       * Skills are grouped by category rather than emitted as one long run-on
       * line. Categorised lists match how ATS keyword matchers scan for
       * technologies and keep the block inside the page width.
       */
      const SKILL_GROUPS = [
        ["Frontend", "React.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Vite, Zustand, React Router, Framer Motion"],
        ["Backend", "Node.js, Express.js, REST API, JWT Authentication, Google OAuth, Zod, Helmet, Rate Limiting"],
        ["Databases", "MongoDB, Mongoose, MySQL, SQL, Data Modelling"],
        ["Maps and Location", "Leaflet, OpenStreetMap, Nominatim Geocoding, OSRM Routing, Haversine Formula, GPS Tracking"],
        ["Payments", "Razorpay (Card, Netbanking, Wallet, UPI, Cash on Delivery)"],
        ["Tools and Cloud", "Git, GitHub, Postman, Vercel, Render, Serverless Functions, CI/CD"]
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
      // Per-project brand colours for the title so each one stands out like a
      // section header (FoodHub = its orange brand, Wanderlust = its blue brand);
      // the subtitle stays neutral grey.
      const TITLE_COLORS = {
        FoodHub: [234, 88, 12],
        Wanderlust: [37, 99, 235]
      };
      const projectsShown = Math.min(projects.length, 2);
      projects.slice(0, 2).forEach((p, idx) => {
        ensureRoom(200); // whole project block on one page when possible
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11.5);
        const [tr, tg, tb] = TITLE_COLORS[p.title] || [15, 23, 42];
        doc.setTextColor(tr, tg, tb);
        doc.text(p.title, M, y);
        const titleW = doc.getTextWidth(p.title);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(` - ${p.subtitle}`, M + titleW + 4, y);
        y += 13;
        // Tech stack line (teal), comma separated so each item is a discrete
        // keyword rather than one glued-together string.
        doc.setFontSize(9);
        doc.setTextColor(13, 148, 136);
        const tech = doc.splitTextToSize(`Tech: ${p.tech.join(", ")}`, W - M * 2);
        doc.text(tech, M, y);
        y += tech.length * 11 + 2;
        // Description
        doc.setFontSize(9.5);
        doc.setTextColor(50, 60, 80);
        const lines = doc.splitTextToSize(p.description, W - M * 2);
        doc.text(lines, M, y + 10);
        y += lines.length * 12 + 6;
        // Key highlights as bullets. The live map work (tracking, routing and
        // map-based address) is listed first in the project data, so it leads
        // the PDF alongside the payment/OTP and chatbot work. 5 is the cap that
        // still lets both projects stay close to one A4 page; ensureRoom below
        // starts a new page rather than clipping if a block runs long.
        //
        // A real hyphen-minus is used instead of the bullet glyph: some ATS
        // PDF readers drop non-WinAnsi characters, silently losing the line.
        (p.highlights || []).slice(0, 5).forEach((h) => {
          ensureRoom(34);
          const bl = doc.splitTextToSize(`-  ${h}`, W - M * 2 - 12);
          doc.text(bl, M + 12, y + 10);
          y += bl.length * 12 + 3;
        });
        // Live and source links as real clickable PDF annotations, with the
        // URL written out in full so the text is readable even if the parser
        // ignores link annotations.
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
          doc.setFont("helvetica", "normal");
          y += 15;
        });
        y += 8;
        // Thin black divider between project blocks (after FoodHub) so the two
        // entries read cleanly as separate sections.
        if (idx < projectsShown - 1) {
          doc.setDrawColor(17, 24, 39);
          doc.setLineWidth(0.7);
          doc.line(M, y, W - M, y);
          y += 14;
        }
      });

      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      doc.text(
        "kavadrushi01@gmail.com  |  +91 93285 81846  |  Available for full-time work",
        M,
        doc.internal.pageSize.getHeight() - 20
      );

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