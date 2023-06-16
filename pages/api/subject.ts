import {
  handleGetSubjectsService,
  handlePostSubjectService,
  handleDeleteSubjectService,
  handleGetSubjectByIdService,
} from "services/server/subject.services";
import type { NextApiRequest, NextApiResponse } from "next";
import { handleGetUserById } from "services/server/student.services";
import { ResponseModel } from "models/client/response.model";
import mongodbConnect from "config/mongodbApiConnext";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseModel>
) {
  const { method } = req;
  const { user_id, subject_id } = req.query;
  await mongodbConnect();

  const user = await handleGetUserById(user_id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuario no encontrado",
    });
  }

  switch (method) {
    case "GET":
      if (subject_id) {
        const subject: any = await handleGetSubjectByIdService(subject_id);

        if (!subject.length) {
          return res.status(204).json({
            success: false,
            message: "No se encontró la materia",
            data: [],
          });
        }

        return res.status(200).json({
          success: true,
          message: "Materia encontrados con éxito",
          data: subject,
        });
      } else {
        const subjects: any = await handleGetSubjectsService(user);

        if (!subjects.length) {
          return res.status(204).json({
            success: false,
            message: "No se encontraron materias",
            data: [],
          });
        }

        return res.status(200).json({
          success: true,
          message: "Materias encontrados con éxito",
          data: subjects,
        });
      }
      break;
    case "POST":
      try {
        const { subject } = req.body;
        if (!subject) {
          return res.status(400).json({
            success: false,
            message: "Ingrese una materia",
          });
        }
        const subject_saved = await handlePostSubjectService(user, subject);

        return res.status(201).json({
          success: true,
          message: "Materia creado con éxito",
          data: subject_saved,
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
        const { subject_id } = req.query;

        const subject_found = await handleGetSubjectByIdService(subject_id!);
        if (!subject_found) {
          return res.status(404).json({
            success: false,
            message: "Materia no encontrada",
          });
        }

        const subject_deleted = await handleDeleteSubjectService(subject_found);
        return res.status(200).json({
          success: true,
          message: "Materia eliminado con éxito",
          data: [subject_deleted],
        });
      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: "Error en el servidor",
          error: error,
        });
      }
      break;
  }
}
