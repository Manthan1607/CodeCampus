import { Router, Request, Response } from "express";
import { Course } from "../models/Course.js";

const router = Router();

// GET all courses
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find().sort({ enrolled: -1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", details: (err as Error).message });
  }
});

export default router;
