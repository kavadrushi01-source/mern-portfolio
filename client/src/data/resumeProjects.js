export const RESUME_PROJECTS = {
  FoodHub: {
    description:
      "A full-stack food-delivery system with separate customer, admin, and delivery-partner apps, covering the order journey from menu discovery through doorstep handoff.",
    tech: "React 18, JavaScript, Vite, Tailwind CSS, Zustand, Node.js, Express, MongoDB, Razorpay, Leaflet, OpenStreetMap, OSRM",
    highlights: [
      "Customer app: discover restaurants and menus, manage a cart, apply coupons, place orders, and track order status.",
      "Admin app: manage menus, coupons, orders, and sales; delivery partners handle assigned orders, update progress, and share live location.",
      "Leaflet and OpenStreetMap support address selection; OSRM maps delivery routes and estimates arrival from the rider's location.",
      "Razorpay checkout handles online payments. Separate OTP steps confirm simulated payment and delivery handoff.",
      "Foodie chatbot answers menu, order, delivery, and payment questions using 100+ intents.",
      "JWT authentication and role-based permissions separate customer, admin, and delivery workflows.",
      "Demo Admin: admin@foodhub.com / Admin@123; Customer: user@foodhub.com / User@123; Delivery Partner: delivery@foodhub.com / Delivery@123."
    ]
  },
  Studyfy: {
    description:
      "A multi-tenant school management platform on a shared deployment with isolated school data. The six core roles are Admin, Teacher, Accountant, Student, Parent, and Transport Manager; Platform Owner and Librarian access are also supported.",
    tech: "Next.js, React, TypeScript, Express, Prisma, MySQL, Socket.io, Razorpay, Groq AI",
    highlights: [
      "School workflows cover student records, daily attendance and absentee alerts, fee invoices and receipts, exams, gradebooks, timetables, and homework.",
      "Role-based permissions tailor staff management tools and student/parent views; student and parent access is scoped to their own records.",
      "AI tools generate report-card remarks and surface attendance-anomaly insights for school staff.",
      "Socket.io delivers parent-teacher messages and school notices; Razorpay is used in a simulated (fake) fee-payment system.",
      "Prisma tenant scoping isolates each school's records; audit logs track important administrative actions."
    ]
  }
};

export const RESUME_PROJECT_ORDER = ["FoodHub", "Studyfy"];
export const PORTFOLIO_URL = "https://mern-portfolio-client-three.vercel.app";
