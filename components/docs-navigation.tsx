"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Code,
  Users,
  Settings,
  Layers,
} from "lucide-react"
import { DOC_SECTIONS } from "@/lib/docs-data"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Getting Started": BookOpen,
  "User Guide": Users,
  "API Reference": Code,
  "Developer Guide": Settings,
  Product: Layers,
}

export function DocsNavigation() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const expanded: string[] = []
    DOC_SECTIONS.forEach((section) => {
      if (section.pages.some((page) => `/${page.slug}` === pathname || pathname === `/${page.slug}/`)) {
        expanded.push(section.title)
      }
    })
    // Default: expand all
    if (expanded.length === 0) return DOC_SECTIONS.map((s) => s.title)
    return expanded
  })

  const toggle = (title: string) =>
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
    )

  return (
    <nav className="px-3 py-5 space-y-1">
      {DOC_SECTIONS.map((section) => {
        const Icon = ICONS[section.title] ?? BookOpen
        const isOpen = expandedItems.includes(section.title)
        return (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-md transition-colors"
              style={{ color: "hsl(240 5% 50%)" }}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1 text-left">{section.title}</span>
              {isOpen
                ? <ChevronDown className="w-3 h-3 opacity-60" />
                : <ChevronRight className="w-3 h-3 opacity-60" />}
            </button>
            {isOpen && (
              <div className="mt-0.5 mb-2 ml-2 space-y-0.5">
                {section.pages.map((page) => {
                  const active = pathname === `/${page.slug}` || pathname === `/${page.slug}/`
                  return (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className={cn(
                        "block px-3 py-1.5 text-sm rounded-md transition-all border-l-2",
                        active
                          ? "nav-active font-medium"
                          : "border-transparent hover:border-l-[rgba(125,211,252,0.2)] hover:bg-[rgba(125,211,252,0.04)]"
                      )}
                      style={active ? undefined : { color: "hsl(240 5% 60%)" }}
                    >
                      {page.title}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {/* Divider + external links */}
      <div style={{ borderTop: "1px solid rgba(148,163,184,0.1)", paddingTop: "1rem", marginTop: "0.5rem" }}>
        <p className="px-2.5 mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(240 5% 40%)" }}>
          External
        </p>
        {[
          { label: "Main App", href: "https://marvox.ai" },
          { label: "GitHub", href: "https://github.com/CyKiller/MarvoxV1" },
          { label: "Changelog", href: "/changelog" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block px-3 py-1.5 text-sm rounded-md border-l-2 border-transparent transition-all hover:bg-[rgba(125,211,252,0.04)]"
            style={{ color: "hsl(240 5% 55%)" }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
