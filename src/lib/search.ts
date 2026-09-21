import { portfolioKnowledge, KnowledgeEntry } from "@/data/portfolio-knowledge"

export interface SearchResult extends KnowledgeEntry {
  score: number
}

// Minimal stop words to ignore
const STOP_WORDS = new Set(["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with", "about", "did", "he", "build", "how", "what", "which", "where", "who", "show", "me", "tell"])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word))
}

export function searchPortfolio(query: string): SearchResult[] {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) return []

  const scoredEntries = portfolioKnowledge.map(entry => {
    let score = 0
    
    // Check against predefined keywords
    for (const keyword of entry.keywords) {
      const keywordTokens = tokenize(keyword)
      // Exact keyword match gets high points
      if (query.toLowerCase().includes(keyword.toLowerCase())) {
        score += 10
      }
      
      // Token overlap
      for (const token of queryTokens) {
        if (keywordTokens.includes(token)) {
          score += 3
        } else if (keywordTokens.some(k => k.includes(token) || token.includes(k))) {
          score += 1 // Partial match
        }
      }
    }

    // Check against answer content
    const answerTokens = tokenize(entry.answer)
    for (const token of queryTokens) {
      if (answerTokens.includes(token)) {
        score += 1
      }
    }

    return { ...entry, score }
  })

  // Filter out zero-score entries and sort by score descending
  return scoredEntries
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
}
