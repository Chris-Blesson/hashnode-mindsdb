"use client";
import { createContext, useEffect, useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import RegisterPath from "../Components/Onboarding/RegisterPath";

export const UserContext = createContext<any>(null);
const UserContextProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const session = useSessionContext();
  console.log("[USER CONTEXT PROVIDER] session", session);
  // Todo move to user email after auth logic
  useEffect(() => {
    // session?.user &&
    setIsLoading(true);
    requestWrapper(`/account`, {
      cache: "no-store",
    })
      .then((account) => setUserContextData(account))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading || session.loading) {
    return <p>Loading...</p>;
  }
  //@ts-ignore
  if (!isLoading && !session.loading && !userContextData.id) {
    return <RegisterPath />;
  }
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
