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
      period: "2023 - 2025"
    }
  ],
  skills: [
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "REST API",
    "Git & GitHub",
    "JWT Auth",
    "Google OAuth",
    "Mongoose"
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
      "Full-stack food ordering & delivery management app with an AI chatbot 'Foodie'. 3 role-based apps — Customer, Admin, and Delivery — with live order tracking, OTP-verified drop-offs and secure checkouts.",
    highlights: [
      "Customer — search/filter menu, cart, coupons, checkout (COD / UPI / Card), live order tracking",
      "Admin — analytics dashboard, food/category/coupon management, orders, refunds, user & role management",
      "Delivery — assigned orders, OTP-verified drop-offs & earnings"
    ],
    security: [
      "JWT authentication",
      "bcrypt password hashing",
      "Zod validation",
      "Email verification",
      "Google OAuth"
    ],
    note:
      "Online payments are real — UPI & Card payments process live transactions through a real payment gateway.",
    tech: ["MongoDB", "Express", "React", "Node.js", "REST API", "AI Chatbot"],
    live: "https://foodhub-seven-gules.vercel.app",
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
    note:
      "Built as a college major project. Uses OpenStreetMap + Leaflet for interactive maps and Cloudinary for image storage.",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Leaflet", "Cloudinary"],
    live: "https://wanderlust-major-project-e5gi.onrender.com",
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