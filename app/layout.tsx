import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DocsNavigation } from "@/components/docs-navigation"
import { DocsHeader } from "@/components/docs-header"
import { DocsFooter } from "@/components/docs-footer"
import { Suspense } from "react"
import "./globals.css"
import "highlight.js/styles/github-dark.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Marvox Documentation",
    template: "%s — Marvox Docs",
  },
  description: "Build character-aware storyworlds with CharacterOS. API reference, guides, and architecture docs.",
  keywords: ["Marvox", "CharacterOS", "storyworld", "AI", "documentation"],
  openGraph: {
    title: "Marvox Documentation",
    description: "Build character-aware storyworlds with CharacterOS.",
    siteName: "Marvox Docs",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable}`}>
        <div className="docs-shell">
          <DocsHeader />
          <div className="docs-body">
            <aside className="docs-sidebar">
              <DocsNavigation />
            </aside>
            <main className="docs-main">
              <div className="max-w-4xl mx-auto px-8 py-10 min-h-full">
                <Suspense fallback={<div className="animate-pulse text-muted-foreground text-sm">Loading…</div>}>
                  {children}
                </Suspense>
              </div>
              <DocsFooter />
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
