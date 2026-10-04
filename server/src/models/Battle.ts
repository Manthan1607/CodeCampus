import mongoose, { Schema, Document } from "mongoose";

export interface IBattle extends Document {
  battleId: string;
  player1: { userId: string; name: string; avatar: string; rating: number; code: string; progress: number };
  player2: { userId: string; name: string; avatar: string; rating: number; code: string; progress: number };
  problemId: number;
  winnerId?: string;
  status: "waiting" | "active" | "completed";
  durationSeconds: number;
  createdAt: Date;
}

const BattleSchema: Schema = new Schema<IBattle>(
  {
    battleId: { type: String, required: true, unique: true },
    player1: {
      userId: String,
      name: String,
      avatar: String,
      rating: Number,
      code: String,
      progress: { type: Number, default: 0 },
    },
    player2: {
      userId: String,
      name: String,
      avatar: String,
      rating: Number,
      code: String,
      progress: { type: Number, default: 0 },
    },
    problemId: { type: Number, required: true },
    winnerId: { type: String },
    status: { type: String, enum: ["waiting", "active", "completed"], default: "waiting" },
    durationSeconds: { type: Number, default: 300 },
  },
  { timestamps: true }
);

export const Battle = mongoose.model<IBattle>("Battle", BattleSchema);
