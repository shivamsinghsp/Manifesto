"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import { ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause } from "lucide-react"
import { classifyGeofence, fromLocalMeters, haversineMeters, type GeofenceStatus } from "@/lib/geo"
import { useCanvasGovernor } from "@/components/three/useCanvasGovernor"
import { useLazyMount } from "@/components/three/useLazyMount"
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary"
import { getPerfTier, type PerfTier } from "@/lib/device"
import { useReducedMotion } from "@/lib/motion-preference"
import { cn } from "@/lib/utils"
import { GeofencingLab } from "./GeofencingLab"

const GeoScene = dynamic(() => import("@/components/three/GeoScene"), { ssr: false })

/** Reference office used by the model (Kanpur). */
export const OFFICE = { lat: 26.4499, lon: 80.3319 }
const MAP_HALF_M = 480
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

const STATUS: Record<GeofenceStatus, { label: string; tone: string; Icon: typeof ShieldCheck; note: string }> = {
  in_range: { label: "Inside geofence", tone: "text-accent-hover border-accent/40 bg-accent/10", Icon: ShieldCheck, note: "Attendance would be accepted." },
  near_edge: { label: "Near boundary", tone: "text-amber-300 border-amber-400/40 bg-amber-400/10", Icon: AlertTriangle, note: "Accepted, but inside the GPS-jitter caution zone." },
  outside: { label: "Outside geofence", tone: "text-rose-300 border-rose-400/40 bg-rose-400/10", Icon: ShieldAlert, note: "Attendance would be rejected." },
}

