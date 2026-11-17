"use client"

import React, { useState, useRef } from "react"
import NextLink from "next/link"
import { searchPortfolio, SearchResult } from "@/lib/search"

const SUGGESTIONS = [
  "What is his primary tech stack?",
  "What did he build with MongoDB?",
  "Which project used geofencing?",
  "What automated systems has he built?",
  "What was his QA role on PLEDGE?",
  "What are his project roles and ownership?"
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
    setResults(searchPortfolio(suggestion))
    setHasSearched(true)
  }

  const handleReset = () => {
    setQuery("")
    setResults([])
    setHasSearched(false)
    inputRef.current?.focus()
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0E1322]/85 backdrop-blur-xl p-6 md:p-10 shadow-2xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
          <h3 className="text-xs font-mono font-medium text-accent-hover uppercase tracking-widest">
            Ask Shivam&apos;s work
          </h3>
        </div>
        <p className="text-sm text-slate-300">
          Ask a question about projects, technologies or roles. Answers come only from the verified portfolio data on this site.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6" role="search">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about projects, technologies, or architecture..."
          className="w-full bg-white/[0.04] border border-white/10 text-white rounded-xl px-4 py-3.5 pr-28 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-text-tertiary"
          aria-label="Ask about Shivam's work"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          SEARCH
        </button>
      </form>

      <div aria-live="polite">
      {!hasSearched ? (
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
            Suggested Queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs font-mono rounded-full border border-white/10 bg-white/[0.02] text-slate-300 px-3.5 py-2 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 pt-6 border-t border-white/[0.08] animate-reveal-up" style={{ animationDuration: '300ms' }}>
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">VERIFIED ANSWER</h4>
            <button 
              onClick={handleReset}
              className="text-xs font-mono text-cyan-400 hover:text-white transition-colors"
            >
              [ CLEAR SEARCH ]
            </button>
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.slice(0, 2).map((result, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 border-l-4 border-l-cyan-400 shadow-lg">
                  <p className="text-sm text-slate-200 mb-4 leading-relaxed">{result.answer}</p>
                  
                  {result.projectSlug && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t border-white/[0.08]">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-text-tertiary font-mono uppercase">VERIFIED IN</span>
                        <span className="text-xs font-mono text-cyan-300">
                          {result.projectSlug.replace(/-/g, ' ').toUpperCase()}
                          {result.sourceSection && ` / ${result.sourceSection}`}
                        </span>
                      </div>
                      <NextLink 
                        href={`/work/${result.projectSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
                      >
                        VIEW CASE STUDY ↗
                      </NextLink>
                    </div>
                  )}
                </div>
              ))}
              
              {results.length > 2 && (
                <p className="text-mono text-xs text-slate-400">
                  + {results.length - 2} other potential matches found.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-left border-l-4 border-l-slate-600">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"></span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">CORE TECH STACK CONTEXT</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                No direct case study match found for &ldquo;<span className="text-cyan-300 font-mono">{query}</span>&rdquo;. Shivam&apos;s verified production stack is heavily specialized in <strong className="text-white">TypeScript, Next.js, React, Node.js, and MongoDB</strong> for full-stack engineering and enterprise platforms.
              </p>
              <p className="text-[11px] text-slate-400 font-mono mb-3 uppercase tracking-wider">
                EXPLORE VERIFIED TOPICS:
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => handleSuggestionClick("TypeScript")} className="text-xs font-mono rounded-full border border-white/10 bg-white/[0.02] text-slate-300 px-3 py-1 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors">&quot;TypeScript&quot;</button>
                <button onClick={() => handleSuggestionClick("Next.js")} className="text-xs font-mono rounded-full border border-white/10 bg-white/[0.02] text-slate-300 px-3 py-1 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors">&quot;Next.js&quot;</button>
                <button onClick={() => handleSuggestionClick("MongoDB")} className="text-xs font-mono rounded-full border border-white/10 bg-white/[0.02] text-slate-300 px-3 py-1 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors">&quot;MongoDB&quot;</button>
                <button onClick={() => handleSuggestionClick("Automation")} className="text-xs font-mono rounded-full border border-white/10 bg-white/[0.02] text-slate-300 px-3 py-1 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors">&quot;Automation&quot;</button>
                <button onClick={() => handleSuggestionClick("Geofencing")} className="text-xs font-mono rounded-full border border-white/10 bg-white/[0.02] text-slate-300 px-3 py-1 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors">&quot;Geofencing&quot;</button>
                <button onClick={() => handleSuggestionClick("Experience")} className="text-xs font-mono rounded-full border border-white/10 bg-white/[0.02] text-slate-300 px-3 py-1 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors">&quot;Experience&quot;</button>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}
