import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
