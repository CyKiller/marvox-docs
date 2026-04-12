"use client"

import { useState, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight"
import type { Components } from "react-markdown"
import { Copy, Check } from "lucide-react"

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }, [code])
  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-all"
      style={{
        color: copied ? "#4ade80" : "hsl(240 5% 50%)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

/** Extract plain text from React children for clipboard */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (!node) return ""
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (typeof node === "object" && "props" in (node as object)) {
    const el = node as React.ReactElement
    return extractText(el.props.children)
  }
  return ""
}

const mdComponents: Components = {
  // Fenced code blocks: language label + copy button
  pre({ children, ...props }) {
    return (
      <div className="code-block-wrapper">
        <pre {...props}>{children}</pre>
      </div>
    )
  },
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "")
    const lang = match?.[1]
    if (lang) {
      const rawText = extractText(children)
      return (
        <div className="code-block">
          <div className="code-block-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="code-lang-label">{lang}</span>
            <CopyCodeButton code={rawText} />
          </div>
          <code className={className} {...props}>{children}</code>
        </div>
      )
    }
    return <code className={className} {...props}>{children}</code>
  },
  // Tables: horizontal-scroll wrapper
  table({ children, ...props }) {
    return (
      <div className="table-wrapper">
        <table {...props}>{children}</table>
      </div>
    )
  },
}

interface Props {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="docs-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={mdComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
