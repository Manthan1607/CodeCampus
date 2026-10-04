import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/figma_make_app";
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully to ${connStr}`);
  } catch (error) {
    console.warn(`[MongoDB] Connection notice: Unable to connect to MongoDB directly (${(error as Error).message}). App will fallback to in-memory cache mode if needed.`);
  }
};
