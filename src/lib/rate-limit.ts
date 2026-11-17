/**
 * Fixed-window, in-memory rate limiter.
 * On serverless platforms each warm instance keeps its own window, so this is best-effort
 * protection layered on top of the honeypot. For strict global limits use a shared store
 * (e.g. Upstash Redis) — see README.
 */
const buckets = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k)
    }
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 }
  }
  if (bucket.count >= limit) {
    return { ok: false, remaining: 0, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  bucket.count++
  return { ok: true, remaining: limit - bucket.count, retryAfterSec: 0 }
}

export function __resetRateLimit() {
  buckets.clear()
}
