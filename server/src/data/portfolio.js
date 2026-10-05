const FALLBACK = {
  name: "Kavad Rushi",
  title: "MERN Stack Developer",
  tagline: "Building fast, secure, full-stack web apps with MongoDB, Express, React & Node.js.",
  about: [
    "I'm a MERN Stack Developer who builds full-stack web apps that actually go live — payments, authentication, dashboards and deployment included, not just UI screens. I work across the whole stack: React frontends, Node.js + Express APIs, MongoDB and MySQL data modelling, and the deployment work that keeps it running.",
    "I care about the parts most projects skip — clean readable code, real security (hashing, validation, rate limiting, role-based access) and a UI that still feels good on a phone. My work so far includes FoodHub, a three-role food delivery platform with Razorpay payments, OTP-confirmed delivery, live rider tracking on OpenStreetMap maps and an AI chatbot, and Wanderlust, an Airbnb-style rental platform with interactive maps."
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Smt. J.J Kundalia C. College",
      period: "2023 - 2026",
      cgpa: "6.9"
    }
  ],
  skills: ["MongoDB", "Express.js", "React.js", "TypeScript", "Node.js", "REST API", "Git & GitHub", "JWT Auth", "Google OAuth", "Mongoose", "MySQL", "Next.js"],
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