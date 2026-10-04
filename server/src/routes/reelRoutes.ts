import { Router, Request, Response } from "express";
import { Reel } from "../models/Reel.js";

const router = Router();

// GET all tech reels
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const reels = await Reel.find().sort({ likes: -1 });
    res.json({ reels });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reels", details: (err as Error).message });
  }
});

// POST Like a reel
router.post("/:id/like", async (req: Request, res: Response): Promise<void> => {
  try {
    const reelId = parseInt(String(req.params.id), 10);
    const reel = await Reel.findOneAndUpdate({ reelId }, { $inc: { likes: 1 } }, { new: true });
    if (!reel) {
      res.status(404).json({ error: "Reel not found" });
      return;
    }
    res.json({ reel });
  } catch (err) {
    res.status(500).json({ error: "Failed to like reel", details: (err as Error).message });
  }
});

export default router;
