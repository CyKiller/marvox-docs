import type React from "react"
import Link from "next/link"
import { MobileNavigation } from "./mobile-navigation"

export const DocsHeader: React.FC = () => {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileNavigation />
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Marvox Docs
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/getting-started" className="text-muted-foreground hover:text-foreground">
              Getting Started
            </Link>
            <Link href="/api" className="text-muted-foreground hover:text-foreground">
              API
            </Link>
            <Link href="/developers" className="text-muted-foreground hover:text-foreground">
              Developers
            </Link>
            <Link href="/architecture" className="text-muted-foreground hover:text-foreground">
              Architecture
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default DocsHeader
