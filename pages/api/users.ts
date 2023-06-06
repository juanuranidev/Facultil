// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongodbConnect from "config/mongodbApiConnext";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import User from "models/server/user.schema";

type Data = {
  success: boolean;
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  await mongodbConnect();
  const session = await getSession({ req });
  const users = await User.find();

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "No estás autorizado",
      data: null,
    });
  }

  if (!users) {
    return res.status(204).json({
      success: false,
      message: "No se encontraron usuarios",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Usuario encontrado con éxito",
    data: users,
  });
}
