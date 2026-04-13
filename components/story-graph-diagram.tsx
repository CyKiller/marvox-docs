"use client"

import React, { useEffect, useRef } from "react"

type StoryNode = {
  id: string
  label: string
  type: "character" | "event" | "plot_point" | "world_state"
  x: number
  y: number
  color: string
}

type StoryEdge = {
  from: string
  to: string
  type: "influences" | "triggers" | "relates_to" | "caused_by"
  strength: number
}

const nodesByType: Record<string, StoryNode[]> = {
  character: [
    { id: "alice", label: "Alice", type: "character", x: 100, y: 150, color: "#7c3aed" },
    { id: "cheshire", label: "Cheshire Cat", type: "character", x: 300, y: 100, color: "#7c3aed" },
    { id: "queen", label: "Queen of Hearts", type: "character", x: 150, y: 350, color: "#7c3aed" },
  ],
  event: [
    { id: "fall", label: "Falls Down Rabbit Hole", type: "event", x: 50, y: 50, color: "#f59e0b" },
    { id: "tea_party", label: "Mad Tea Party", type: "event", x: 250, y: 250, color: "#f59e0b" },
    { id: "trial", label: "Trial Scene", type: "event", x: 200, y: 400, color: "#f59e0b" },
  ],
  plot_point: [
    { id: "grows_small", label: "Grows/Shrinks", type: "plot_point", x: 120, y: 220, color: "#06b6d4" },
    { id: "riddles", label: "Riddles & Puzzles", type: "plot_point", x: 320, y: 200, color: "#06b6d4" },
  ],
  world_state: [
    { id: "wonderland", label: "Wonderland Logic", type: "world_state", x: 180, y: 300, color: "#10b981" },
    { id: "time", label: "Skewed Time", type: "world_state", x: 380, y: 280, color: "#10b981" },
  ],
}

const edges: StoryEdge[] = [
  // Character interactions
  { from: "alice", to: "cheshire", type: "relates_to", strength: 0.7 },
  { from: "alice", to: "queen", type: "relates_to", strength: 0.8 },
  // Events
  { from: "fall", to: "alice", type: "triggers", strength: 0.9 },
  { from: "tea_party", to: "cheshire", type: "influences", strength: 0.8 },
  { from: "trial", to: "queen", type: "caused_by", strength: 0.9 },
  // Plot interactions
  { from: "grows_small", to: "alice", type: "influences", strength: 0.85 },
  { from: "riddles", to: "cheshire", type: "caused_by", strength: 0.8 },
  // World state
  { from: "wonderland", to: "grows_small", type: "influences", strength: 0.9 },
  { from: "wonderland", to: "trial", type: "influences", strength: 0.7 },
  { from: "time", to: "tea_party", type: "influences", strength: 0.8 },
]

const allNodes = Object.values(nodesByType).flat()

