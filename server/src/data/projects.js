const PROJECTS = [
  {
    title: "FoodHub",
    subtitle: "Food Delivery & E-Commerce Platform",
    description:
      "Full-stack food delivery + e-commerce platform on the MERN stack — three role-based apps (Customer, Admin Dashboard, Delivery Partner) in one, plus the AI chatbot assistant 'Foodie'. Frontend and API both deployed on Vercel.",
    highlights: [
      "Customer — category browsing, full-text search, veg / non-veg / price filters, sorting, pagination, wishlist, persistent cart and coupons",
      "Checkout with saved delivery addresses and fully working Cash on Delivery; Razorpay gateway order + payment-confirm flow wired end to end",
      "Orders — live status timeline, invoice & payment summary, cancellations with automatic refunds",
      "Admin — revenue, order-count and top-seller analytics with real charts, food / category / coupon CRUD, delivery-partner assignment, review moderation and store settings",
      "Delivery — assigned deliveries, OTP-verified completion, earnings tracking and live status updates",
      "AI chatbot 'Foodie' — regex intent engine with 100+ hand-written intents, quick-suggestion buttons and a browsable FAQ panel (no external API needed)"
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
    note: "Deployed end to end on Vercel — the React frontend and the Express API both run on the free tier, with the API as a serverless function. Cash on Delivery works fully; Razorpay is integrated at the architecture level and activates when gateway keys are configured.",
    tech: ["React 18", "Vite", "Tailwind CSS", "Zustand", "React Router", "Framer Motion", "Node.js", "Express", "MongoDB", "JWT", "Zod", "Razorpay", "AI Chatbot", "Vercel"],
    live: "https://foodhub-seven-gules.vercel.app",
    api: "https://foodhub-pearl-tau.vercel.app",
    github: "https://github.com/kavadrushi01-source/foodhub",
    demoLogins: {
      admin: "admin@foodhub.com / ********",
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
    note: "Built as a college major project. Uses OpenStreetMap + Leaflet for interactive maps and Cloudinary for image storage. Hosted on Back4App Containers - note that Back4App's free plan gives a temporary address that rotates, so if the link 404s it gets redeployed for a fresh one (the old Render link is dead for good).",
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

export default PROJECTS;