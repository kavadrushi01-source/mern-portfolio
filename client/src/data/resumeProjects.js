export const RESUME_PROJECTS = {
  FoodHub: {
    live: "https://foodhub-seven-gules.vercel.app",
    github: "https://github.com/kavadrushi01-source/foodhub",
    description:
      "Built and deployed a full-stack food-delivery and e-commerce platform across customer, admin, and delivery-partner apps, covering discovery, checkout, payment, tracking, and delivery handoff.",
    tech: "React 18, JavaScript, Vite, Tailwind CSS, Zustand, Node.js, Express, MongoDB, Razorpay, Leaflet, OpenStreetMap, OSRM",
    highlights: [
      "Customer: search the menu, manage cart/wishlist and coupons, save addresses, place/cancel orders, and follow live status.",
      "Admin: manage menu, categories, coupons, users, reviews, store settings, assignments, refunds, and sales analytics.",
      "Partner: receive deliveries, share live GPS location, follow routes, track earnings, and verify handoff with OTP.",
      "Leaflet, OpenStreetMap, Nominatim, and OSRM support address search, live tracking, road routes, distance, and ETA.",
      "Razorpay simulated checkout and OTP are separate from delivery OTP. JWT, refresh tokens, secure cookies, and RBAC protect roles.",
      "Foodie chatbot answers 100+ menu, order, payment, and delivery intents. Demo: admin@foodhub.com / Admin@123, user@foodhub.com / User@123, delivery@foodhub.com / Delivery@123."
    ]
  },
  Studyfy: {
    live: "https://studyfy-web.vercel.app",
    github: "https://github.com/kavadrushi01-source/Studyfy-Web",
    description:
      "Built a multi-tenant school ERP on a shared deployment, isolating each school's users and records while supporting eight roles and role-specific dashboards.",
    tech: "Next.js, React, TypeScript, Express, Prisma, MySQL, Socket.io, Razorpay, Groq AI",
    highlights: [
      "Prisma tenant scoping covers 20 models with cross-tenant tests, row-level student/parent access, RBAC, audit logs, and refresh-token security.",
      "School admin modules cover admissions and CSV import, guardians, staff, classes, sections, ID cards, analytics, certificates, and enquiry CRM.",
      "Attendance, absentee emails, exams and grades, timetable generation, homework, notices, and parent-teacher chat are handled by Socket.io.",
      "Fees, receipts and refunds, library loans/fines, transport routes, HR/payroll, salary slips, inventory, and PWA offline screens serve role dashboards.",
      "Groq AI generates draft report-card remarks and attendance anomaly summaries for teacher review; Razorpay test-mode flow has no live-money charges."
    ]
  }
};

export const RESUME_PROJECT_ORDER = ["FoodHub", "Studyfy"];
export const PORTFOLIO_URL = "https://mern-portfolio-client-three.vercel.app";
export const RESUME_SUMMARY =
  "Full-stack developer delivering production-ready React and Node.js applications, from secure APIs and database architecture to payments, mapping, and AI-assisted workflows.";
