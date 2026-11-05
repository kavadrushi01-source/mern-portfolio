const PROJECTS = [
  {
    title: "FoodHub",
    subtitle: "Food Delivery & E-Commerce Platform",
    description:
      "Full-stack food-ordering platform with dedicated Customer, Admin, and Delivery Partner apps, connecting checkout to last-mile delivery.",
    highlights: [
      "Customer: browse food, place orders, and follow delivery; Admin: manage orders, menu, coupons, and sales; Partner: handle assigned deliveries and share live location.",
      "Leaflet, OpenStreetMap, and OSRM provide map-based addresses, live rider location, routes, and arrival estimates.",
      "Razorpay checkout supports online payment and a simulated payment OTP; a separate OTP confirms the delivery handoff.",
      "Foodie answers menu, order, delivery, and payment questions with 100+ intents.",
      "JWT authentication and role-based access protect customer, admin, and delivery workflows."
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
    note: "Try the Customer, Admin, and Delivery Partner demo accounts below. Customer checkout and the delivery handoff each show their own OTP confirmation step.",
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
    title: "Wanderlust",
    subtitle: "Airbnb-Style Rental Listing Platform",
    description:
      "Full-stack rental listing platform where users can list properties for rent and others can browse, search, and book them. Interactive maps, category filtering, reviews, and image uploads — a complete Airbnb clone.",
    highlights: [
      "Browse & search listings with photos, prices, and locations on an interactive map",
      "Filter by 18 categories — Beach, Mountains, Villas, Camping, Castles, Arctic, and more",
      "Add, edit & delete your own property listings with image uploads via Cloudinary",
      "Leave reviews with star ratings on any listing",
      "Price toggle to show total price with 18% GST included",
      "User authentication — signup, login, logout with session management"
    ],
    security: [
      "Session-based authentication",
      "Password hashing with bcrypt",
      "Server-side validation",
      "Protected routes for owner-only actions"
    ],
    note: "Built as a college major project. Uses OpenStreetMap + Leaflet for interactive maps and Cloudinary for image storage. Now hosted permanently on Vercel serverless (api/index.js + vercel.json, auto-redeploys from main) — the old Render service is deleted and the temporary Back4App addresses expired; the first request can take 10–30s while the function cold-starts.",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Leaflet", "Cloudinary", "Vercel"],
    live: "https://wanderlust-major-project-eta.vercel.app",
    github: "https://github.com/kavadrushi01-source/wanderlust-major-project",
    demoLogins: {
      rushi: "666",
      hitesh: "666"
    },
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
    icon: "🏡",
    image: "/projects/wanderlust.png"
  },
  {
    title: "Studyfy",
    subtitle: "Multi-tenant School Management System (SaaS)",
    description:
      "Shared-deployment school management platform that isolates data for each school. Six core roles are School Admin, Teacher, Accountant, Student, Parent, and Transport Manager; Platform Owner and Librarian access are also supported.",
    highlights: [
      "Manage student records, daily attendance and absentee alerts, fee invoices and receipts, exams, gradebooks, timetables, and homework.",
      "Role-specific access lets school staff manage records while students and parents use their relevant school information.",
      "AI generates report-card remarks and attendance-anomaly insights through the AI tools.",
      "Socket.io powers parent-teacher messages and school notices; Razorpay handles test-mode fee payments.",
      "Prisma tenant isolation keeps each school's records separate across a shared deployment."
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
    api: null,
    github: "https://github.com/kavadrushi01-source/Studyfy-Web",
    demoLogins: null,
    gradient: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0891b2 100%)",
    icon: "🎓",
    image: "/projects/studyfy.png"
  }
];

export default PROJECTS;