import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { mockUsers } from "../data/mockStore.js";

const router = Router();
const isDbConnected = () => mongoose.connection.readyState === 1;

// Leaderboard
router.get("/leaderboard", async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isDbConnected()) {
      const leaderboard = await User.find({ role: "student" })
        .sort({ xp: -1 })
        .limit(20)
        .select("name college xp rating streak solved avatar");
      
      if (leaderboard.length > 0) {
        const formatted = leaderboard.map((user: any, index: number) => ({
          rank: index + 1,
          id: user._id,
          name: user.name,
          college: user.college,
          xp: user.xp,
          rating: user.rating,
          streak: user.streak,
          solved: user.solved,
          avatar: user.avatar,
        }));

        res.json({ leaderboard: formatted });
        return;
      }
    }
  } catch (err) {
    // fallback
  }

  const formattedMock = mockUsers.map((u, i) => ({
    rank: i + 1,
    id: u.id,
    name: u.name,
    college: u.college,
    xp: u.xp,
    rating: u.rating,
    streak: u.streak,
    solved: u.solved,
    avatar: u.avatar,
  }));
  res.json({ leaderboard: formattedMock });
});

// Colleges summary
router.get("/colleges", async (_req: Request, res: Response): Promise<void> => {
  try {
    const colleges = [
      { rank: 1, name: "IIT Bombay", students: 487, avgRating: 1842, topSolver: "Aryan Gupta", solved: 91240 },
      { rank: 2, name: "IIT Delhi", students: 412, avgRating: 1798, topSolver: "Nisha Kaur", solved: 84320 },
      { rank: 3, name: "IIT Madras", students: 398, avgRating: 1734, topSolver: "Deepa Menon", solved: 79870 },
      { rank: 4, name: "NIT Trichy", students: 524, avgRating: 1612, topSolver: "Sanjay Kumar", solved: 72440 },
      { rank: 5, name: "BITS Pilani", students: 445, avgRating: 1589, topSolver: "Ananya Patel", solved: 68920 },
    ];
    res.json({ colleges });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch colleges", details: (err as Error).message });
  }
});

// Students search for recruiters
router.get("/students", async (req: Request, res: Response): Promise<void> => {
  try {
    const query = (req.query.q as string) || "";
    const filter: Record<string, any> = { role: "student" };
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { college: { $regex: query, $options: "i" } },
        { skills: { $regex: query, $options: "i" } },
      ];
    }
    const students = await User.find(filter).sort({ xp: -1 }).limit(50);
    res.json({ students });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students", details: (err as Error).message });
  }
});

// Single User profile
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", details: (err as Error).message });
  }
});

export default router;
