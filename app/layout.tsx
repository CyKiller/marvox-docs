import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"
import Script from "next/script"
import { DocsNavigation } from "@/components/docs-navigation"
import { DocsHeader } from "@/components/docs-header"
import { DocsFooter } from "@/components/docs-footer"
import { DocsLayoutShell } from "@/components/docs-layout-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { SearchProvider } from "@/components/search-provider"
import { Suspense } from "react"
import "./globals.css"
import "highlight.js/styles/github-dark.css"

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased selection:bg-primary/20 selection:text-primary">
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
          
          <SearchProvider>
            <DocsLayoutShell
              header={<DocsHeader />}
              sidebar={<DocsNavigation />}
              footer={<DocsFooter />}
            >
              <Suspense fallback={<div className="animate-pulse text-muted-foreground text-sm">Loading…</div>}>
                {children}
              </Suspense>
            </DocsLayoutShell>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

