import React from "react";
import Login from "views/public/login/Login";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export default function Home() {
  return <Login />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/student/subjects",
      },
    };
  }

  return {
    props: { session },
  };
};
