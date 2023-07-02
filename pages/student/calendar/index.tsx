import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import Calendar from "views/student/calendar/Calendar";

export default function index() {
  return <Calendar />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
