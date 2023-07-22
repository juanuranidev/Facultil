import { connect, connection } from "mongoose";

const mongodbConnect = async () => {
  const conn = {
    isConnected: false,
  };

  if (conn.isConnected) return;

  const db: any = await connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
  conn.isConnected = db.connections[0].readyState;
};

connection.on("connected", () => {
  console.log("mongodb conectado");
});

export default mongodbConnect;
