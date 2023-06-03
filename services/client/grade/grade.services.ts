import Subject from "models/server/subject.schema";
import mongoose from "mongoose";
import mongodbConnect from "config/mongodbApiConnext";
import { SubjectModel } from "models/client/subject.model";
import { request } from "util/request";
import { GradeModel } from "models/client/grade.model";

export const handleGetGradesService = async (user_id: string) => {
  try {
    return await request({
      method: "GET",
      url: "/api/grade/",
      params: {
        user_id: user_id,
      },
    });
  } catch (error) {
    return error;
  }
};

export const handlePostGradeService = async (
  user_id: string,
  grade: GradeModel
) => {
  try {
    return await request({
      method: "POST",
      url: "/api/grade/",
      params: {
        user_id: user_id,
      },
      data: { grade: grade },
    });
  } catch (error) {
    return error;
  }
};
