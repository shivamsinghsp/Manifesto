"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  label: string
  sectionTitle: string
}

interface ProjectExplorerProps {
  tabs: Tab[]
}

export function ProjectExplorer({ tabs }: ProjectExplorerProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.label)
    
    // Find the section element by its text content
    // We look for h2 elements that contain the section title
    const headings = Array.from(document.querySelectorAll("h2"))
    const targetHeading = headings.find(h => 
      h.textContent?.toLowerCase().includes(tab.sectionTitle.toLowerCase())
    )
    
    if (targetHeading) {
      // Scroll the heading into view with some top padding for the sticky header
      const y = targetHeading.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: "smooth" })
      
      // Optional: Add a brief highlight effect to the section
      const section = targetHeading.closest("section")
      if (section) {
        section.classList.add("bg-surface-alt", "transition-colors", "duration-1000")
        setTimeout(() => {
          section.classList.remove("bg-surface-alt")
        }, 1500)
      }
    }
  }

  return (
    <div className="w-full border-t border-border mt-12 pt-8">
      <h3 className="text-mono-label text-text-tertiary mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-text-tertiary inline-block"></span>
        EXPLORE SYSTEM
      </h3>
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "text-[10px] font-mono border px-4 py-2 uppercase tracking-wider transition-all duration-300",
              activeTab === tab.label 
                ? "border-accent text-accent bg-accent/5" 
                : "border-border text-text-secondary hover:border-text-secondary hover:text-text"
            )}
            aria-label={`Scroll to ${tab.sectionTitle}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
