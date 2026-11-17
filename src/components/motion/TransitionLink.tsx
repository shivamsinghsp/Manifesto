"use client"

import NextLink from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useRef, type ComponentProps, type MouseEvent } from "react"
import { isMotionReduced } from "@/lib/motion-preference"

type Props = ComponentProps<typeof NextLink> & { href: string }

let resolvePending: (() => void) | null = null

/** Resolves the pending view transition once the new route has rendered. */
export function ViewTransitionListener() {
  const pathname = usePathname()
  useEffect(() => {
    if (!resolvePending) return
    const r = resolvePending
    resolvePending = null
    requestAnimationFrame(() => r())
  }, [pathname])
  return null
}

/**
 * Link that morphs elements sharing a `view-transition-name` between routes
 * (e.g. a project card image → the case-study hero). Falls back to a normal
 * navigation where the View Transitions API is unavailable or motion is reduced.
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter()
  const busy = useRef(false)

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return
    const doc = document as Document & {
      startViewTransition?: (cb: () => Promise<void>) => { finished: Promise<void> }
    }
    if (!doc.startViewTransition || isMotionReduced() || busy.current) return
    e.preventDefault()
    busy.current = true
    document.documentElement.dataset.vt = "1"
    const vt = doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          resolvePending = resolve
          router.push(href)
          setTimeout(() => {
            if (resolvePending === resolve) {
              resolvePending = null
              resolve()
            }
          }, 1500)
        })
    )
    vt.finished.finally(() => {
      busy.current = false
      delete document.documentElement.dataset.vt
    })
  }

  return <NextLink href={href} onClick={handle} {...rest} />
}
