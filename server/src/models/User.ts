import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "student" | "mentor" | "recruiter" | "admin";
  avatar: string;
  college: string;
  xp: number;
  rank: number;
  streak: number;
  rating: number;
  skills: string[];
  location: string;
  available: boolean;
  submitted: number;
  solved: number;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "mentor", "recruiter", "admin"], default: "student" },
    avatar: { type: String, default: "US" },
    college: { type: String, default: "IIT Bombay" },
    xp: { type: Number, default: 0 },
    rank: { type: Number, default: 100 },
    streak: { type: Number, default: 0 },
    rating: { type: Number, default: 1500 },
    skills: [{ type: String }],
    location: { type: String, default: "India" },
    available: { type: Boolean, default: true },
    submitted: { type: Number, default: 0 },
    solved: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
