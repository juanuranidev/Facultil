import { Types } from "mongoose";

export type SubjectModel = {
  name: string;
  image: string;
  is_active: boolean;
  user_id?: Types.ObjectId;
  _id?: string;
};
