import React from "react";
import Login from "views/public/login/Login";
import { useSession, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  if (!session) return <Login />;

  return <button onClick={async () => await signOut()}>Cerrar sesión</button>;
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
};
