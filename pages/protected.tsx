import React from "react";
import { getSession, useSession } from "next-auth/react";

export default function Protected() {
  const { data: session, status } = useSession();
  // console.log(status);
  return <div>protected</div>;
}

export const getServerSideProps = async (context: any) => {
  // console.log(context);
  const session = await getSession(context);
  console.log(session);
  // if (session === "unauthenticated") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //     },
  //   };
  // }

  return {
    props: { session },
  };
};
