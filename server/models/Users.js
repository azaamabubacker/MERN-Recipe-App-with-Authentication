import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);
