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
      "Full-stack food ordering & delivery management app built on the MERN stack with a built-in AI chatbot 'Foodie'. 3 role-based apps (Customer, Admin, Delivery) with live order tracking, OTP-verified drop-offs and secure checkouts.",
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
    github: "https://github.com/kavadrushi01-source",
    demoLogins: {
      admin: "admin@foodhub.com / Admin@123",
      customer: "user@foodhub.com / User@123",
      delivery: "delivery@foodhub.com / Delivery@123"
    }
  }
];