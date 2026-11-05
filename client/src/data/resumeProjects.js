export const RESUME_PROJECTS = {
  FoodHub: {
    description:
      "A food-ordering platform with separate Customer, Admin, and Delivery Partner apps.",
    tech: "React 18, JavaScript, Vite, Tailwind CSS, Zustand, Node.js, Express, MongoDB, Razorpay, Leaflet, OpenStreetMap, OSRM",
    highlights: [
      "Customer: browse food, place orders, and follow delivery; Admin: manage orders, menu, coupons, and sales; Partner: handle assigned deliveries and share live location.",
      "Leaflet, OpenStreetMap, and OSRM provide map-based addresses, live rider location, routes, and arrival estimates.",
      "Razorpay checkout supports online payment and a simulated payment OTP; a separate OTP confirms the delivery handoff.",
      "Foodie answers menu, order, delivery, and payment questions with 100+ intents.",
      "Demo Admin: admin@foodhub.com / Admin@123; Customer: user@foodhub.com / User@123; Delivery Partner: delivery@foodhub.com / Delivery@123."
    ]
  },
  Studyfy: {
    description:
      "A multi-tenant school management platform for six core school roles: Admin, Teacher, Accountant, Student, Parent, and Transport Manager. Platform Owner and Librarian access are also supported.",
    tech: "Next.js, React, TypeScript, Express, Prisma, MySQL, Socket.io, Razorpay, Groq AI",
    highlights: [
      "Manage student records, daily attendance and absentee alerts, fee invoices and receipts, exams, gradebooks, timetables, and homework.",
      "AI generates report-card remarks and attendance-anomaly insights through the AI tools.",
      "Socket.io powers parent-teacher messages and school notices; Razorpay handles test-mode fee payments.",
      "Prisma tenant isolation keeps each school's records separate across a shared deployment."
    ]
  }
};

export const RESUME_PROJECT_ORDER = ["FoodHub", "Studyfy"];
export const PORTFOLIO_URL = "https://mern-portfolio-client-three.vercel.app";
