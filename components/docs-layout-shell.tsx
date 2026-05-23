"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocsLayoutShellProps {
  header: React.ReactNode
  sidebar: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}

export function DocsLayoutShell({
  header,
  sidebar,
  footer,
  children,
}: DocsLayoutShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by checking localStorage only after mounting
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("marvox-sidebar-collapsed")
    if (saved === "true") {
      setIsCollapsed(true)
    }
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      localStorage.setItem("marvox-sidebar-collapsed", String(next))
      return next
    })
  }

  return (
    <div className="docs-shell">
      {header}
      <div className="docs-body relative">
        {/* Sleek Cinematic Toggle Button for Desktop */}
        {mounted && (
          <button
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
            className={cn(
              "hidden md:flex absolute top-[180px] z-50 items-center justify-center w-5 h-10 rounded-r-md border border-l-0 border-slate-800/80 bg-slate-950/90 text-slate-400 hover:text-sky-300 transition-all hover:bg-slate-900/90 group focus:outline-none cursor-pointer",
              isCollapsed ? "left-0" : "left-[260px]"
            )}
            style={{
              transition: "left 300ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms, background 150ms",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        )}

        {/* Sidebar container */}
        <aside
          className={cn(
            "docs-sidebar relative transition-all duration-300 ease-in-out md:block",
            isCollapsed ? "collapsed" : ""
          )}
        >
          {sidebar}
        </aside>

        {/* Main Content Area */}
        <main id="main-content" className="docs-main flex-1 overflow-y-auto relative">
          <div className="max-w-4xl mx-auto px-8 py-10 min-h-full">
            {children}
          </div>
          {footer}
        </main>
      </div>
    </div>
  )
}

export default DocsLayoutShell
