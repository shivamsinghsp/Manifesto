"use client"

import React, { useState, useRef } from "react"
import NextLink from "next/link"
import { searchPortfolio, SearchResult } from "@/lib/search"

const SUGGESTIONS = [
  "What did he build with MongoDB?",
  "Which project used geofencing?",
  "What did he build at KAA?",
  "Which projects did he build solo?",
  "How does Shynr attendance work?"
]

export function WorkAssistant() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return
    
    const res = searchPortfolio(query)
    setResults(res)
    setHasSearched(true)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    // We need to wait for state to update before searching
    setTimeout(() => {
      const res = searchPortfolio(suggestion)
      setResults(res)
      setHasSearched(true)
    }, 50)
  }

  const handleReset = () => {
    setQuery("")
    setResults([])
    setHasSearched(false)
    inputRef.current?.focus()
  }

  return (
    <div className="w-full max-w-3xl border border-border bg-surface relative corner-marks p-6 md:p-10">
      <div className="mb-8">
        <h3 className="text-mono-label text-text-tertiary mb-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-accent inline-block animate-pulse"></span>
          ASK SHIVAM&apos;S WORK
        </h3>
        <p className="text-body-small text-text-secondary">
          A deterministic knowledge system querying verified portfolio data.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about projects, technologies, or architecture..."
          className="w-full bg-surface-alt border border-border text-text px-4 py-4 pr-24 font-mono text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-text-tertiary"
          aria-label="Search query"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-2 top-2 bottom-2 px-4 bg-text text-bg font-mono text-[10px] uppercase tracking-wider hover:bg-accent hover:text-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SEARCH
        </button>
      </form>

      {!hasSearched ? (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-[10px] font-mono border border-border-muted text-text-secondary px-3 py-1 hover:border-accent hover:text-accent transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-8 pt-8 border-t border-border-muted animate-reveal-up" style={{ animationDuration: '300ms' }}>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-mono-label text-text-secondary">RESULTS</h4>
            <button 
              onClick={handleReset}
              className="text-[10px] font-mono text-text-tertiary hover:text-text transition-colors"
            >
              [ CLEAR ]
            </button>
          </div>

          {results.length > 0 ? (
            <div className="space-y-6">
              {results.slice(0, 2).map((result, i) => (
                <div key={i} className="bg-surface-alt border border-border p-5 border-l-2 border-l-accent">
                  <p className="text-body text-text mb-4 leading-relaxed">{result.answer}</p>
                  
                  {result.projectSlug && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-border-muted">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-text-tertiary font-mono uppercase">SOURCE</span>
                        <span className="text-mono-label text-text-secondary">
                          {result.projectSlug.replace(/-/g, ' ').toUpperCase()}
                          {result.sourceSection && ` / ${result.sourceSection}`}
                        </span>
                      </div>
                      <NextLink 
                        href={`/work/${result.projectSlug}`}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-accent hover:text-white transition-colors"
                      >
                        VIEW CASE STUDY ↗
                      </NextLink>
                    </div>
                  )}
                </div>
              ))}
              
              {results.length > 2 && (
                <p className="text-mono text-xs text-text-tertiary">
                  + {results.length - 2} other potential matches found.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-surface-alt border border-border p-6 text-center">
              <span className="text-mono-label text-text-tertiary block mb-4">NO VERIFIED MATCH</span>
              <p className="text-body-small text-text-secondary mb-4">
                I don&apos;t have verified portfolio data for that.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button onClick={() => handleSuggestionClick("Shynr")} className="text-[10px] font-mono border border-border-muted text-text-secondary px-3 py-1 hover:border-accent hover:text-accent transition-colors">&quot;Shynr&quot;</button>
                <button onClick={() => handleSuggestionClick("MongoDB")} className="text-[10px] font-mono border border-border-muted text-text-secondary px-3 py-1 hover:border-accent hover:text-accent transition-colors">&quot;MongoDB&quot;</button>
                <button onClick={() => handleSuggestionClick("geofencing")} className="text-[10px] font-mono border border-border-muted text-text-secondary px-3 py-1 hover:border-accent hover:text-accent transition-colors">&quot;geofencing&quot;</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
