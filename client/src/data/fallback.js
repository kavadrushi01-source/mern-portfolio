export const FALLBACK_PORTFOLIO = {
  name: "Kavad Rushi",
  title: "MERN Stack Developer",
  tagline:
    "Building fast, secure, full-stack web apps with MongoDB, Express, React & Node.js.",
  about: [
    "I'm a MERN Stack Developer who builds full-stack web apps that actually go live — payments, authentication, dashboards and deployment included, not just UI screens. I work across the whole stack: React frontends, Node.js + Express APIs, MongoDB and MySQL data modelling, and the deployment work that keeps it running.",
    "I care about the parts most projects skip — clean readable code, real security (hashing, validation, rate limiting, role-based access) and a UI that still feels good on a phone. My work so far includes FoodHub, a three-role food delivery platform with Razorpay payments, OTP-confirmed delivery, live rider tracking on OpenStreetMap maps and an AI chatbot; Wanderlust, an Airbnb-style rental platform with interactive maps; and Studyfy, a multi-tenant School Management System (school ERP) with tenant isolation, RBAC, Razorpay test-mode payments and Groq AI assistance."
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Smt. J.J Kundalia C. College",
      period: "2023 - 2026",
      cgpa: "6.9"
    }
  ],
  skills: [
    "MongoDB",
    "Express.js",
    "React.js",
    "TypeScript",
    "Node.js",
    "REST API",
    "Git & GitHub",
    "JWT Auth",
    "Google OAuth",
    "Mongoose",
    "MySQL",
    "Next.js"
  ],
  socials: {
    github: "https://github.com/kavadrushi01-source",
    whatsapp: "919328581846"
  }
};

export const FALLBACK_PROJECTS = [
  {
    title: "FoodHub",
    subtitle: "Food Delivery & E-Commerce Platform",
    description:
      "Full-stack food delivery platform — three role-based apps (Customer, Admin, Delivery Partner) with live rider tracking, Razorpay payments, and AI chatbot 'Foodie'.",
    highlights: [
      "Live rider tracking with Leaflet, OpenStreetMap, and OSRM routing.",
      "Razorpay checkout and OTP-confirmed delivery handoff.",
      "Foodie chatbot with 100+ intents."
    ],
    security: [
      "JWT access + refresh-token rotation",
      "httpOnly / sameSite cookies",
      "bcrypt password hashing",
      "Helmet + CORS allow-list",
      "Rate limiting (global + auth)",
      "mongo-sanitize (NoSQL-injection guard)",
      "Zod validation on every write",
      "Role-based access control",
      "Winston structured logging"
    ],
    note:
      "Payments run through a Razorpay integration covering card, netbanking, wallet, UPI and cash on delivery, and every delivery is confirmed with an OTP. Delivery tracking and address entry run on Leaflet + OpenStreetMap with Nominatim geocoding and OSRM road routing — no paid map API keys. A built-in AI chatbot called \"Foodie\" helps customers with orders, delivery, payments and the menu at any time.",
    tech: ["React 18", "Vite", "Tailwind CSS", "Zustand", "React Router", "Framer Motion", "Node.js", "Express", "MongoDB", "JWT", "Zod", "Razorpay", "Leaflet", "OpenStreetMap", "Nominatim", "OSRM", "AI Chatbot", "Vercel"],
    live: "https://foodhub-seven-gules.vercel.app",
    api: "https://foodhub-pearl-tau.vercel.app",
    github: "https://github.com/kavadrushi01-source/foodhub",
    demoLogins: {
      admin: "admin@foodhub.com / Admin@123",
      customer: "user@foodhub.com / User@123",
      delivery: "delivery@foodhub.com / Delivery@123"
    },
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)",
    icon: "🍔",
    image: "/projects/foodhub.png"
  },
  {
    title: "Studyfy",
    subtitle: "Multi-tenant School Management System (SaaS)",
    description:
      "Multi-tenant School Management System (school ERP) — one deployment serving many schools. Attendance, fees, exams, timetable, homework, parent communication.",
    highlights: [
      "Prisma tenant isolation and role-based access across eight roles.",
      "Razorpay test payments with signature verification and webhook idempotency.",
      "JWT authentication and append-only audit logs."
    ],
    security: [
      "Tenant-scoped queries with cross-tenant regression tests (20 TENANT_MODELS, test-first)",
      "Student/Parent row-level self-scope — regression-verified before any feature module was built",
      "JWT access + refresh-token rotation, single-use DB-backed tokens",
      "httpOnly / sameSite cookies, bcrypt (cost >= 10)",
      "Helmet + CORS allow-list, rate limiting on auth and public endpoints",
      "Role-based access control via roles/permissions/role_permissions join table",
      "Append-only audit logs; impersonation writes END records, never deletes",
      "Data export excludes passwordHash/token tables; cross-tenant-tested"
    ],
    note:
      "Built from scratch as a portfolio project worth showing to employers — not a toy, not a UI mockup. Tenant isolation is real, RBAC is real, and the Razorpay integration is genuinely complete (signature verification, server-side amount recalculation, webhook idempotency) but runs on test keys only by design. Two fully-seeded demo schools demonstrate tenant isolation: log in as one school's admin and the other school's data is simply not there. Razorpay and Groq both run on free tiers — no live keys, no real money, no paid services anywhere.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Express", "Prisma", "MySQL", "Tailwind CSS", "Socket.io", "Razorpay", "Cloudinary", "Groq AI", "Vitest", "Playwright", "Vercel"],
    live: "https://studyfy-web.vercel.app",
    api: null,
    github: "https://github.com/kavadrushi01-source/Studyfy-Web",
    demoLogins: null,
    gradient: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0891b2 100%)",
    icon: "🎓",
    image: "/projects/studyfy.png"
  }
];
