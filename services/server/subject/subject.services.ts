import Subject from "models/server/subject.schema";
import mongoose from "mongoose";
import mongodbConnect from "config/mongodbApiConnext";
import { SubjectModel } from "models/client/subject.model";
import { UserModel } from "models/client/user.model";

export const handleGetSubjectByIdService = async (
  subject_id: string | string[]
) => {
  try {
    const subject_found = await Subject.find({ _id: subject_id });

    return subject_found;
  } catch (error) {
    return error;
  }
};

export const handleGetSubjectsService = async (user: UserModel) => {
  try {
    const subjects = await Subject.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(user._id),
          is_active: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);

    return subjects;
  } catch (error) {
    return error;
  }
};

export const handlePostSubjectService = async (
  user: UserModel,
  subject: SubjectModel
) => {
  try {
    const new_subject = new Subject({ ...subject, user_id: user._id });
    const subject_saved = await new_subject.save();

    return subject_saved;
  } catch (error) {
    return error;
  }
};

export const handleDeleteSubjectService = async (subject: any) => {
  try {
    let subject_id = subject[0]._id;

    const subject_deleted = await Subject.findOneAndUpdate(
      { _id: subject_id },
      { is_active: false },
      { new: true }
    );

    return subject_deleted;
  } catch (error) {
    return error;
  }
};
