import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reelRoutes from "./routes/reelRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { initBattleSocket } from "./sockets/battleSocket.js";
import { seedDatabase } from "./seed/seed.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Health Check
app.get("/health", (_req: express.Request, res: express.Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), service: "figma-make-backend" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai", aiRoutes);

// HTTP Server & Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initBattleSocket(io);

// Start Server
const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 Figma Make Express Server running on port ${PORT}`);
    console.log(`📡 REST API endpoint: http://localhost:${PORT}/api`);
    console.log(`⚡ Socket.io endpoint: ws://localhost:${PORT}`);
    console.log(`==================================================`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start backend server:", err);
});
