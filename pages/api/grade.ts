import {
  handleGetSubjectsService,
  handlePostSubjectService,
  handleDeleteSubjectService,
  handleGetSubjectByIdService,
} from "services/server/subject/subject.services";
import type { NextApiRequest, NextApiResponse } from "next";
import { handleGetUserById } from "services/server/student/student.services";
import { ResponseModel } from "models/client/response.model";
import mongodbConnect from "config/mongodbApiConnext";
import {
  handleDeleteGradeService,
  handleGetGradesService,
  handlePostGradeService,
} from "services/server/grade/grade.services";
import { getSession } from "next-auth/react";

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
          const grades: any = await handleGetGradesService(user);

          if (!grades.length) {
            return res.status(201).json({
              success: false,
              message: "No hay notas",
              data: [],
            });
          }

          return res.status(201).json({
            success: true,
            message: "Nota creado con éxito",
            data: grades,
          });
        } catch (error: any) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error,
          });
        }
        break;
      case "POST":
        try {
          const { grade } = req.body;

          console.log(grade);
          if (!grade) {
            return res.status(400).json({
              success: false,
              message: "Ingrese una nota",
            });
          }
          const grade_saved = await handlePostGradeService(user, grade);

          return res.status(201).json({
            success: true,
            message: "Nota creado con éxito",
            data: grade_saved,
          });
        } catch (error: any) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error,
          });
        }
        break;
      case "DELETE":
        try {
          const { grade_id } = req.query;
          console.log(grade_id);
          if (!grade_id) {
            return res.status(400).json({
              success: false,
              message: "Ingrese una nota",
            });
          }
          const grade_deleted = await handleDeleteGradeService(grade_id);

          return res.status(201).json({
            success: true,
            message: "Nota eliminada con éxito",
            data: grade_deleted,
          });
        } catch (error: any) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error,
          });
        }
        break;
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error,
    });
  }
}
