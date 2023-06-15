import Subject from "models/server/subject.schema";
import mongoose from "mongoose";
import mongodbConnect from "config/mongodbApiConnext";
import { SubjectModel } from "models/client/subject.model";
import { request } from "util/request";

export const handleGetSubjectByIdService = async (
  user_id: string,
  subject_id: string | string[]
) => {
  try {
    return await request({
      method: "GET",
      url: "/api/subject/",
      params: {
        user_id: user_id,
        subject_id: subject_id,
      },
    });
  } catch (error) {
    return error;
  }
};

export const handleGetSubjectsService = async (user_id: string) => {
  try {
    return await request({
      method: "GET",
      url: "/api/subject/",
      params: {
        user_id: user_id,
      },
    });
  } catch (error) {
    return error;
  }
};

export const handlePostSubjectService = async (
  user_id: string,
  subject: SubjectModel
) => {
  try {
    return await request({
      method: "POST",
      url: "/api/subject/",
      params: {
        user_id: user_id,
      },
      data: { subject: subject },
    });
  } catch (error) {
    return error;
  }
};

export const handleDeleteSubjectService = async (
  user_id: string,
  subject_id: string | undefined
) => {
  try {
    return await request({
      method: "DELETE",
      url: "/api/subject/",
      params: {
        user_id: user_id,
        subject_id: subject_id,
      },
    });
  } catch (error) {
    return error;
  }
};
