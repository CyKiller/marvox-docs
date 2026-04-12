"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const mainElement = document.querySelector("main")
      if (mainElement && mainElement.scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const mainElement = document.querySelector("main")
    if (mainElement) {
      mainElement.addEventListener("scroll", toggleVisibility)
      return () => mainElement.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    const mainElement = document.querySelector("main")
    if (mainElement) {
      mainElement.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg"
      size="icon"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
