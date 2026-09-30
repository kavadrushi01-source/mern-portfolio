const FALLBACK = {
  name: "Kavad Rushi",
  title: "MERN Stack Developer",
  tagline: "Building fast, secure, full-stack web apps with MongoDB, Express, React & Node.js.",
  about: [
    "Hi, I'm Kavad Rushi — a passionate MERN stack developer who loves turning ideas into real, working products. From pixel-perfect React frontends to robust Express + MongoDB backends, I build complete applications end to end.",
    "I focus on clean code, real security (JWT, bcrypt, validation) and developer-friendly architecture. I also enjoy integrating live features like payment gateways, chatbots and Google OAuth into the apps I ship."
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Smt. J.J Kundalia C. College",
      period: "2023 - 2025"
    }
  ],
  skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API", "Git & GitHub", "JWT Auth", "Google OAuth", "Mongoose"],
  socials: {
    github: "https://github.com/kavadrushi01-source",
    linkedin: "https://linkedin.com/in/kavad-rushi-b24484411",
    whatsapp: "919328581846"
  }
};

// The values above are defaults. Anything that differs per deployment can be
// overridden with environment variables (see server/.env.example) - dotenv is
// loaded in src/index.js before this module is evaluated.
const PORTFOLIO = {
  ...FALLBACK,
  name: process.env.PORTFOLIO_OWNER_NAME || FALLBACK.name,
  title: process.env.PORTFOLIO_TITLE || FALLBACK.title,
  socials: {
    github: process.env.GITHUB_URL || FALLBACK.socials.github,
    linkedin: process.env.LINKEDIN_URL || FALLBACK.socials.linkedin,
    whatsapp: process.env.WHATSAPP_NUMBER || FALLBACK.socials.whatsapp
  }
};

export default PORTFOLIO;