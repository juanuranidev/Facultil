// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongodbConnect from "config/mongodbApiConnext";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import User from "models/server/user.schema";

type Data = {
  name?: string | null;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const mongoConnect = await mongodbConnect();
  // console.log("conectado a mongo", mongoConnect);
  console.log("SESSION", { req });
  const session = await getSession({ req });
  if (!session) {
    return res.status(200).json({ message: "No estás autenticado" });
  }

  const data: Data = {
    name: session.user?.name ?? null, // Utilizar el operador de encadenamiento opcional y el operador de fusión nula para manejar valores null
  };

  const users = await User.find();
  // console.log(users);

  return res.status(200).json({ message: "Datos encontrados con éxito" });
}
