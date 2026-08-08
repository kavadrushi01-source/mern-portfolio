export default function Projects({ projects }) {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Projects</span>
          <h2 className="section-title">
            My <span className="gradient-text">Work</span>
          </h2>
          <p className="section-sub">Real projects, real payments, real security.</p>
        </div>

        <div className={`projects-grid ${projects.length === 1 ? "single" : ""}`}>
          {projects.map((p) => (
            <article key={p.title} className="card project-card featured">
              <header className="project-head">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
              </header>

              <p className="project-desc">{p.description}</p>

              {p.highlights && (
                <ul className="project-list">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}

              {p.security && (
                <div className="project-security">
                  <strong>Security:</strong>
                  {p.security.join(" • ")}
                </div>
              )}

              {p.note && <p className="project-note">{p.note}</p>}

              {p.demoLogins && (
                <div className="demo-logins">
                  <strong>Demo Logins</strong>
                  {Object.entries(p.demoLogins).map(([k, v]) => (
                    <code key={k}>
                      {k}: {v}
                    </code>
                  ))}
                </div>
              )}

              <div className="tech-list">
                {p.tech.map((t) => (
                  <span key={t} className="tech">
                    {t}
                  </span>
                ))}
              </div>

              <footer className="project-actions">
                {p.live ? (
                  <a className="btn btn-primary btn-sm" href={p.live} target="_blank" rel="noreferrer">
                    ▶ Live Demo
                  </a>
                ) : (
                  <span className="btn btn-ghost btn-sm" title="Coming soon">
                    ▶ Demo Soon
                  </span>
                )}
                <a className="btn btn-outline btn-sm" href={p.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}