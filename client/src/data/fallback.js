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
      "Full-stack food-delivery system with separate customer, admin, and delivery-partner apps, covering the order journey from menu discovery through doorstep handoff.",
    highlights: [
      "Customer app: discover restaurants and menus, manage a cart, apply coupons, place orders, and track order status.",
      "Admin app: manage menus, coupons, orders, and sales; delivery partners handle assigned orders, update progress, and share live location.",
      "Leaflet and OpenStreetMap support address selection; OSRM maps delivery routes and estimates arrival from the rider's location.",
      "Razorpay checkout handles online payments. Separate OTP steps confirm simulated payment and delivery handoff.",
      "Foodie chatbot answers menu, order, delivery, and payment questions using 100+ intents.",
      "JWT authentication and role-based permissions separate customer, admin, and delivery workflows."
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
    note: "Try the Customer, Admin, and Delivery Partner demo accounts below. Customer checkout and delivery handoff each have their own OTP confirmation step.",
    tech: ["React 18", "Vite", "Tailwind CSS", "Zustand", "React Router", "Framer Motion", "Node.js", "Express", "MongoDB", "JWT", "Zod", "Razorpay", "Leaflet", "OpenStreetMap", "Nominatim", "OSRM", "AI Chatbot", "Vercel"],
    live: "https://foodhub-seven-gules.vercel.app",
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
      "Multi-tenant school management platform on a shared deployment with isolated school data. The six core roles are School Admin, Teacher, Accountant, Student, Parent, and Transport Manager; Platform Owner and Librarian access are also supported.",
    highlights: [
      "School workflows cover student records, daily attendance and absentee alerts, fee invoices and receipts, exams, gradebooks, timetables, and homework.",
      "Role-based permissions tailor staff management tools and student/parent views; student and parent access is scoped to their own records.",
      "AI tools generate report-card remarks and surface attendance-anomaly insights for school staff.",
      "Socket.io delivers parent-teacher messages and school notices; Razorpay is used in a simulated (fake) fee-payment system.",
      "Prisma tenant scoping isolates each school's records; audit logs track important administrative actions."
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
      "Explore the seeded School of Science and Ramakrishna School accounts to see tenant isolation. Razorpay runs in test mode.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Express", "Prisma", "MySQL", "Tailwind CSS", "Socket.io", "Razorpay", "Cloudinary", "Groq AI", "Vitest", "Playwright", "Vercel"],
    live: "https://studyfy-web.vercel.app",
    github: "https://github.com/kavadrushi01-source/Studyfy-Web",
    demoLogins: null,
    gradient: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0891b2 100%)",
    icon: "🎓",
    image: "/projects/studyfy.png"
  }
];
