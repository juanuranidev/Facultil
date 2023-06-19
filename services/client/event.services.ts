import { request } from "util/request";
import { EventModel } from "models/client/event.model";

export const getEventsService = async (
  user_id: string,
  dateFormatted: string
) => {
  try {
    return await request({
      method: "GET",
      url: "/api/event/",
      params: {
        user_id: user_id,
        date: dateFormatted,
      },
    });
  } catch (error) {
    return error;
  }
};

export const postEventService = async (user_id: string, event: EventModel) => {
  try {
    return await request({
      method: "POST",
      url: "/api/event/",
      params: {
        user_id: user_id,
      },
      data: { event: event },
    });
  } catch (error) {
    return error;
  }
};

// export const handleDeleteGradeService = async (
//   user_id: string,
//   grade_id: string
// ) => {
//   try {
//     return await request({
//       method: "DELETE",
//       url: "/api/grade/",
//       params: {
//         user_id: user_id,
//         grade_id: grade_id,
//       },
//     });
//   } catch (error) {
//     return error;
//   }
// };
