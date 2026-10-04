import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  userId: string;
  problemId: number;
  language: "cpp" | "python" | "javascript";
  code: string;
  verdict: "accepted" | "wrong" | "tle" | "error";
  runtime: string;
  memory: string;
  passedTests: number;
  totalTests: number;
  output: string;
  createdAt: Date;
}

const SubmissionSchema: Schema = new Schema<ISubmission>(
  {
    userId: { type: String, required: true },
    problemId: { type: Number, required: true },
    language: { type: String, enum: ["cpp", "python", "javascript"], required: true },
    code: { type: String, required: true },
    verdict: { type: String, enum: ["accepted", "wrong", "tle", "error"], required: true },
    runtime: { type: String, default: "12ms" },
    memory: { type: String, default: "8.4MB" },
    passedTests: { type: Number, default: 0 },
    totalTests: { type: Number, default: 0 },
    output: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Submission = mongoose.model<ISubmission>("Submission", SubmissionSchema);
