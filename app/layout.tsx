import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DocsNavigation } from "@/components/docs-navigation"
import { DocsHeader } from "@/components/docs-header"
import { DocsFooter } from "@/components/docs-footer"
import { SearchProvider } from "@/components/search-provider"
import { Suspense } from "react"
import "./globals.css"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
})
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Marvox Documentation",
  description: "Documentation for Marvox Storyworld Production Studio and CharacterOS.",
  keywords: ["Marvox", "CharacterOS", "storyworld", "AI", "documentation"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.className} ${serif.variable} ${sans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SearchProvider>
            <div className="flex flex-col min-h-screen bg-background">
              <DocsHeader />
              <div className="flex flex-1 overflow-hidden">
                <DocsNavigation />
                <main className="flex-1 overflow-y-auto">
                  <div className="max-w-4xl mx-auto px-6 py-8 min-h-full">
                    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>{children}</Suspense>
                  </div>
                  <DocsFooter />
                </main>
              </div>
            </div>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
