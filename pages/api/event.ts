import type { NextApiRequest, NextApiResponse } from "next";
import { handleGetUserById } from "services/server/student.services";
import { ResponseModel } from "models/client/response.model";
import mongodbConnect from "config/mongodbApiConnext";
import {
  handleDeleteGradeService,
  handleGetGradesService,
  handlePostGradeService,
} from "services/server/grade.services";
import { getSession } from "next-auth/react";
import {
  getEventsService,
  postEventservice,
} from "services/server/event.services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseModel>
) {
  try {
    await mongodbConnect();
    const { method } = req;
    const { user_id } = req.query;

    // const session = await getSession({ req });
    // console.log("SESSSSION", session);
    // if (!session) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "No estás autorizado",
    //   });
    // }

    const user = await handleGetUserById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    switch (method) {
      case "GET":
        try {
          const { date } = req.query;
          // console.log(date);
          const events: any = await getEventsService(user, date);
          if (!events.length) {
            return res.status(201).json({
              success: false,
              message: "No hay eventos",
              data: [],
            });
          }

          return res.status(201).json({
            success: true,
            message: "Eventos encontrados con éxito",
            data: events,
          });
        } catch (error: any) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error,
          });
        }
      case "POST":
        try {
          const { event } = req.body;

          console.log(event);
          if (!event) {
            return res.status(400).json({
              success: false,
              message: "Ingrese un evento",
            });
          }
          const event_saved = await postEventservice(user, event);

          return res.status(201).json({
            success: true,
            message: "Evento creado con éxito",
            data: event_saved,
          });
        } catch (error: any) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error,
          });
        }
      // case "DELETE":
      //   try {
      //     const { grade_id } = req.query;
      //     console.log(grade_id);
      //     if (!grade_id) {
      //       return res.status(400).json({
      //         success: false,
      //         message: "Ingrese una nota",
      //       });
      //     }
      //     const grade_deleted = await handleDeleteGradeService(grade_id);

      //     return res.status(201).json({
      //       success: true,
      //       message: "Nota eliminada con éxito",
      //       data: grade_deleted,
      //     });
      //   } catch (error: any) {
      //     console.log(error);
      //     return res.status(500).json({
      //       success: false,
      //       message: "Error en el servidor",
      //       error: error,
      //     });
      //   }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error,
    });
  }
}
