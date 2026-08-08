export default function Explore({ portfolio }) {
  return (
    <section id="explore" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Explore</span>
          <h2 className="section-title">
            Introduction & <span className="gradient-text">Education</span>
          </h2>
          <p className="section-sub">A quick look at who I am and where I come from.</p>
        </div>

        <div className="explore-grid">
          <div className="card intro-card">
            <h3 className="card-title">Who am I?</h3>
            {portfolio.about.map((p, i) => (
              <p key={i} className="about-text">
                {p}
              </p>
            ))}
            <div className="skill-list">
              {portfolio.skills.map((s) => (
                <span key={s} className="chip chip-solid">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="card edu-card">
            <h3 className="card-title">Education</h3>
            <div className="timeline">
              {portfolio.education.map((e, i) => (
                <div key={i} className="timeline-item">
                  <span className="timeline-dot" />
                  <div className="timeline-body">
                    <span className="timeline-period">{e.period}</span>
                    <h4>{e.degree}</h4>
                    <p>{e.institution}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="edu-note">
              <span>🎯</span>
              Currently learning & building to deepen my full-stack skills while shipping real projects.
            </div>
          </div>
        </div>

        <div className="explore-cta">
          <a href="#projects" className="btn btn-primary">
            View My Projects ↓
          </a>
        </div>
      </div>
    </section>
  );
}