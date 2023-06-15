import mongodbConnect from "config/mongodbApiConnext";
import User from "models/server/user.schema";

export const handleGetUserById = async (
  user_id: string | string[] | undefined
) => {
  try {
    await mongodbConnect();

    const user = User.findById(user_id);

    return user;
  } catch (error) {
    return error;
  }
};
