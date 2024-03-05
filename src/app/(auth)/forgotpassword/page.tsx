import React from "react";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ลืมรหัสผ่าน",
  description: "Authentication",
};

type Props = {};

export default function ForgotPasswordPage(props: Props) {
  return (
    <div className="flex w-full min-h-screen items-center justify-center py-14">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-4 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/images/aranhos.jpg"
              priority
              alt="Logo"
              className="h-32 w-32 "
              width={600}
              height={600}
            />
          </Link>
          <h1 className="text-2xl font-semibold">ลืมรหัสผ่าน</h1>
          <p className="text-sm text-muted-foreground">ค้นหาบัญชีของคุณ</p>
        </div>
        <div className="bg-gray-50">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
