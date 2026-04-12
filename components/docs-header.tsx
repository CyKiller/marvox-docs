import type React from "react"
import Link from "next/link"
import { BookOpen, Github, ExternalLink } from "lucide-react"

export const DocsHeader: React.FC = () => {
  return (
    <header
      style={{
        borderBottom: "1px solid rgba(148,163,184,0.12)",
        background: "rgba(4,9,20,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        flexShrink: 0,
      }}
    >
      <div className="flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(196 100% 67%) 0%, hsl(196 80% 48%) 100%)",
              boxShadow: "0 0 16px rgba(125,211,252,0.35)",
            }}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#020817]" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-white tracking-tight text-sm">
            Marvox{" "}
            <span style={{ color: "hsl(196 100% 67%)" }}>Docs</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {[
            { href: "/getting-started", label: "Get Started" },
            { href: "/api", label: "API" },
            { href: "/agents", label: "Agents" },
            { href: "/architecture", label: "Architecture" },
            { href: "/developers", label: "Dev Guide" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors text-slate-500 hover:text-slate-100"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="https://marvox.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all"
            style={{
              color: "hsl(196 100% 67%)",
              border: "1px solid rgba(125,211,252,0.2)",
              background: "rgba(125,211,252,0.06)",
            }}
          >
            App <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="https://github.com/CyKiller/MarvoxV1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
            style={{ color: "hsl(240 5% 60%)" }}
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default DocsHeader
