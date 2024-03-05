import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotUser() {
  return (
    <main className="min-h-screen grid place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Image src="/images/logoaranhos.png" width={180} height={80} alt="logo" className="flex mx-auto mb-5"></Image>
        <p className="text-4xl font-bold text-primary">Authentication</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Not User
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/signin"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-accent shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            Sign-In
          </Link>
        </div>
      </div>
    </main>
  );
}
