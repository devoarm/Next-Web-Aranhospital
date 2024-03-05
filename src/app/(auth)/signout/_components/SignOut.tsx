"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  useEffect(() => {
    setTimeout(() => {
      signOut({
        callbackUrl: "/",
        redirect: true,
      });
    }, 500);
  }, []);

  return null;
}
