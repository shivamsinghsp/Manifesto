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
  "What are his project roles and ownership?",
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
    <div className="w-full rounded-2xl border border-white/10 bg-[#0E1322]/85 p-6 shadow-2xl backdrop-blur-xl md:p-10">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>
          <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-accent-hover">
            Ask Shivam&apos;s work
          </h3>
        </div>
        <p className="text-sm text-slate-300">
          Ask a question about projects, technologies or roles. Answers come only from the verified
          portfolio data on this site.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6" role="search">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about projects, technologies, or architecture..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-28 font-mono text-sm text-white transition-all placeholder:text-text-tertiary focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          aria-label="Ask about Shivam's work"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute bottom-2 right-2 top-2 rounded-lg bg-cyan-400 px-4 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md transition-all hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          SEARCH
        </button>
      </form>

      <div aria-live="polite">
        {!hasSearched ? (
          <div>
            <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-wider text-slate-400">
              Suggested Queries:
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 font-mono text-xs text-slate-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="animate-reveal-up mt-8 border-t border-white/[0.08] pt-6"
            style={{ animationDuration: "300ms" }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400">
                VERIFIED ANSWER
              </h4>
              <button
                onClick={handleReset}
                className="font-mono text-xs text-cyan-400 transition-colors hover:text-white"
              >
                [ CLEAR SEARCH ]
              </button>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.slice(0, 2).map((result, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-l-4 border-white/10 border-l-cyan-400 bg-white/[0.03] p-5 shadow-lg"
                  >
                    <p className="mb-4 text-sm leading-relaxed text-slate-200">{result.answer}</p>

                    {result.projectSlug && (
                      <div className="flex flex-col justify-between gap-3 border-t border-white/[0.08] pt-3.5 sm:flex-row sm:items-center">
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] uppercase text-text-tertiary">
                            VERIFIED IN
                          </span>
                          <span className="font-mono text-xs text-cyan-300">
                            {result.projectSlug.replace(/-/g, " ").toUpperCase()}
                            {result.sourceSection && ` / ${result.sourceSection}`}
                          </span>
                        </div>
                        <NextLink
                          href={`/work/${result.projectSlug}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 transition-colors hover:text-white"
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
              <div className="rounded-xl border border-l-4 border-white/10 border-l-slate-600 bg-white/[0.03] p-6 text-left">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                    CORE TECH STACK CONTEXT
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-300">
                  No direct case study match found for &ldquo;
                  <span className="font-mono text-cyan-300">{query}</span>&rdquo;. Shivam&apos;s
                  verified production stack is heavily specialized in{" "}
                  <strong className="text-white">
                    TypeScript, Next.js, React, Node.js, and MongoDB
                  </strong>{" "}
                  for full-stack engineering and enterprise platforms.
                </p>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  EXPLORE VERIFIED TOPICS:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSuggestionClick("TypeScript")}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    &quot;TypeScript&quot;
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Next.js")}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    &quot;Next.js&quot;
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("MongoDB")}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    &quot;MongoDB&quot;
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Automation")}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    &quot;Automation&quot;
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Geofencing")}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    &quot;Geofencing&quot;
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Experience")}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    &quot;Experience&quot;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
