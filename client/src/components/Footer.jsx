export default function Footer({ portfolio }) {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} {portfolio.name} — Built with the MERN stack, haste &amp;
          lots of chai ☕
        </p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#explore">Explore</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}