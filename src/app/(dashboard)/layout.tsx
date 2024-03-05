import { getCurrentUser } from "@/lib/session";
import NotUser from "../not-user";

import type { Metadata } from "next";
import { siteMetadata } from "@/config/siteMetadata";
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: [
    "โรงบาล",
    "โรงพยาบาล",
    "โรงบาลอรัญประเทศ",
    "โรงพยาบาลอรัญประเทศ",
    "อรัญประเทศ",
    "อรัญ",
    "สระแก้ว",
    "Aran",
    "Aranyaprathet",
    "Hospital",
    "Aranyaprathet Hospital",
    "10870",
  ],
  authors: [
    {
      name: "Aranyaprathet Hospital",
      url: "https://aranhos.go.th",
    },
  ],
  creator: "Aranyaprathet Hospital",
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon.ico",
    apple: "/apple-touch-icon/apple-touch-icon.png",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [
      {
        url: "#",
        width: 800,
        height: 600,
      },
      {
        url: "#",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getCurrentUser();
  const notUser = session?.user.role != "USER";

  if (!session) {
    return <NotUser />;
  }

  return (
    <main className="">
      {children}
    </main>
  );
}
