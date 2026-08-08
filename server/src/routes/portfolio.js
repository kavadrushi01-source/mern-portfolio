import { Router } from "express";
import PORTFOLIO from "../data/portfolio.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(PORTFOLIO);
});

router.get("/health", (_req, res) => {
  res.json({ status: "ok", portfolio: PORTFOLIO.name });
});

export default router;