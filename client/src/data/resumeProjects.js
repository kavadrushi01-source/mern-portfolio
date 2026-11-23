export const RESUME_PROJECTS = {
  FoodHub: {
    live: "https://foodhub-seven-gules.vercel.app",
    github: "https://github.com/kavadrushi01-source/foodhub",
    description:
      "Built and deployed a food-delivery platform across three role-specific apps, supporting the order lifecycle from menu discovery through doorstep handoff.",
    tech: "React 18, JavaScript, Vite, Tailwind CSS, Zustand, Node.js, Express, MongoDB, Razorpay, Leaflet, OpenStreetMap, OSRM",
    highlights: [
      "Integrated Razorpay checkout, order tracking, OTP-confirmed payment and delivery handoffs, and mapped rider routes.",
      "Built a chatbot covering menu, order, delivery, and payment questions with 100+ intents.",
      "Implemented JWT authentication and role-based permissions for customer, admin, and delivery workflows."
    ]
  },
  Studyfy: {
    live: "https://studyfy-web.vercel.app",
    github: "https://github.com/kavadrushi01-source/Studyfy-Web",
    description:
      "Built a multi-tenant school management platform with tenant isolation across 20 data models, serving six core roles plus Platform Owner and Librarian access.",
    tech: "Next.js, React, TypeScript, Express, Prisma, MySQL, Socket.io, Razorpay, Groq AI",
    highlights: [
      "Implemented Prisma tenant scoping across 20 models with cross-tenant regression tests and administrative audit logs.",
      "Delivered student, attendance, fees, exams, timetables, and homework workflows for six core roles.",
      "Added AI-assisted report-card remarks and attendance-anomaly insights, plus Socket.io messaging."
    ]
  }
};

export const RESUME_PROJECT_ORDER = ["FoodHub", "Studyfy"];
export const PORTFOLIO_URL = "https://mern-portfolio-client-three.vercel.app";
export const RESUME_SUMMARY =
  "Full-stack developer delivering production-ready React and Node.js applications, from secure APIs and database architecture to payments, mapping, and AI-assisted workflows.";
