import { Router } from "express";
import PROJECTS from "../data/projects.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(PROJECTS);
});

export default router;