export function GeoLab() {
  const [radius, setRadius] = useState(150)
  const [user, setUser] = useState({ x: 90, y: -60 })
  const [walking, setWalking] = useState(false)
  const { ref, inView, active } = useCanvasGovernor<HTMLDivElement>("150px")
  const mount = useLazyMount(inView)
  const reduced = useReducedMotion()
  const [tier, setTier] = useState<PerfTier>("mid")
  useEffect(() => setTier(getPerfTier()), [])

  const userLatLon = fromLocalMeters(user.x, user.y, OFFICE)
  const distance = haversineMeters(OFFICE, userLatLon)
  const status = classifyGeofence(distance, radius)
  const meta = STATUS[status]
  const delta = Math.round(distance - radius)

  const moveUser = useCallback((x: number, y: number) => {
    setWalking(false)
    setUser({ x: clamp(x, -MAP_HALF_M, MAP_HALF_M), y: clamp(y, -MAP_HALF_M, MAP_HALF_M) })
  }, [])
  const changeRadius = useCallback((r: number) => setRadius(clamp(r, 25, 400)), [])

  const preset = (kind: "center" | "inside" | "edge" | "outside") => {
    setWalking(false)
    const a = Math.PI / 4
    const k = kind === "center" ? 0 : kind === "inside" ? 0.5 : kind === "edge" ? 0.93 : 1.35
    const d = Math.min(MAP_HALF_M - 10, radius * k + (kind === "outside" ? 10 : 0))
    setUser({ x: Math.round(Math.cos(a) * d), y: Math.round(Math.sin(a) * d) })
  }

  // Walk simulation: orbit the office while the distance oscillates across the boundary
  const angle = useRef(0)
  useEffect(() => {
    if (!walking) return
    let raf = 0, last = performance.now()
    const step = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      angle.current = (angle.current + dt * 0.45) % (Math.PI * 2)
      const d = radius * (0.85 + 0.45 * Math.sin(angle.current * 1.5))
      setUser({ x: Math.round(Math.cos(angle.current) * d), y: Math.round(Math.sin(angle.current) * d) })
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [walking, radius])

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const s = e.shiftKey ? 50 : 10
    const map: Record<string, [number, number]> = { ArrowUp: [0, s], ArrowDown: [0, -s], ArrowLeft: [-s, 0], ArrowRight: [s, 0] }
    if (map[e.key]) {
      e.preventDefault()
      moveUser(user.x + map[e.key][0], user.y + map[e.key][1])
    } else if (e.key === "+" || e.key === "=") { e.preventDefault(); changeRadius(radius + 10) }
    else if (e.key === "-") { e.preventDefault(); changeRadius(radius - 10) }
  }

  // Announce status changes only (not every metre)
  const [announce, setAnnounce] = useState("")
  useEffect(() => setAnnounce(`${meta.label}. ${meta.note}`), [meta.label, meta.note])

  if (mount === "unsupported") {
    return (
      <div>
        <p className="mb-4 font-mono text-xs text-text-tertiary">3D view unavailable on this device — showing the 2D model.</p>
        <GeofencingLab />
      </div>
    )
  }

  const btn = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 font-mono text-xs text-text-secondary transition-colors hover:border-accent/50 hover:text-text"

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0E131F]/90 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Map */}
        <div
          ref={ref}
          tabIndex={0}
          role="application"
          aria-label="Geofence map. Arrow keys move the user by 10 metres (Shift for 50). Plus and minus change the radius."
          aria-describedby="geo-readout"
          onKeyDown={onKey}
          className="relative h-[360px] bg-[#070A12] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-hover sm:h-[440px] lg:col-span-8 lg:h-auto lg:min-h-[600px]"
        >
          {mount === "ready" ? (
            <CanvasErrorBoundary fallback={<div className="p-6"><GeofencingLab /></div>}>
              <GeoScene
                user={user}
                radius={radius}
                status={status}
                distance={distance}
                onUserChange={moveUser}
                onRadiusChange={changeRadius}
                reduced={reduced}
                active={active}
                tier={tier}
              />
            </CanvasErrorBoundary>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-blueprint">
              <span className="font-mono text-xs tracking-widest text-text-tertiary">LOADING 3D MAP…</span>
            </div>
          )}
          <p className="pointer-events-none absolute bottom-3 left-3 right-3 font-mono text-[11px] leading-relaxed text-text-tertiary">
            Drag the pin or tap the map to move · drag the edge handle to resize
          </p>
        </div>

        {/* Readout + controls */}
        <div className="flex flex-col gap-6 border-t border-white/[0.08] p-5 sm:p-6 lg:col-span-4 lg:border-l lg:border-t-0">
          <div id="geo-readout">
            <div className={cn("mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wider", meta.tone)}>
              <meta.Icon className="h-4 w-4" aria-hidden="true" />
              {meta.label}
            </div>
            <p className="mb-5 text-body-small text-text-secondary">{meta.note}</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 font-mono">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-tertiary">Haversine distance</dt>
                <dd className="text-2xl text-text">{distance.toFixed(1)}<span className="ml-1 text-sm text-text-tertiary">m</span></dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-tertiary">Radius</dt>
                <dd className="text-2xl text-text">{radius}<span className="ml-1 text-sm text-text-tertiary">m</span></dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-tertiary">{delta > 0 ? "Over by" : "Margin"}</dt>
                <dd className={cn("text-lg", delta > 0 ? "text-rose-300" : "text-text")}>{Math.abs(delta)} m</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-text-tertiary">Offset (E, N)</dt>
                <dd className="text-lg text-text">{user.x}, {user.y}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[11px] uppercase tracking-wider text-text-tertiary">User lat / lon</dt>
                <dd className="text-sm text-text-secondary">{userLatLon.lat.toFixed(6)}, {userLatLon.lon.toFixed(6)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[11px] uppercase tracking-wider text-text-tertiary">Office lat / lon</dt>
                <dd className="text-sm text-text-secondary">{OFFICE.lat.toFixed(6)}, {OFFICE.lon.toFixed(6)}</dd>
              </div>
            </dl>
          </div>

          <div>
            <label htmlFor="geo-radius" className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              <span>Allowed radius</span>
              <span className="text-text">{radius} m</span>
            </label>
            <input
              id="geo-radius"
              type="range"
              min={25}
              max={400}
              step={5}
              value={radius}
              onChange={(e) => changeRadius(Number(e.target.value))}
              className="h-11 w-full accent-[#00E5FF]"
            />
          </div>

          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">Scenarios</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={btn} onClick={() => preset("center")}>At office</button>
              <button type="button" className={btn} onClick={() => preset("inside")}>Inside</button>
              <button type="button" className={btn} onClick={() => preset("edge")}>Near edge</button>
              <button type="button" className={btn} onClick={() => preset("outside")}>Outside</button>
              <button type="button" className={cn(btn, "col-span-2", walking && "border-accent/60 text-accent-hover")} aria-pressed={walking} onClick={() => setWalking((w) => !w)}>
                {walking ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                {walking ? "Stop walk simulation" : "Simulate a walk"}
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">Move user (10 m)</p>
            <div className="grid w-[156px] grid-cols-3 gap-1.5">
              <span />
              <button type="button" className={btn} aria-label="Move north 10 metres" onClick={() => moveUser(user.x, user.y + 10)}>↑</button>
              <span />
              <button type="button" className={btn} aria-label="Move west 10 metres" onClick={() => moveUser(user.x - 10, user.y)}>←</button>
              <button type="button" className={btn} aria-label="Move south 10 metres" onClick={() => moveUser(user.x, user.y - 10)}>↓</button>
              <button type="button" className={btn} aria-label="Move east 10 metres" onClick={() => moveUser(user.x + 10, user.y)}>→</button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08] bg-white/[0.02] p-5 font-mono text-xs leading-relaxed text-text-secondary sm:p-6">
        <p className="mb-1 text-[11px] uppercase tracking-wider text-text-tertiary">Validation (same rule as Shynr&apos;s attendance API)</p>
        <p>a = sin²(Δφ/2) + cos φ₁ · cos φ₂ · sin²(Δλ/2) &nbsp;·&nbsp; d = 2R · atan2(√a, √(1−a)), R = 6 371 km</p>
        <p className="mt-1">accept ⇔ d ≤ radius · caution zone ⇔ d ≥ 0.82 · radius or radius − d ≤ 20 m</p>
      </div>
      <p className="sr-only" aria-live="polite">{announce}</p>
    </div>
  )
}
