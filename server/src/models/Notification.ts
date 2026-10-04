import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  notifId: number;
  userId?: string;
  type: "battle" | "submission" | "mentor" | "badge" | "course" | "system";
  message: string;
  time: string;
  read: boolean;
}

const NotificationSchema: Schema = new Schema<INotification>(
  {
    notifId: { type: Number, required: true },
    userId: { type: String },
    type: { type: String, enum: ["battle", "submission", "mentor", "badge", "course", "system"], required: true },
    message: { type: String, required: true },
    time: { type: String, default: "Just now" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
