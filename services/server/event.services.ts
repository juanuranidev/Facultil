import Event from "models/server/event.schema";
import mongoose from "mongoose";
import { UserModel } from "models/client/user.model";
import { EventModel } from "models/client/event.model";

export const getEventsService = async (user: EventModel) => {
  try {
    const events = await Event.aggregate([
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

    return events;
  } catch (error) {
    return error;
  }
};

export const postEventservice = async (user: UserModel, event: EventModel) => {
  try {
    const new_event = new Event({ ...event, user_id: user._id });
    const event_saved = await new_event.save();

    return event_saved;
  } catch (error) {
    return error;
  }
};

// export const handleDeleteEventservice = async (grade_id: string | string[]) => {
//   try {
//     const grade_deleted = await Grade.findOneAndUpdate(
//       { _id: grade_id },
//       { is_active: false },
//       { new: true }
//     );

//     return grade_deleted;
//   } catch (error) {
//     return error;
//   }
// };
