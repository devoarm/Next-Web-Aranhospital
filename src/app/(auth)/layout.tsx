
import { siteMetadata } from "@/config/siteMetadata";

import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: ["Aranyaprathet Hospital"],
  authors: [
    {
      name: "Aranyaprathet Hospital",
      url: "https://aranhos.go.th",
    },
  ],
  creator: "Aranyaprathet Hospital",
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.ico",
    apple: "/apple-touch-icon/apple-touch-icon.png",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    locale: "en_US",
    type: "website",
  },
};

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className=" bg-gradient-to-b from-violet-500 via-violet-400 to-violet-300">
      {children}
    </main>
  );
}
