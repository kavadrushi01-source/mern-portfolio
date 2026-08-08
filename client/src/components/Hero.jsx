import Avatar from "./Avatar.jsx";

export default function Hero({ portfolio }) {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="pulse-dot" /> Available for work
          </p>
          <h1>
            Hi, I'm <span className="gradient-text">{portfolio.name}</span>
          </h1>
          <h2 className="role">{portfolio.title}</h2>
          <p className="hero-tagline">{portfolio.tagline}</p>

          <div className="hero-actions">
            <a href="#explore" className="btn btn-primary">
              Explore
            </a>
            <a href="#resume" className="btn btn-outline">
              Resume
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact
            </a>
          </div>

          <div className="hero-chips">
            {portfolio.skills.slice(0, 6).map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="ring ring-1" aria-hidden="true" />
          <div className="ring ring-2" aria-hidden="true" />
          <div className="avatar-frame">
            <Avatar size={300} />
          </div>
          <div className="hero-badge float-a">
            <strong>MERN</strong>
            <span>Full Stack</span>
          </div>
          <div className="hero-badge badge-2 float-b">
            <strong>1+ yrs</strong>
            <span>Building apps</span>
          </div>
        </div>
      </div>
    </section>
  );
}