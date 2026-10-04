import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  courseId: number;
  title: string;
  instructor: string;
  progress: number;
  total: number;
  completed: number;
  category: string;
  enrolled: number;
  rating: number;
}

const CourseSchema: Schema = new Schema<ICourse>(
  {
    courseId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    progress: { type: Number, default: 0 },
    total: { type: Number, default: 20 },
    completed: { type: Number, default: 0 },
    category: { type: String, required: true },
    enrolled: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
