import mongoose, { Schema, Document } from "mongoose";

export interface IReel extends Document {
  reelId: number;
  title: string;
  creator: string;
  avatar: string;
  topic: string;
  views: number;
  likes: number;
  duration: string;
  thumbnail: string;
}

const ReelSchema: Schema = new Schema<IReel>(
  {
    reelId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    creator: { type: String, required: true },
    avatar: { type: String, default: "VS" },
    topic: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    duration: { type: String, default: "1:00" },
    thumbnail: { type: String, default: "bg-blue-900" },
  },
  { timestamps: true }
);

export const Reel = mongoose.model<IReel>("Reel", ReelSchema);
