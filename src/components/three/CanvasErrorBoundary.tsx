"use client"

import { Component, type ReactNode } from "react"

/** If WebGL throws (context lost, driver bug), swap to the static fallback instead of crashing the page. */
export class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.warn("[3d] scene disabled:", error instanceof Error ? error.message : error)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
