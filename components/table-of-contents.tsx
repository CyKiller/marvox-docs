"use client"

import React, { useEffect, useState } from "react"

type TocEntry = {
  id: string
  text: string
  level: 2 | 3
}

function extractHeadings(markdown: string): TocEntry[] {
  const lines = markdown.split("\n")
  const entries: TocEntry[] = []
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/)
    const h3 = line.match(/^###\s+(.+)$/)
    if (h3) {
      const text = h3[1].replace(/[*_`[\]]/g, "").trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
      entries.push({ id, text, level: 3 })
    } else if (h2) {
      const text = h2[1].replace(/[*_`[\]]/g, "").trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
      entries.push({ id, text, level: 2 })
    }
  }
  return entries
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const entries = extractHeadings(markdown)
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (entries.length === 0) return
    const scrollRoot = document.querySelector(".docs-main") ?? window

    const observer = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      {
        root: scrollRoot instanceof Window ? null : scrollRoot,
        rootMargin: "-56px 0px -60% 0px",
        threshold: 0,
      }
    )

    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [entries])

  if (entries.length < 2) return null

  return (
    <nav
      aria-label="On this page"
      className="hidden xl:block sticky top-6 w-52 shrink-0 pl-6"
      style={{ alignSelf: "flex-start" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: "hsl(240 5% 45%)" }}
      >
        On this page
      </p>
      <ul className="space-y-1.5">
        {entries.map(({ id, text, level }) => {
          const isActive = activeId === id
          return (
            <li key={id} className={level === 3 ? "pl-3" : ""}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const scrollRoot = document.querySelector(".docs-main")
                  const target = document.getElementById(id)
                  if (target && scrollRoot) {
                    const offset = target.offsetTop - 72
                    scrollRoot.scrollTo({ top: offset, behavior: "smooth" })
                  } else if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
                className="block text-xs leading-relaxed transition-colors py-0.5"
                style={{
                  color: isActive ? "hsl(196 100% 67%)" : "hsl(240 5% 52%)",
                  borderLeft: isActive ? "2px solid hsl(196 100% 67%)" : "2px solid transparent",
                  paddingLeft: isActive ? "8px" : "10px",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
