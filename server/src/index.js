import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { connectDB } from "./db.js";
import portfolioRoutes from "./routes/portfolio.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "50kb" }));

// Serve the built React app in production (optional)
const clientDist = path.join(__dirname, "..", "..", "client", "dist");
const hasClient = fs.existsSync(clientDist);
if (hasClient) {
  app.use(express.static(clientDist));
}

app.get("/", (req, res, next) => {
  if (hasClient) return next(); // serve the built index.html
  res.json({ app: "Kavad Rushi Portfolio API", endpoints: ["/api/portfolio", "/api/projects", "/api/contact"] });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  if (hasClient) return res.sendFile(path.join(clientDist, "index.html"));
  next();
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.originalUrl}` });
});

(async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`[server] Portfolio API running at http://localhost:${PORT}`);
  });
})();