import mongoose from "mongoose";
const { Schema } = mongoose;
import { SubjectModel } from "models/client/subject.model";

const subjectSchema = new Schema<SubjectModel>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Subject ||
  mongoose.model("Subject", subjectSchema, "subjects");
