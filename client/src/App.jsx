import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Explore from "./components/Explore.jsx";
import Projects from "./components/Projects.jsx";
import Resume from "./components/Resume.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { fetchPortfolio, fetchProjects } from "./api.js";
import { FALLBACK_PORTFOLIO } from "./data/fallback.js";

export default function App() {
  const [portfolio, setPortfolio] = useState(FALLBACK_PORTFOLIO);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [p, pr] = await Promise.all([fetchPortfolio(), fetchProjects()]);
      if (!alive) return;
      setPortfolio(p);
      setProjects(pr);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero portfolio={portfolio} />
        <Explore portfolio={portfolio} />
        <Projects projects={projects} />
        <Resume portfolio={portfolio} projects={projects} />
        <Contact portfolio={portfolio} />
      </main>
      <Footer portfolio={portfolio} />
    </>
  );
}