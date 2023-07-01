import Event from "models/server/event.schema";
import mongoose from "mongoose";
import moment from "moment";
import { UserModel } from "models/client/user.model";
import { EventModel } from "models/client/event.model";

export const getEventsService = async (user: EventModel, date: any) => {
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
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postEventservice = async (user: UserModel, event: EventModel) => {
  try {
    const new_event = new Event({ ...event, user_id: user._id });
    const event_saved = await new_event.save();

    return event_saved;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteEventService = async (event_id: any) => {
  try {
    const event_deleted = await Event.findOneAndUpdate(
      { new: true },
      { _id: event_id },
      { is_active: false }
    );

    return event_deleted;
  } catch (error: any) {
    throw new Error(error);
  }
};
