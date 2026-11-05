const PROJECTS = [
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
    note: "Try the Customer, Admin, and Delivery Partner demo accounts below. Customer checkout and the delivery handoff each show their own OTP confirmation step.",
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

export default PROJECTS;