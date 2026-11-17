import * as THREE from "three"

/** Soft radial sprite used for glows and particles (replaces post-processing bloom). */
export function createGlowTexture(size = 128) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.18, "rgba(255,255,255,0.85)")
  g.addColorStop(0.45, "rgba(255,255,255,0.22)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Resolves the next/font family name for a CSS variable (e.g. --font-plex-mono). */
export function cssFontFamily(variable: string, fallback = "monospace") {
  if (typeof document === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return v ? `${v}, ${fallback}` : fallback
}

/** Renders a text label to a texture. Returns the texture and its aspect ratio. */
export function createLabelTexture(
  text: string,
  opts: { color?: string; font?: string; px?: number; pill?: boolean; tracking?: number } = {}
) {
  const px = opts.px ?? 40
  const font = `500 ${px}px ${opts.font ?? "monospace"}`
  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")!
  ctx.font = font
  const pill = opts.pill ?? true
  if (opts.tracking)
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${opts.tracking}px`
  const padX = pill ? px * 0.6 : px * 0.15
  const w = Math.ceil(ctx.measureText(text).width + padX * 2)
  const h = Math.ceil(px * 1.9)
  c.width = w
  c.height = h
  ctx.font = font
  if (opts.tracking)
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${opts.tracking}px`
  if (pill) {
    ctx.fillStyle = "rgba(10,14,23,0.78)"
    ctx.beginPath()
    ctx.roundRect(1, 1, w - 2, h - 2, h / 2)
    ctx.fill()
    ctx.strokeStyle = "rgba(255,255,255,0.14)"
    ctx.lineWidth = 2
    ctx.stroke()
  }
  ctx.fillStyle = opts.color ?? "#F1F3F7"
  ctx.textBaseline = "middle"
  ctx.fillText(text, padX, h / 2 + 1)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return { texture: tex, aspect: w / h }
}
