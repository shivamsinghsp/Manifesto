import { portfolioKnowledge, KnowledgeEntry } from "@/content/knowledge"

export interface SearchResult extends KnowledgeEntry {
  score: number
}

// Comprehensive stop words to ignore conversational filler and generic portfolio terms
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "cannot", "could", "did", "didn't",
  "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for",
  "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having",
  "he", "he'd", "he'll", "he's", "her", "here", "hers", "herself", "him", "himself",
  "his", "how", "i", "if", "in", "into", "is", "isn't", "it", "its", "itself",
  "just", "let", "me", "more", "most", "my", "myself", "no", "nor", "not", "of",
  "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves",
  "out", "over", "own", "same", "she", "should", "so", "some", "such", "than",
  "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these",
  "they", "this", "those", "through", "to", "too", "under", "until", "up", "very",
  "was", "wasn't", "we", "were", "weren't", "what", "when", "where", "which",
  "while", "who", "whom", "why", "with", "won't", "would", "you", "your", "yours",
  // Generic conversation & portfolio words
  "shivam", "work", "works", "worked", "working", "project", "projects",
  "built", "build", "building", "tell", "show", "give", "know", "related",
  "done", "thing", "things", "etc", "like", "use", "used", "using", "also"
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Replace punctuation with space
    .split(/\s+/)
    .filter(word => word.length >= 2 && !STOP_WORDS.has(word))
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function searchPortfolio(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim()
  const queryTokens = tokenize(query)
  
  if (queryTokens.length === 0) return []

  const scoredEntries = portfolioKnowledge.map(entry => {
    let score = 0
    let matchedKeywordCount = 0

    // 1. Check exact phrase / keyword match with whole-word boundaries
    for (const keyword of entry.keywords) {
      const kwLower = keyword.toLowerCase().trim()
      const kwRegex = new RegExp(`\\b${escapeRegex(kwLower)}\\b`, "i")
      
      if (kwRegex.test(normalizedQuery)) {
        score += 15
        matchedKeywordCount++
      }

      // Check token-level overlap against keyword tokens
      const keywordTokens = tokenize(keyword)
      for (const token of queryTokens) {
        if (keywordTokens.includes(token)) {
          score += 10
          matchedKeywordCount++
        } else if (token.length >= 4) {
          // Safe stem / prefix matching for tokens with 4+ characters
          for (const kt of keywordTokens) {
            if (kt.length >= 4 && (kt.startsWith(token) || token.startsWith(kt))) {
              score += 5
              matchedKeywordCount++
            }
          }
        }
      }
    }

    // 2. Check token occurrence in answer text
    const answerTokens = tokenize(entry.answer)
    for (const token of queryTokens) {
      if (answerTokens.includes(token)) {
        score += 2
      }
    }

    // Require either a direct keyword match or a substantial score threshold
    const isValidMatch = matchedKeywordCount > 0 && score >= 5

    return { ...entry, score: isValidMatch ? score : 0 }
  })

  // Filter out zero-score entries and sort by score descending
  return scoredEntries
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
}
