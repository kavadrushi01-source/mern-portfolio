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
    github: "https://github.com/kavadrushi01-source/foodhub",
    demoLogins: {
      admin: "admin@foodhub.com / Admin@123",
      customer: "user@foodhub.com / User@123",
      delivery: "delivery@foodhub.com / Delivery@123"
    }
  },
  {
    title: "Wanderlust",
    subtitle: "Airbnb-Style Rental Listing Platform",
    description:
      "Full-stack rental listing platform where users can list their properties for rent and others can browse, search, and book them. Features an interactive map, category filtering, reviews system, and image uploads — like a complete Airbnb clone.",
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
    note: "Built as a college major project. Uses OpenStreetMap + Leaflet for interactive maps and Cloudinary for image storage.",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Leaflet", "Cloudinary"],
    live: "https://wanderlust-major-project-e5gi.onrender.com",
    github: "https://github.com/kavadrushi01-source/wanderlust-major-project",
    demoLogins: {
      rushi: "666",
      hitesh: "666"
    }
  }
];

export default PROJECTS;