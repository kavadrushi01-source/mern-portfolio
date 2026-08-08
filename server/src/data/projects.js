const PROJECTS = [
  {
    title: "FoodHub",
    subtitle: "Food Delivery & E-Commerce Platform",
    description:
      "Full-stack food ordering & delivery management app built on the MERN stack with a built-in AI chatbot 'Foodie'. 3 role-based apps (Customer, Admin, Delivery) with live order tracking, OTP-verified drop-offs, earnings, and analytics dashboard.",
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
    note: "Online payments are real — UPI & Card payments process live transactions through a real payment gateway.",
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

export default PROJECTS;