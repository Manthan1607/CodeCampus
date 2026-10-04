import { Router, Request, Response } from "express";
import { Notification } from "../models/Notification.js";

const router = Router();

// GET all notifications
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find().sort({ notifId: 1 });
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications", details: (err as Error).message });
  }
});

// POST Mark notification as read
router.post("/:id/read", async (req: Request, res: Response): Promise<void> => {
  try {
    const notifId = parseInt(String(req.params.id), 10);
    const notification = await Notification.findOneAndUpdate({ notifId }, { read: true }, { new: true });
    if (!notification) {
      res.status(404).json({ error: "Notification not found" });
      return;
    }
    res.json({ notification });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification", details: (err as Error).message });
  }
});

export default router;
