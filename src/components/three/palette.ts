"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import * as THREE from "three"

/**
 * Theme colours for WebGL scenes, read from CSS variables (--canvas-*, --c-*).
 * A fresh object is returned when the theme changes, so R3F re-applies material
 * props in place — the canvas is never remounted.
 */
export interface ScenePalette {
  dark: boolean
  ink: THREE.Color
  line: THREE.Color
  accent: THREE.Color
  accent2: THREE.Color
  ground: THREE.Color
  fog: THREE.Color
  /** 0–1 multiplier for glow sprites (low in light mode). */
  glow: number
  /** Additive glow only reads on dark backgrounds. */
  blending: THREE.Blending
  ok: THREE.Color
  warn: THREE.Color
  bad: THREE.Color
  /** Hex strings for canvas-2D label textures and DOM overlays. */
  hex: { ink: string; accent: string; warn: string; bad: string }
}

const read = (style: CSSStyleDeclaration, name: string, fallback: string) =>
  style.getPropertyValue(name).trim() || fallback

const rgbVar = (style: CSSStyleDeclaration, name: string, fallback: string) => {
  const v = style.getPropertyValue(name).trim()
  return v ? `rgb(${v.split(/\s+/).join(",")})` : fallback
}

function build(dark: boolean): ScenePalette {
  const style = typeof window === "undefined" ? null : getComputedStyle(document.documentElement)
  const get = (n: string, f: string) => (style ? read(style, n, f) : f)
  const getRgb = (n: string, f: string) => (style ? rgbVar(style, n, f) : f)
  const ink = get("--canvas-ink", dark ? "#e6ecf5" : "#1b2130")
  const accent = get("--canvas-accent", dark ? "#00e5ff" : "#00758a")
  const warn = getRgb("--c-warning", "#f59e0b")
  const bad = getRgb("--c-error", "#f43f5e")
  return {
    dark,
    ink: new THREE.Color(ink),
    line: new THREE.Color(get("--canvas-line", dark ? "#3b4a66" : "#a9b1bf")),
    accent: new THREE.Color(accent),
    accent2: new THREE.Color(get("--canvas-accent-2", dark ? "#6366f1" : "#4f46e5")),
    ground: new THREE.Color(get("--canvas-ground", dark ? "#0e1322" : "#e7e3d9")),
    fog: new THREE.Color(get("--canvas-fog", dark ? "#0a0e17" : "#f6f4ef")),
    glow: Number(get("--canvas-glow", dark ? "1" : "0.25")) || 0,
    blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
    ok: new THREE.Color(accent),
    warn: new THREE.Color(warn),
    bad: new THREE.Color(bad),
    hex: { ink, accent, warn, bad },
  }
}

/** Resolves a CSS colour (hex or `var(--x)`) against the current theme. */
export function cssColor(value: string, fallback = "#ffffff"): string {
  if (typeof window === "undefined") return fallback
  const m = /^var\((--[\w-]+)\)$/.exec(value.trim())
  if (!m) return value
  return getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || fallback
}

export function useScenePalette(): ScenePalette {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== "light"
  const [palette, setPalette] = useState(() => build(dark))
  useEffect(() => {
    // Wait a frame so the new data-theme variables are computed.
    const id = requestAnimationFrame(() => setPalette(build(dark)))
    return () => cancelAnimationFrame(id)
  }, [dark])
  return palette
}
