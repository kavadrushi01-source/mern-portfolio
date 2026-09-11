import { useState } from "react";

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-hero">
          {project.image ? (
            <img src={project.image} alt={project.title} className="modal-screenshot" />
          ) : (
            <>
              <div className="modal-gradient" style={{ background: project.gradient }} />
              <span className="modal-icon">{project.icon}</span>
            </>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <h2>{project.title}</h2>
            <span className="modal-subtitle">{project.subtitle}</span>
          </div>

          <p className="modal-desc">{project.description}</p>

          {project.note && (
            <div className="modal-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              {project.note}
            </div>
          )}

          <div className="modal-section">
            <h4>Key Features</h4>
            <ul className="modal-features">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h4>Security</h4>
            <div className="modal-security">
              {project.security.map((s) => (
                <span key={s} className="security-badge">{s}</span>
              ))}
            </div>
          </div>

          {project.demoLogins && (
            <div className="modal-section">
              <h4>Demo Accounts</h4>
              <div className="modal-logins">
                {Object.entries(project.demoLogins).map(([user, pass]) => (
                  <div key={user} className="login-row">
                    <span className="login-user">{user}</span>
                    <code>{pass}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-section">
            <h4>Tech Stack</h4>
            <div className="modal-tech">
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <a className="btn btn-primary" href={project.live} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Live Demo
            </a>
            <a className="btn btn-outline" href={project.github} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

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
            <article key={p.title} className="project-card">
              <div className="project-image">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="project-screenshot" />
                ) : (
                  <>
                    <div className="project-gradient" style={{ background: p.gradient }} />
                    <span className="project-icon">{p.icon}</span>
                  </>
                )}
                <div className="project-image-overlay">
                  <span className="view-badge">View Project</span>
                </div>
              </div>

              <div className="project-body">
                <div className="project-top">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-subtitle">{p.subtitle}</p>
                </div>

                <p className="project-desc">{p.description}</p>

                <div className="tech-list">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="tech">{t}</span>
                  ))}
                  {p.tech.length > 5 && (
                    <span className="tech tech-more">+{p.tech.length - 5}</span>
                  )}
                </div>

                <div className="project-actions">
                  <a
                    className="btn btn-primary btn-sm"
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Live Demo
                  </a>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setSelectedProject(p)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Info
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
