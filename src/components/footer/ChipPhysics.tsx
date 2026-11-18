"use client"

import Matter from "matter-js"
import { useEffect, useRef, useState } from "react"
import type { PerfTier } from "@/lib/device"

/**
 * Drag-and-throw tech chips (matter-js). DOM chips are positioned from physics bodies,
 * so text stays crisp and themed. Paused when offscreen or the tab is hidden.
 */
export default function ChipPhysics({ chips, tier }: { chips: string[]; tier: PerfTier }) {
  const box = useRef<HTMLDivElement>(null)
  const chipEls = useRef<(HTMLSpanElement | null)[]>([])
  const [drop, setDrop] = useState(0)
  const list = tier === "low" ? chips.slice(0, 10) : chips

  useEffect(() => {
    const el = box.current
    if (!el) return
    const { Engine, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter
    const W = el.clientWidth
    const H = el.clientHeight
    const engine = Engine.create({ gravity: { x: 0, y: 1 } })
    const wall = { isStatic: true, render: { visible: false } }
    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H + 30, W * 2, 60, wall),
      Bodies.rectangle(-30, H / 2, 60, H * 3, wall),
      Bodies.rectangle(W + 30, H / 2, 60, H * 3, wall),
    ])
    const bodies = list.map((_, i) => {
      const node = chipEls.current[i]
      const w = node?.offsetWidth ?? 90
      const h = node?.offsetHeight ?? 34
      const b = Bodies.rectangle(40 + Math.random() * (W - 80), -60 - i * 45, w, h, {
        chamfer: { radius: h / 2 },
        restitution: 0.35,
        friction: 0.3,
        frictionAir: 0.012,
      })
      Body.setAngle(b, (Math.random() - 0.5) * 0.6)
      return b
    })
    Composite.add(engine.world, bodies)

    const mouse = Mouse.create(el)
    // Let the page scroll with the wheel / touch outside drags.
    const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener }
    m.element.removeEventListener("wheel", m.mousewheel)
    m.element.removeEventListener("mousewheel", m.mousewheel)
    const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2 } })
    Composite.add(engine.world, mc)

    let raf = 0
    let visible = true
    let last = performance.now()
    const step = (t: number) => {
      const dt = Math.min(32, t - last)
      last = t
      Engine.update(engine, dt)
      bodies.forEach((b, i) => {
        const node = chipEls.current[i]
        if (node)
          node.style.transform = `translate(${b.position.x - node.offsetWidth / 2}px, ${b.position.y - node.offsetHeight / 2}px) rotate(${b.angle}rad)`
      })
      raf = visible && !document.hidden ? requestAnimationFrame(step) : 0
    }
    const resume = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(step)
      }
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      resume()
    })
    io.observe(el)
    document.addEventListener("visibilitychange", resume)
    resume()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener("visibilitychange", resume)
      Composite.clear(engine.world, false)
      Engine.clear(engine)
      Mouse.clearSourceEvents(mouse)
    }
  }, [drop, list])

  return (
    <div>
      <div
        ref={box}
        aria-hidden="true"
        className="relative h-[300px] cursor-grab touch-pan-y overflow-hidden rounded-card border border-border bg-surface/60 active:cursor-grabbing sm:h-[340px]"
      >
        {list.map((c, i) => (
          <span
            key={`${drop}-${c}`}
            ref={(n) => {
              chipEls.current[i] = n
            }}
            className="absolute left-0 top-0 select-none whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-text shadow-md will-change-transform"
            style={{ transform: "translate(-200px,-200px)" }}
          >
            {c}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setDrop((d) => d + 1)}
        className="mt-3 inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-border bg-chip px-4 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-text"
      >
        ↻ Redrop
      </button>
    </div>
  )
}
