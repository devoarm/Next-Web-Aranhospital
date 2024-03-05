"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { siteMetadata } from "@/config/siteMetadata"

export function NextThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}
