import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Explore", href: "#explore" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="navbar">
      <a href="#home" className="brand" onClick={() => setOpen(false)}>
        KR<span>.</span>
      </a>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((l, i) => (
          <a key={l.href} href={l.href} style={{ animationDelay: `${i * 60}ms` }} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#resume" className="nav-cta btn btn-primary" onClick={() => setOpen(false)}>
          Hire Me
        </a>
      </nav>
    </header>
  );
}