"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export interface TimelineItem {
  date?: string
  title: string
  description: string
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

function TimelineNode({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col gap-2 py-8 pl-8 group transition-all duration-[800ms] ease-out-expo",
        isIntersecting ? "opacity-100 translate-x-0" : "opacity-40 -translate-x-4"
      )}
    >
      {/* Draw line to the next item */}
      {!isLast && (
        <div className="absolute left-[0px] top-12 bottom-[-2rem] w-[1px] bg-border overflow-hidden">
          <div className={cn(
            "w-full bg-text-tertiary transition-all duration-1000 ease-out-expo",
            isIntersecting ? "h-full" : "h-0"
          )} />
        </div>
      )}

      {/* The node marker */}
      <div 
        className={cn(
          "absolute left-[-3px] top-10 w-[7px] h-[7px] rounded-none transition-colors duration-700 z-10",
          isIntersecting ? "bg-accent shadow-[0_0_10px_rgba(0,184,212,0.3)]" : "bg-text-tertiary"
        )} 
      />
      
      <span className={cn(
        "text-mono-label transition-colors duration-[800ms]",
        isIntersecting ? "text-text-secondary" : "text-text-tertiary"
      )}>
        {item.date}
      </span>
      <h4 className={cn(
        "text-subheading font-display transition-colors duration-[800ms]",
        isIntersecting ? "text-text" : "text-text-secondary"
      )}>
        {item.title}
      </h4>
      <p className="text-body-large text-text-secondary mt-2 leading-relaxed max-w-2xl">
        {item.description}
      </p>
    </div>
  )
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("pl-4", className)}>
      {items.map((item, index) => (
        <TimelineNode 
          key={index} 
          item={item} 
          isLast={index === items.length - 1} 
        />
      ))}
    </div>
  )
}
