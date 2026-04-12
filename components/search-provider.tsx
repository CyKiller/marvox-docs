"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Code, Users, Zap } from "lucide-react"
import Link from "next/link"
import { DOC_PAGES } from "@/lib/docs-data"

interface SearchResult {
  title: string
  description: string
  href: string
  category: "guide" | "api" | "example" | "feature"
}

interface SearchContextType {
  isOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

const searchData: SearchResult[] = DOC_PAGES.map((page) => ({
  title: page.title,
  description: page.description,
  href: `/${page.slug}`,
  category:
    page.slug === "api"
      ? "api"
      : page.section === "Product"
        ? "feature"
        : "guide",
}))

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  const openSearch = useCallback(() => setIsOpen(true), [])
  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery("")
    setResults([])
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        openSearch()
      }
      if (e.key === "Escape") {
        closeSearch()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [openSearch, closeSearch])

  // Search functionality
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    )

    setResults(filtered)
  }, [query])

  const getCategoryIcon = (category: SearchResult["category"]) => {
    switch (category) {
      case "guide":
        return <FileText className="h-4 w-4" />
      case "api":
        return <Code className="h-4 w-4" />
      case "example":
        return <Users className="h-4 w-4" />
      case "feature":
        return <Zap className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: SearchResult["category"]) => {
    switch (category) {
      case "guide":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "api":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "example":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "feature":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    }
  }

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0">
          <div className="flex items-center border-b px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <Input
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {query && results.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">No results found for "{query}"</div>
            )}

            {results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => (
                  <Link
                    key={index}
                    href={result.href}
                    onClick={closeSearch}
                    className="block p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{getCategoryIcon(result.category)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-sm">{result.title}</h3>
                          <Badge variant="secondary" className={`text-xs ${getCategoryColor(result.category)}`}>
                            {result.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!query && (
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2">Popular Pages</h3>
                  <div className="space-y-1">
                    {searchData.slice(0, 4).map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeSearch}
                        className="block p-2 rounded hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(item.category)}
                          <span className="text-sm">{item.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Tip: Use ⌘K to open search anytime</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SearchContext.Provider>
  )
}
