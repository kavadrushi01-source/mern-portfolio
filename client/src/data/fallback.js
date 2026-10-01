export const FALLBACK_PORTFOLIO = {
  name: "Kavad Rushi",
  title: "MERN Stack Developer",
  tagline:
    "Building fast, secure, full-stack web apps with MongoDB, Express, React & Node.js.",
  about: [
    "Hi, I'm Kavad Rushi — a passionate MERN stack developer who loves turning ideas into real, working products. From pixel-perfect React frontends to complete Node.js + Express + MongoDB backends, I build full applications end to end.",
    "I focus on clean code, real security (JWT, bcrypt, validation) and developer-friendly architecture. I also enjoy integrating live features like payment gateways, chatbots and Google OAuth into the apps I ship."
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
    linkedin: "https://linkedin.com/in/kavad-rushi-b24484411",
    whatsapp: "919328581846"
  }
};

export const FALLBACK_PROJECTS = [
  {
    title: "FoodHub",
    subtitle: "Food Delivery & E-Commerce Platform",
    description:
      "Full-stack food delivery + e-commerce platform on the MERN stack — three role-based apps (Customer, Admin Dashboard, Delivery Partner) in one, plus the AI chatbot assistant 'Foodie'. Frontend and API both deployed on Vercel.",
    highlights: [
      "Payments — Razorpay integration supporting Card, Netbanking, Wallet, UPI and Cash on Delivery, with a checkout that reproduces the live gateway flow: pay with test card 5267 3181 8797 5449 (any expiry, any CVV) and the app raises a simulated OTP step — skip it or type any 6-digit number to confirm the payment. Netbanking and Wallet open a success / failure screen so both outcomes can be demonstrated, and UPI accepts success@razorpay or failure@razorpay",
      "Delivery partner — a dedicated partner app with assigned drop-offs, live status updates and earnings tracking, where the admin issues an OTP for every order and the hand-off only completes once the partner confirms that OTP",
      "AI chatbot \"Foodie\" — regex intent engine with 100+ hand-written intents (orders, delivery, payments, coupons, menu, even math), quick-suggestion buttons and a browsable FAQ panel, with no external API needed",
      "Admin dashboard — revenue, order-count and top-seller analytics with real charts, food / category / coupon CRUD, delivery-partner assignment, refunds, review moderation and store settings",
      "Order pipeline — pending → confirmed → preparing → out for delivery → delivered, tracked per item, with cancellations and automatic refunds",
      "Platform — premium mobile-first UI with dark / light mode, animations and skeleton loaders, deployed on Vercel's free tier with the API running as a serverless function"
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
      "Checkout runs on a Razorpay integration with a simulated OTP step, so card, netbanking, wallet, UPI and cash-on-delivery flows can be demonstrated end to end. The site also ships the \"Foodie\" AI chatbot, which answers 100+ questions about orders, delivery, payments and the menu.",
    tech: ["React 18", "Vite", "Tailwind CSS", "Zustand", "React Router", "Framer Motion", "Node.js", "Express", "MongoDB", "JWT", "Zod", "Razorpay", "AI Chatbot", "Vercel"],
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
    note:
      "Built as a college major project. Uses OpenStreetMap + Leaflet for interactive maps and Cloudinary for image storage. Hosted on Back4App Containers - note that Back4App's free plan gives a temporary address that rotates, so if the link 404s it gets redeployed for a fresh one (the old Render link is dead for good).",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Leaflet", "Cloudinary"],
    live: "https://wanderlustmajorproject-kqhzf1gw.b4a.run",
    github: "https://github.com/kavadrushi01-source/wanderlust-major-project",
    demoLogins: {
      rushi: "666",
      hitesh: "666"
    },
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
    icon: "🏡",
    image: "/projects/wanderlust.png"
  }
];