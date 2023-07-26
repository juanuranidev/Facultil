import React from "react";
import Subject from "views/student/subject/Subject";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export default function index() {
  return <Subject />;
}

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };
