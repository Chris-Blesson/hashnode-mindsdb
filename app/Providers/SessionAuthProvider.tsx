"use client";

import { usePathname } from "next/navigation";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Applayout from "../Components/Applayout.tsx";
import { NextUiProvider } from "../Components/NextUiProvider";
import UserContextProvider from "./UserContextProvider";
import RouteWhitelister from "./RouteWhiteListProvider";

export default function SessionAuthProvider({ children }) {
  const pathName = usePathname();
  if (pathName.includes("/auth")) {
    return <>{children}</>;
  }
  return (
    <SessionAuth>
      <UserContextProvider>
        <NextUiProvider>
          <RouteWhitelister>
            <Applayout>{children}</Applayout>
          </RouteWhitelister>
        </NextUiProvider>
      </UserContextProvider>
    </SessionAuth>
  );
}
