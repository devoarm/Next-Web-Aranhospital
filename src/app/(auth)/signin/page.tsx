import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignInForm from "./_components/SignInForm";

import { Metadata } from "next";
import { getCurrentUser } from "@/lib/session";
export const metadata: Metadata = {
  title: "เข้าสู่ระบบ",
  description: "Authentication",
};

export default async function SignInPage() {
  const session = await getCurrentUser();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex w-full min-h-screen items-center justify-center py-0 px-0">
      <div className="z-10 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] overflow-hidden rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center justify-center space-y-1 border-b border-gray-200 bg-white px-4 py-4 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/images/aranhos.jpg"
              priority
              alt="Logo"
              className="h-32 w-32 "
              width={800}
              height={800}
            />
          </Link>
          <h1 className="text-2xl font-semibold">เข้าสู่ระบบ</h1>
          <p className="text-sm text-muted-foreground">
            Enter your Username and Password
          </p>
        </div>
        <div className="bg-gray-50">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
