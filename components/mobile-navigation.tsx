"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, ChevronDown, ChevronRight, BookOpen, Code, Users, Settings } from "lucide-react"
import { DOC_SECTIONS } from "@/lib/docs-data"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Getting Started": BookOpen,
  "User Guide": Users,
  "API Reference": Code,
  "Developer Guide": Settings,
  Product: BookOpen,
}

export function MobileNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand sections that contain the current page
    const expanded: string[] = []
    DOC_SECTIONS.forEach((section) => {
      if (section.pages.some((page) => `/${page.slug}` === pathname)) {
        expanded.push(section.title)
      }
    })
    return expanded
  })

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isExpanded = (title: string) => expandedItems.includes(title)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] px-6">
          <nav className="space-y-2 pb-8">
            {DOC_SECTIONS.map((section) => {
              const Icon = ICONS[section.title] ?? BookOpen
              return (
                <div key={section.title}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1.5 h-auto font-medium"
                    onClick={() => toggleExpanded(section.title)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span className="flex-1 text-left">{section.title}</span>
                    {isExpanded(section.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {isExpanded(section.title) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.pages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/${page.slug}`}
                          onClick={handleLinkClick}
                          className={cn(
                            "block px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                            pathname === `/${page.slug}`
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground",
                          )}
                        >
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
