import mongoose from "mongoose";
const { Schema } = mongoose;
import { GradeModel } from "models/client/grade.model";

const gradeSchema = new Schema<GradeModel>(
  {
    grade: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
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

export default mongoose.models.Grade ||
  mongoose.model("Grade", gradeSchema, "grades");
