import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, ExternalLink } from "lucide-react"

export function DocsFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold">Marvox</h3>
            <p className="text-sm text-muted-foreground">
              Storyworld Production Studio powered by CharacterOS.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/CyKiller/Marvox">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://twitter.com/marvox">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/getting-started" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/user-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  User Guide
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contributing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contributing
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="https://marvox.ai/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Legal Hub
                </Link>
              </li>
              <li>
                <Link
                  href="https://marvox.ai"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  Main Site <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2026 Marvox. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="https://marvox.ai/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Legal
            </Link>
            <Link href="https://marvox.ai/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="https://marvox.ai/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="https://marvox.ai/acceptable-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Acceptable Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
