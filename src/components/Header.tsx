import React from "react";
import Link from "next/link";
import { Phone, KeyRound, Mail } from "lucide-react";
import { ProfileButton } from "./ProfileButton";
import { getCurrentUser } from "@/lib/session";

export default async function Header() {
  const session = await getCurrentUser();
  return (
    <>
      <header className="bg-slate-800">
        <div className="flex flex-wrap justify-end items-center mx-auto w-full max-w-screen-xl px-2 sm:px-2 lg:px-2 py-2 sm:py-2 lg:py-2">
          <div className="flex items-center">
            <div className="hidden sm:block">
              <div className="flex flex-row">
                <Mail className="h-4 w-4  text-slate-400" aria-hidden="true" />
                <Link
                  href="mailto:aranhos.team@gmail.com"
                  className="ml-1 mr-2 text-xs text-slate-400 hover:text-indigo-400 hover:underline"
                >
                  aranhos.team@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex">
              <Phone className="h-4 w-4  text-slate-400" aria-hidden="true" />
              <Link
                href="tel:03723303336"
                className="ml-1 mr-2 text-xs text-slate-400 hover:text-indigo-400 hover:underline"
              >
                037 233 033-6
              </Link>
            </div>

            <div className="flex">
              {session && session?.user.username ? (
                <>
                  <ProfileButton />
                </>
              ) : (
                <>
                  <KeyRound
                    className="h-4 w-4  text-slate-400"
                    aria-hidden="true"
                  />
                  <Link
                    href="/signin"
                    className="ml-1 mr-2 text-xs text-slate-400 hover:text-indigo-400 hover:underline"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
