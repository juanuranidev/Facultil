import Grade from "models/server/grade.schema";
import mongoose from "mongoose";
import { UserModel } from "models/client/user.model";
import { GradeModel } from "models/client/grade.model";

export const handleGetGradesService = async (user: UserModel) => {
  try {
    const grades = await Grade.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(user._id),
          is_active: true,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    return grades;
  } catch (error) {
    return error;
  }
};

export const handlePostGradeService = async (
  user: UserModel,
  grade: GradeModel
) => {
  try {
    const new_grade = new Grade({ ...grade, user_id: user._id });
    const grade_saved = await new_grade.save();

    return grade_saved;
  } catch (error) {
    return error;
  }
};

export const handleDeleteGradeService = async (grade_id: string | string[]) => {
  try {
    const grade_deleted = await Grade.findOneAndUpdate(
      { _id: grade_id },
      { is_active: false },
      { new: true }
    );

    return grade_deleted;
  } catch (error) {
    return error;
  }
};
