import React, { useState, useEffect, createContext } from "react";
import { getSession, useSession } from "next-auth/react";
import { UserModel } from "models/client/user.model";
import { request } from "util/request";
import { useRouter } from "next/router";

const initialValue = {
  user: {},
  setUser: {},
};

type UserContextType = {
  user: any;
  setUser: any;
};

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<UserModel>();

  const handleGetUserInfo = async () => {
    try {
      const response: any = await request({
        method: "GET",
        url: "/api/users",
        params: {
          user_email: session!.user!.email,
        },
      });
      if (!response.data.success) {
        router.push("/adawdad");
      }
      let users = response.data.data;
      setUser(users.find((users: any) => users.email === session?.user?.email));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      handleGetUserInfo();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
