"use client"

import React, { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface HeroNode {
  id: string
  label: string
  annotation: string[]
}

const nodes: HeroNode[] = [
  {
    id: "idea",
    label: "IDEA",
    annotation: [
      "Define the problem",
      "before defining the interface.",
    ],
  },
  {
    id: "design",
    label: "DESIGN",
    annotation: [
      "Turn requirements into",
      "usable product flows.",
    ],
  },
  {
    id: "architecture",
    label: "ARCHITECTURE",
    annotation: [
      "Define boundaries,",
      "data and system behavior.",
    ],
  },
  {
    id: "code",
    label: "CODE",
    annotation: [
      "Implement the system",
      "with deliberate constraints.",
    ],
  },
  {
    id: "product",
    label: "PRODUCT",
    annotation: [
      "Ship something",
      "people can actually use.",
    ],
  },
]

export function HeroSystem() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const handleActivate = useCallback((id: string) => setActiveNode(id), [])
  const handleDeactivate = useCallback(() => setActiveNode(null), [])

  return (
    <div
      className="relative w-full h-full min-h-[250px] md:min-h-[400px] flex items-center justify-center font-mono overflow-hidden"
      role="img"
      aria-label="Engineering workflow: Idea, Design, Architecture, Code, Product"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      {/* Connector Line (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="50" y1="10" x2="50" y2="90"
          stroke="var(--color-border)"
          strokeWidth="0.3"
          strokeDasharray="1.5 1"
        />
        {/* Active segment highlight */}
        {activeNode && (() => {
          const idx = nodes.findIndex(n => n.id === activeNode)
          const y1 = 10 + idx * 20
          const y2 = y1 + 20
          return idx < nodes.length - 1 ? (
            <line
              x1="50" y1={y1} x2="50" y2={y2}
              stroke="var(--color-accent)"
              strokeWidth="0.4"
              className="transition-opacity duration-300"
            />
          ) : null
        })()}
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => {
        const isActive = activeNode === node.id
        const yPercent = 10 + index * 20 // 10%, 30%, 50%, 70%, 90%

        return (
          <div
            key={node.id}
            className="absolute left-1/2 flex items-center"
            style={{
              top: `${yPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Node Box */}
            <button
              className={cn(
                "relative flex items-center justify-center border bg-bg px-4 py-2 transition-all duration-300 cursor-crosshair backdrop-blur-sm focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent text-accent z-20"
                  : "border-border text-text-secondary hover:text-text hover:border-text-secondary z-10"
              )}
              onMouseEnter={() => handleActivate(node.id)}
              onMouseLeave={handleDeactivate}
              onFocus={() => handleActivate(node.id)}
              onBlur={handleDeactivate}
              aria-label={`${node.label}: ${node.annotation.join(" ")}`}
            >
              {/* Step indicator */}
              <span className={cn(
                "absolute -left-6 text-[9px] transition-colors duration-300",
                isActive ? "text-accent" : "text-text-tertiary"
              )}>
                {`0${index + 1}`}
              </span>
              <span className="text-[10px] tracking-[0.2em]">{node.label}</span>
            </button>

            {/* Annotation Panel */}
            <div
              className={cn(
                "absolute left-full ml-4 top-1/2 -translate-y-1/2 border bg-surface px-3 py-2 pointer-events-none transition-all duration-300 w-40 hidden md:block",
                isActive
                  ? "opacity-100 translate-x-0 border-border"
                  : "opacity-0 -translate-x-2 border-transparent"
              )}
              aria-hidden={!isActive}
            >
              {node.annotation.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    "block text-[9px] tracking-wide leading-relaxed",
                    i === 0 ? "text-text-secondary" : "text-text-tertiary"
                  )}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
