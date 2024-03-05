import "@/styles/globals.css";
import { siteMetadata } from "@/config/siteMetadata";
import { fontSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { NextThemeProvider } from "@/providers/NextThemeProvider";
import RadixThemeProvider from "@/providers/RadixThemeProvider";
import NextUiProvider from "@/providers/NextUiProvider";
import { IndicatorSize } from "@/components/IndicatorSize";
import { ScollToTop } from "@/components/ScollToTop";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/session";
import MainProvider from "@/providers/MainProvider";

import type { Metadata } from "next";
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

interface RootLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getCurrentUser();
  const notAdmin = session?.user.role != "ADMIN";

  return (
    <html lang={siteMetadata.language} suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <MainProvider>
          <NextAuthProvider>
            <NextThemeProvider>
              <NextUiProvider>
                <RadixThemeProvider>
                  {children}
                  {notAdmin ? null : <IndicatorSize />}
                  <ScollToTop />
                  <Toaster position="top-right" expand={false} richColors />
                  <CookieConsent />
                </RadixThemeProvider>
              </NextUiProvider>
            </NextThemeProvider>
          </NextAuthProvider>
        </MainProvider>
      </body>
    </html>
  );
}
