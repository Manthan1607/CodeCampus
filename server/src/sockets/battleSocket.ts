import { Server, Socket } from "socket.io";

interface QueueUser {
  socketId: string;
  userId: string;
  name: string;
  avatar: string;
  rating: number;
}

interface ActiveBattle {
  battleId: string;
  player1: QueueUser;
  player2: QueueUser;
  problem: {
    id: number;
    title: string;
    difficulty: string;
    desc: string;
  };
  startTime: number;
  winnerSocketId?: string;
}

const queue: QueueUser[] = [];
const activeBattles = new Map<string, ActiveBattle>();

export const initBattleSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // Join Matchmaking Queue
    socket.on("join_queue", (user: { userId: string; name: string; avatar: string; rating: number }) => {
      const queueUser: QueueUser = {
        socketId: socket.id,
        userId: user.userId || socket.id,
        name: user.name || "Anonymous Coder",
        avatar: user.avatar || "AC",
        rating: user.rating || 1500,
      };

      // Remove existing entries for this socket if any
      const existingIdx = queue.findIndex((q) => q.socketId === socket.id);
      if (existingIdx !== -1) queue.splice(existingIdx, 1);

      if (queue.length > 0) {
        // Match found!
        const opponent = queue.shift()!;
        const battleId = `battle_${Date.now()}`;

        const battleData: ActiveBattle = {
          battleId,
          player1: opponent,
          player2: queueUser,
          problem: {
            id: 99,
            title: "Valid Parentheses",
            difficulty: "Easy",
            desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
          },
          startTime: Date.now(),
        };

        activeBattles.set(battleId, battleData);

        const socket1 = io.sockets.sockets.get(opponent.socketId);
        const socket2 = io.sockets.sockets.get(queueUser.socketId);

        if (socket1) socket1.join(battleId);
        if (socket2) socket2.join(battleId);

        io.to(battleId).emit("match_found", {
          battleId,
          problem: battleData.problem,
          duration: 300,
          player1: { name: opponent.name, avatar: opponent.avatar, rating: opponent.rating },
          player2: { name: queueUser.name, avatar: queueUser.avatar, rating: queueUser.rating },
        });

        console.log(`[Socket.io] Battle ${battleId} started between ${opponent.name} and ${queueUser.name}`);
      } else {
        queue.push(queueUser);
        socket.emit("queue_status", { status: "waiting", message: "Searching for opponent..." });
      }
    });

    // Leave Queue
    socket.on("leave_queue", () => {
      const idx = queue.findIndex((q) => q.socketId === socket.id);
      if (idx !== -1) {
        queue.splice(idx, 1);
        socket.emit("queue_status", { status: "idle", message: "Left queue" });
      }
    });

    // Live Code & Progress Update
    socket.on("code_sync", (data: { battleId: string; code: string; progress: number }) => {
      const { battleId, code, progress } = data;
      socket.to(battleId).emit("opponent_code_sync", { code, progress });
    });

    // Submit Solution in Battle
    socket.on("submit_battle_solution", (data: { battleId: string; code: string }) => {
      const { battleId } = data;
      const battle = activeBattles.get(battleId);
      if (!battle || battle.winnerSocketId) return;

      battle.winnerSocketId = socket.id;

      io.to(battleId).emit("battle_result", {
        winnerSocketId: socket.id,
        message: socket.id === battle.player1.socketId ? `${battle.player1.name} won!` : `${battle.player2.name} won!`,
        ratingChange: 42,
        xpGained: 150,
      });

      activeBattles.delete(battleId);
    });

    // Disconnect handling
    socket.on("disconnect", () => {
      // Remove from queue
      const qIdx = queue.findIndex((q) => q.socketId === socket.id);
      if (qIdx !== -1) queue.splice(qIdx, 1);

      // Handle forfeit in active battles
      for (const [bId, battle] of activeBattles.entries()) {
        if (battle.player1.socketId === socket.id || battle.player2.socketId === socket.id) {
          io.to(bId).emit("opponent_disconnected", { message: "Opponent disconnected. You win!" });
          activeBattles.delete(bId);
        }
      }

      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });
};
