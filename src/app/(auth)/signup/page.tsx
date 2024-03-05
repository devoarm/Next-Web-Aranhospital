import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import SignUpForm from "./_components/SignUpForm";

export const metadata: Metadata = {
  title: "สมัครสมาชิก",
  description: "Authentication",
};

export default function SignUpPage() {
  return (
    <section className="flex w-full min-h-screen items-center justify-center py-14">
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
        <h1 className="text-2xl font-semibold">สมัครสมาชิก</h1>
        <p className="text-sm text-muted-foreground"></p>
      </div>
      <div className="bg-gray-50">
      <SignUpForm />
      </div>
    </div>
  </section>
  )
}



