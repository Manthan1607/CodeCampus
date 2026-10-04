import { Router, Request, Response } from "express";

const router = Router();

// POST AI Tutor response
router.post("/tutor", (req: Request, res: Response): void => {
  try {
    const { problemTitle, prompt, code } = req.body;
    const query = (prompt || "").toLowerCase();

    let reply = "";
    if (query.includes("hint")) {
      reply = `Hint for ${problemTitle || "this problem"}: Think about storing previous elements in a map or set as you traverse once. What complement value equals target - current element?`;
    } else if (query.includes("optimal") || query.includes("time") || query.includes("complexity")) {
      reply = `The optimal approach uses a single pass with a Hash Map. For each number x, look up (target - x). Time complexity: O(N), Space complexity: O(N).`;
    } else {
      reply = `Great question regarding ${problemTitle || "the code"}! Check your boundary conditions and data structures. Ensure you handle duplicate elements or edge inputs properly.`;
    }

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "AI Tutor query failed", details: (err as Error).message });
  }
});

export default router;
