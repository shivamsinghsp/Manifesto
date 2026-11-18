"use client"

import { SmoothScroll } from "./SmoothScroll"
import { ScrollEffects } from "./ScrollEffects"
import { Cursor } from "./Cursor"
import { Preloader } from "./Preloader"
import { RouteTransition } from "./RouteTransition"
import { ViewTransitionListener } from "./TransitionLink"
import { LazyCommandPalette } from "@/components/command/LazyCommandPalette"

/** Global client-only enhancements. Everything here is optional polish. */
export function ClientChrome() {
  return (
    <>
      <SmoothScroll />
      <ScrollEffects />
      <ViewTransitionListener />
      <RouteTransition />
      <Preloader />
      <Cursor />
      <LazyCommandPalette />
      <div aria-hidden="true" className="grain" />
    </>
  )
}
