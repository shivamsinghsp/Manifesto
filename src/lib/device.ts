export type PerfTier = "low" | "mid" | "high"

let webglCache: boolean | null = null

/** True if a WebGL context can be created. Cached; the probe context is released immediately. */
export function supportsWebGL(): boolean {
  if (webglCache !== null) return webglCache
  try {
    const canvas = document.createElement("canvas")
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null
    webglCache = !!gl
    gl?.getExtension("WEBGL_lose_context")?.loseContext()
  } catch {
    webglCache = false
  }
  return webglCache
}

/** Coarse device capability estimate used to scale particle counts, DPR and effects. */
export function getPerfTier(): PerfTier {
  if (typeof navigator === "undefined") return "mid"
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }
  const cores = nav.hardwareConcurrency || 4
  const mem = nav.deviceMemory ?? 4
  const coarse = window.matchMedia("(pointer: coarse)").matches
  if (nav.connection?.saveData || cores <= 2 || mem <= 2) return "low"
  if (coarse || cores <= 4 || mem <= 4) return "mid"
  return "high"
}

/** DPR cap: ≤1.5 on touch/mid devices, ≤2 on desktop, 1 on low-end. */
export function dprFor(tier: PerfTier): [number, number] {
  const native = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1
  const cap = tier === "low" ? 1 : tier === "mid" ? 1.5 : 2
  return [1, Math.min(native, cap)]
}
