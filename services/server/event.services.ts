import Event from "models/server/event.schema";
import mongoose from "mongoose";
import moment from "moment";
import { UserModel } from "models/client/user.model";
import { EventModel } from "models/client/event.model";

export const getEventsService = async (user: EventModel, date: any) => {
  console.log("date", date);
  try {
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    const events = await Event.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(user._id),
          is_active: true,
          $expr: {
            $eq: [
              {
                $month: {
                  $toDate: { $dateFromString: { dateString: "$date" } },
                },
              },
              month,
            ],
          },
          // Resto de las condiciones...
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    console.log("eventos", events);
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

// export const handleDeleteEventservice = async (grade_id: any) => {
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
