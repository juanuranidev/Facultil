import mongoose from "mongoose";
const { Schema } = mongoose;
import { UserModel } from "models/client/user.model";

const userSchema = new Schema<UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    emailVerified: { type: Boolean, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema, "users");
