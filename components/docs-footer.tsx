import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"

export function DocsFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(148,163,184,0.1)",
        background: "rgba(4,9,20,0.6)",
      }}
    >
      <div className="px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          <div className="col-span-2 md:col-span-1 space-y-3">
            <p className="font-semibold text-sm" style={{ color: "hsl(0 0% 90%)" }}>Marvox</p>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(240 5% 50%)" }}>
              Storyworld Production Studio powered by CharacterOS — a 25-agent orchestration network for canon-grounded character AI.
            </p>
            <div className="flex gap-2 pt-1">
              <Link
                href="https://github.com/CyKiller/MarvoxV1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-md transition-colors"
                style={{ color: "hsl(240 5% 55%)", border: "1px solid rgba(148,163,184,0.12)" }}
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(240 5% 40%)" }}>Docs</p>
            {[
              { label: "Getting Started", href: "/getting-started" },
              { label: "User Guide", href: "/user-guide" },
              { label: "API Reference", href: "/api" },
              { label: "Architecture", href: "/architecture" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="block text-sm transition-colors" style={{ color: "hsl(240 5% 56%)" }}>
                {label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(240 5% 40%)" }}>Developers</p>
            {[
              { label: "Dev Guide", href: "/developers" },
              { label: "Deployment", href: "/deployment" },
              { label: "Contributing", href: "/contributing" },
              { label: "Security", href: "/security" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="block text-sm transition-colors" style={{ color: "hsl(240 5% 56%)" }}>
                {label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(240 5% 40%)" }}>Product</p>
            {[
              { label: "Roadmap", href: "/roadmap" },
              { label: "Changelog", href: "/changelog" },
              { label: "Main App", href: "https://marvox.ai", external: true },
            ].map(({ label, href, external }) => (
              <Link
                key={href}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1 text-sm transition-colors"
                style={{ color: "hsl(240 5% 56%)" }}
              >
                {label}
                {external && <ExternalLink className="w-3 h-3 opacity-50" />}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs"
          style={{ borderTop: "1px solid rgba(148,163,184,0.08)", color: "hsl(240 5% 40%)" }}
        >
          <p>© 2026 Marvox. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://marvox.ai/legal" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(240 5% 40%)" }}>Legal</Link>
            <Link href="https://marvox.ai/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(240 5% 40%)" }}>Privacy</Link>
            <Link href="https://marvox.ai/terms" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(240 5% 40%)" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

