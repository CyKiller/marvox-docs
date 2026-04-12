import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { DocsNavigation } from "@/components/docs-navigation"
import { DocsHeader } from "@/components/docs-header"
import { DocsFooter } from "@/components/docs-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import "highlight.js/styles/github-dark.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const SITE_URL = "https://marvox-docs.netlify.app"
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Marvox Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marvox Documentation",
    description: "Build character-aware storyworlds with CharacterOS.",
    images: ["/og-image.svg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        {/* Google Analytics — no-op if NEXT_PUBLIC_GA_ID is unset */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Skip to content for keyboard / screen reader users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:outline-none"
            style={{
              background: "hsl(196 100% 67%)",
              color: "#020817",
            }}
          >
            Skip to content
          </a>
          <div className="docs-shell">
            <DocsHeader />
            <div className="docs-body">
              <aside className="docs-sidebar">
                <DocsNavigation />
              </aside>
              <main id="main-content" className="docs-main">
                <div className="max-w-4xl mx-auto px-8 py-10 min-h-full">
                  <Suspense fallback={<div className="animate-pulse text-muted-foreground text-sm">Loading…</div>}>
                    {children}
                  </Suspense>
                </div>
                <DocsFooter />
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
