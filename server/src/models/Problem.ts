import mongoose, { Schema, Document } from "mongoose";

export interface IProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ITestCase {
  input: string;
  expected: string;
}

export interface IProblem extends Document {
  problemId: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  acceptance: string;
  submissionsCount: number;
  solvedCount: number;
  points: number;
  description: string;
  examples: IProblemExample[];
  constraints: string[];
  testCases: ITestCase[];
  initialCode: {
    cpp: string;
    python: string;
    javascript: string;
  };
}

const ProblemSchema: Schema = new Schema<IProblem>(
  {
    problemId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    tags: [{ type: String }],
    acceptance: { type: String, default: "50%" },
    submissionsCount: { type: Number, default: 0 },
    solvedCount: { type: Number, default: 0 },
    points: { type: Number, default: 10 },
    description: { type: String, required: true },
    examples: [
      {
        input: { type: String },
        output: { type: String },
        explanation: { type: String },
      },
    ],
    constraints: [{ type: String }],
    testCases: [
      {
        input: { type: String },
        expected: { type: String },
      },
    ],
    initialCode: {
      cpp: { type: String, default: "" },
      python: { type: String, default: "" },
      javascript: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const Problem = mongoose.model<IProblem>("Problem", ProblemSchema);
