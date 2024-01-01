"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "supertokens-auth-react/recipe/thirdpartypasswordless";

const SignOut = () => {
  async function onLogout() {
    await signOut();
    window.location.href = "/auth";
  }
  return <Button onClick={onLogout}>SignOut</Button>;
};

export default SignOut;
