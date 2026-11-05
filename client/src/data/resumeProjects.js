export const RESUME_PROJECTS = {
  FoodHub: {
    description:
      "Food delivery with Customer, Admin, and Delivery Partner apps.",
    tech: "React 18, JavaScript, Vite, Tailwind CSS, Zustand, Node.js, Express, MongoDB, Razorpay, Leaflet, OpenStreetMap, OSRM",
    highlights: [
      "Leaflet and OpenStreetMap show live rider routes and map-based addresses.",
      "Foodie chatbot answers menu, order, delivery, and payment questions with 100+ intents.",
      "Razorpay checkout OTP; a separate OTP confirms delivery handoff.",
      "Demo Admin: admin@foodhub.com / Admin@123; Customer: user@foodhub.com / User@123; Delivery: delivery@foodhub.com / Delivery@123."
    ]
  },
  Studyfy: {
    description:
      "Multi-tenant school platform for six core roles: Admin, Teacher, Accountant, Student, Parent, and Transport Manager; also supports Platform Owner and Librarian.",
    tech: "Next.js, React, TypeScript, Express, Prisma, MySQL, Socket.io, Razorpay, Groq AI",
    highlights: [
      "Attendance, fee invoices, exams, gradebook, timetable, and homework.",
      "Groq AI generates report-card remarks and flags attendance anomalies.",
      "Socket.io parent-teacher messaging; Razorpay test-mode fee payments.",
      "Prisma tenant isolation keeps each school's records separate."
    ]
  }
};

export const RESUME_PROJECT_ORDER = ["FoodHub", "Studyfy"];
export const PORTFOLIO_URL = "https://mern-portfolio-client-three.vercel.app";
