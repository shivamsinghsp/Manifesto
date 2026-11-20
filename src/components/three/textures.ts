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

/** Resolves the next/font family name for a CSS variable (e.g. --font-geist-mono). */
export function cssFontFamily(variable: string, fallback = "monospace") {
  if (typeof document === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return v ? `${v}, ${fallback}` : fallback
}

/** Renders a text label to a texture. Returns the texture and its aspect ratio. */
export function createLabelTexture(
  text: string,
  opts: {
    color?: string
    font?: string
    px?: number
    pill?: boolean
    tracking?: number
    pillBg?: string
    pillBorder?: string
    dotColor?: string
    fontWeight?: string | number
  } = {}
) {
  const logicalPx = opts.px ?? 40
  const weight = opts.fontWeight ?? 600
  // Supersample 2x on canvas for crisp, razor-sharp text in 3D WebGL
  const scale = 2
  const scaledPx = logicalPx * scale
  const font = `${weight} ${scaledPx}px ${opts.font ?? "monospace"}`

  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")!
  ctx.font = font

  const pill = opts.pill ?? true
  const hasDot = Boolean(opts.dotColor)

  if (opts.tracking) {
    ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${opts.tracking * scale}px`
  }

  // Padding and dimensions
  const padLeft = pill ? (hasDot ? scaledPx * 1.05 : scaledPx * 0.7) : scaledPx * 0.2
  const padRight = pill ? scaledPx * 0.7 : scaledPx * 0.2
  const textWidth = ctx.measureText(text).width
  const w = Math.ceil(textWidth + padLeft + padRight)
  const h = Math.ceil(scaledPx * 1.9)

  c.width = w
  c.height = h

  // Reset context properties after dimension change
  ctx.font = font
  if (opts.tracking) {
    ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      `${opts.tracking * scale}px`
  }

  if (pill) {
    // Fill pill background
    ctx.fillStyle = opts.pillBg ?? "rgba(10,14,23,0.92)"
    ctx.beginPath()
    ctx.roundRect(scale, scale, w - scale * 2, h - scale * 2, (h - scale * 2) / 2)
    ctx.fill()

    // Stroke crisp border
    ctx.strokeStyle = opts.pillBorder ?? "rgba(255,255,255,0.2)"
    ctx.lineWidth = Math.max(1, 1.5 * scale)
    ctx.stroke()

    // Vibrant accent dot matching the orbit ring / technology group
    if (hasDot && opts.dotColor) {
      const dotRadius = scaledPx * 0.2
      const dotX = padLeft * 0.42
      const dotY = h / 2
      ctx.fillStyle = opts.dotColor
      ctx.beginPath()
      ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Draw high-contrast label text
  ctx.fillStyle = opts.color ?? "#F1F3F7"
  ctx.textBaseline = "middle"
  ctx.fillText(text, padLeft, h / 2 + 1)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.generateMipmaps = true

  return { texture: tex, aspect: w / h }
}