export default function StoryGraphDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null)
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Draw edges first (so they appear behind nodes)
    edges.forEach((edge) => {
      const fromNode = allNodes.find((n) => n.id === edge.from)
      const toNode = allNodes.find((n) => n.id === edge.to)

      if (!fromNode || !toNode) return

      const x1 = fromNode.x
      const y1 = fromNode.y
      const x2 = toNode.x
      const y2 = toNode.y

      // Calculate arrow direction
      const dx = x2 - x1
      const dy = y2 - y1
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      // Draw line
      ctx.strokeStyle = `rgba(100, 116, 139, ${edge.strength})`
      ctx.lineWidth = 2 * edge.strength
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Draw arrow head
      const arrowSize = 8
      ctx.fillStyle = `rgba(100, 116, 139, ${edge.strength})`
      ctx.beginPath()
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 - arrowSize * Math.cos(angle - Math.PI / 6), y2 - arrowSize * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(x2 - arrowSize * Math.cos(angle + Math.PI / 6), y2 - arrowSize * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fill()

      // Draw edge label
      const labelX = (x1 + x2) / 2
      const labelY = (y1 + y2) / 2 - 8
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)"
      ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(edge.type.replace("_", " "), labelX, labelY)
    })

    // Draw nodes
    allNodes.forEach((node) => {
      const isHovered = hoveredNode === node.id
      const isSelected = selectedNode === node.id
      const isConnected =
        edges.some((e) => (e.from === hoveredNode && e.to === node.id) || (e.from === node.id && e.to === hoveredNode)) ||
        hoveredNode === null

      const radius = isHovered || isSelected ? 32 : 24
      const opacity = isConnected ? 1 : hoveredNode ? 0.3 : 1

      // Draw node circle
      ctx.fillStyle = node.color.replace(")", `, ${opacity})`).replace("rgb(", "rgba(")
      // Convert hex to rgba
      const r = parseInt(node.color.slice(1, 3), 16)
      const g = parseInt(node.color.slice(3, 5), 16)
      const b = parseInt(node.color.slice(5, 7), 16)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`

      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw border for selected/hovered
      if (isHovered || isSelected) {
        ctx.strokeStyle = "#fbbf24"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw label
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.font = `${isHovered || isSelected ? "bold" : ""} 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.label, node.x, node.y)
    })
  }, [hoveredNode, selectedNode])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is on any node
    for (const node of allNodes) {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      if (distance < 32) {
        setSelectedNode(node.id === selectedNode ? null : node.id)
        return
      }
    }
    setSelectedNode(null)
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if mouse is over any node
    for (const node of allNodes) {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      if (distance < 32) {
        canvas.style.cursor = "pointer"
        setHoveredNode(node.id)
        return
      }
    }
    setHoveredNode(null)
    canvas.style.cursor = "default"
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h1 className="font-display text-3xl font-semibold text-white mb-2">Story Graph</h1>
        <p className="text-slate-400 mb-6">
          Interactive knowledge graph showing how characters, events, plot points, and world state elements relate and influence each other.
          Click nodes to highlight connections.
        </p>

        <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={500}
            height={450}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setHoveredNode(null)}
            className="w-full block"
            style={{ maxHeight: "500px" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#7c3aed" }}></div>
                <span className="text-slate-400">Characters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
                <span className="text-slate-400">Events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#06b6d4" }}></div>
                <span className="text-slate-400">Plot Points</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
                <span className="text-slate-400">World State</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Node Types</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p><span className="font-mono text-slate-300">influences</span> — affects outcome</p>
              <p><span className="font-mono text-slate-300">triggers</span> — initiates event</p>
              <p><span className="font-mono text-slate-300">relates_to</span> — connects to</p>
              <p><span className="font-mono text-slate-300">caused_by</span> — result of</p>
            </div>
          </div>
        </div>

        {selectedNode && (
          <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-700">
            <h4 className="font-semibold text-white mb-2">
              {allNodes.find((n) => n.id === selectedNode)?.label}
            </h4>
            <div className="text-sm text-slate-400 space-y-1">
              <p><span className="font-mono">Type:</span> {allNodes.find((n) => n.id === selectedNode)?.type.replace("_", " ")}</p>
              <p><span className="font-mono">Connections:</span> {edges.filter((e) => e.from === selectedNode || e.to === selectedNode).length}</p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">How Story Graph Works</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🎭 Node Categories</h3>
            <p>
              The story graph organizes narrative elements into four categories: <span className="text-slate-300">characters</span> (agents in the story),{" "}
              <span className="text-slate-300">events</span> (key story moments),{" "}
              <span className="text-slate-300">plot points</span> (turning moments and revelations), and{" "}
              <span className="text-slate-300">world state</span> (backdrop, logic, and constraints).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔗 Relationship Types</h3>
            <p>
              Edges in the graph represent directed relationships. <span className="text-slate-300">Influences</span> show soft causality (Alice's growth changes her perspective).{" "}
              <span className="text-slate-300">Triggers</span> show hard causality (the fall triggers Alice's adventure).{" "}
              <span className="text-slate-300">Relates_to</span> shows loose connection (characters meeting).{" "}
              <span className="text-slate-300">Caused_by</span> shows explicit causation (trial caused by Queen's madness).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">📊 Line Weight & Opacity</h3>
            <p>
              Edge thickness and opacity represent relationship strength (0.0–1.0). Thicker, more opaque lines indicate stronger influence.
              When you hover over a node, faded lines show weaker connections, and bright lines show direct relationships.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🎯 CharacterOS Integration</h3>
            <p>
              The story graph powers <span className="text-slate-300">canon grounding</span> in CharacterOS. Character chat, scene generation, and
              continuity validation all query the graph to understand: who is connected to whom, what events shaped the character, and what world rules
              constrain behavior. This ensures character responses, memories, and relationships stay canon-coherent.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
