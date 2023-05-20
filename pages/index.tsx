import React from "react";
import Login from "views/public/login/Login";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  if (!session) return <Login />;

  return <button onClick={async () => await signOut()}>Cerrar sesión</button>;
}
