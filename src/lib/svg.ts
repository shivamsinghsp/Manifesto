import { readFileSync } from "node:fs"
import path from "node:path"

const cache = new Map<string, string>()

/**
 * Reads a static SVG from /public at build time so it can be inlined and inherit
 * theme CSS variables. Only for first-party files under /public/diagrams.
 */
export function readPublicSvg(src: string): string {
  if (!src.startsWith("/diagrams/") || !src.endsWith(".svg") || src.includes("..")) {
    throw new Error(`readPublicSvg: refusing to inline "${src}"`)
  }
  const hit = cache.get(src)
  if (hit) return hit
  const raw = readFileSync(path.join(process.cwd(), "public", src), "utf8")
  // Strip XML prolog/comments; files are authored in this repo.
  const svg = raw
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim()
  cache.set(src, svg)
  return svg
}
