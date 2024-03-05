
import { siteMetadata } from "@/config/siteMetadata";
import { getCurrentUser } from "@/lib/session";
import NotAdmin from "../not-admin";
import HeaderAdmin from "./admin/_components/Header";
import NavbarAdmin from "./admin/_components/Navbar";
import FooterAdmin from "./admin/_components/Footer";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
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

interface AdminLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getCurrentUser();
  const notAdmin = session?.user.role != "ADMIN";

  if (!session || notAdmin) {
    return <NotAdmin />;
    // redirect('/')
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 ">
      {children}
    </main>
  );
}
