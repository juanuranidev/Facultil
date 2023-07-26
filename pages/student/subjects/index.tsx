import React from "react";
import Subjects from "views/student/subjects/Subjects";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export default function Index() {
  return <Subjects />;
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
