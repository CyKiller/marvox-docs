"use client"

import type React from "react"
import Link from "next/link"
import { BookOpen, Github, ExternalLink, Sun, Moon, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useSearch } from "@/components/search-provider"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // Avoid hydration mismatch — render only after mount
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />
  const isDark = theme === "dark"
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
      style={{ color: "hsl(240 5% 60%)" }}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

export const DocsHeader: React.FC = () => {
  const { openSearch } = useSearch()

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
        {/* Logo and Desktop Search Trigger */}
        <div className="flex items-center gap-5 flex-1 md:flex-none">
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-sky-400/10 border border-sky-400/25 transition-colors group-hover:bg-sky-400/15"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-300" strokeWidth={2.2} />
            </div>
            <span className="font-semibold text-white tracking-tight text-sm font-sans">
              Marvox{" "}
              <span style={{ color: "#7dd3fc" }}>Docs</span>
            </span>
          </Link>

          <button
            onClick={openSearch}
            className="hidden sm:flex items-center justify-between text-left text-[11px] px-2.5 py-1 rounded-lg border border-slate-800/80 bg-slate-950/40 text-slate-500 hover:text-slate-300 hover:border-slate-700/80 transition-all cursor-pointer w-40 lg:w-48 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3 h-3 text-slate-500" />
              <span>Search docs...</span>
            </span>
            <kbd className="inline-flex h-4 select-none items-center gap-0.5 rounded border border-slate-800/80 bg-slate-900/50 px-1.5 font-mono text-[9px] font-medium text-slate-500">
              <span>⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {[
            { href: "/getting-started", label: "Get Started" },
            { href: "/api", label: "API" },
            { href: "/architecture", label: "Architecture" },
            { href: "/agents", label: "Agents" },
            { href: "/workflows", label: "Workflows" },
            { href: "/developers", label: "Dev Guide" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors text-slate-500 hover:text-slate-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Mobile search button */}
          <button
            onClick={openSearch}
            className="flex sm:hidden items-center justify-center w-8 h-8 rounded-md transition-colors text-slate-500 hover:text-slate-200"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <ThemeToggle />
          <Link
            href="https://marvox.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all ml-2 border border-sky-400/15 bg-sky-400/5 text-sky-300 hover:bg-sky-400/10"
          >
            App <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="https://github.com/CyKiller/MarvoxV1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-md transition-colors text-slate-500 hover:text-slate-200"
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
