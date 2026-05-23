"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { DOC_SECTIONS } from "@/lib/docs-data"

export function DocsNavigation() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const expanded: string[] = []
    DOC_SECTIONS.forEach((section) => {
      if (section.pages.some((page) => `/${page.slug}` === pathname || pathname === `/${page.slug}/`)) {
        expanded.push(section.title)
      }
    })
    // Default: expand all sections
    if (expanded.length === 0) return DOC_SECTIONS.map((s) => s.title)
    return expanded
  })

  const toggle = (title: string) =>
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
    )

  return (
    <nav className="px-4 py-6 space-y-4 font-sans select-none">
      {DOC_SECTIONS.map((section) => {
        const isOpen = expandedItems.includes(section.title)
        return (
          <div key={section.title} className="space-y-1">
            <button
              onClick={() => toggle(section.title)}
              className="w-full flex items-center justify-between px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
              style={{ letterSpacing: "0.08em" }}
            >
              <span className="flex-1 text-left">{section.title}</span>
              {isOpen
                ? <ChevronDown className="w-3 h-3 text-slate-600 shrink-0" />
                : <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />}
            </button>
            {isOpen && (
              <div className="mt-1 mb-2 pl-2 space-y-0.5 border-l border-slate-900/60">
                {section.pages.map((page) => {
                  const active = pathname === `/${page.slug}` || pathname === `/${page.slug}/`
                  return (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className={cn(
                        "block px-3 py-1.5 text-xs rounded transition-all",
                        active
                          ? "bg-sky-400/10 text-sky-300 border-l border-sky-400 font-medium"
                          : "text-slate-400 border-l border-transparent hover:text-slate-200 hover:bg-slate-900/30"
                      )}
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
      <div className="pt-4 border-t border-slate-900/60 space-y-1.5">
        <p className="px-2.5 text-xs font-bold uppercase tracking-wider text-slate-500" style={{ letterSpacing: "0.08em" }}>
          Resources
        </p>
        <div className="pl-2 space-y-0.5 border-l border-transparent">
          {[
            { label: "Main App", href: "https://marvox.ai" },
            { label: "GitHub Repository", href: "https://github.com/CyKiller/MarvoxV1" },
            { label: "Changelog Notes", href: "/changelog" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block px-3 py-1.5 text-xs rounded text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
