"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import { ContactShadows, PerformanceMonitor } from "@react-three/drei"
import * as THREE from "three"
import { heroSteps } from "@/content/hero"
import { capabilities } from "@/content/capabilities"
import { heroState, useHeroStep } from "@/lib/hero-store"
import { dprFor, type PerfTier } from "@/lib/device"
import { useScenePalette } from "./palette"

/**
 * "Digital innovation engine" — the hero centrepiece.
 *
 * Five octagonal plates stacked bottom-up (IDEA → PRODUCT) assemble as the hero's step rail
 * advances; a spine carries one data pulse through them, and capability nodes sit on an orbit
 * around the ARCHITECTURE layer, wired back to the core once that layer is built.
 * One draw call per object, no post-processing, a single baked contact shadow.
 */

/** Bottom → top. Radius shrinks as the system is refined. */
const PLATES = [
  { r: 1.55, h: 0.16, y: -1.1 },
  { r: 1.28, h: 0.13, y: -0.5 },
  { r: 1.04, h: 0.15, y: 0.1 },
  { r: 0.8, h: 0.12, y: 0.68 },
  { r: 0.56, h: 0.11, y: 1.22 },
] as const
const ORBIT_R = 2.25
const ORBIT_Y = PLATES[2].y
const SPINE = { bottom: PLATES[0].y - 0.1, top: PLATES[4].y + 0.55 }
const CAMERA_Y = [2.4, 2.0, 1.55, 1.25, 1.7]
const rigScale = (aspect: number) => (aspect < 0.9 ? 0.74 : aspect < 1.2 ? 0.86 : 1)

/** DOM labels drawn over the canvas; the scene writes their position each frame. */
interface Overlay {
  active: HTMLDivElement | null
  hover: HTMLDivElement | null
}

function Engine({
  tier,
  reduced,
  overlay,
  hovered,
  setHovered,
}: {
  tier: PerfTier
  reduced: boolean
  overlay: React.MutableRefObject<Overlay>
  hovered: number | null
  setHovered: React.Dispatch<React.SetStateAction<number | null>>
}) {
  const pal = useScenePalette()
  const step = useHeroStep()
  const invalidate = useThree((s) => s.invalidate)
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height))
  const camera = useThree((s) => s.camera)

  const rig = useRef<THREE.Group>(null)
  const pulse = useRef<THREE.Mesh>(null)
  const plateMats = useRef<THREE.MeshStandardMaterial[]>([])
  const edgeMats = useRef<THREE.LineBasicMaterial[]>([])
  const nodeRefs = useRef<THREE.Mesh[]>([])
  const pointer = useRef({ x: 0, y: 0 })
  const anim = useRef({ built: PLATES.map(() => 0), wires: 0 })
  const size = useThree((s) => s.size)
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const prism = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 8, 1), [])
  const edges = useMemo(() => new THREE.EdgesGeometry(prism), [prism])
  const node = useMemo(() => new THREE.OctahedronGeometry(0.1, 0), [])
  const spineGeo = useMemo(
    () => new THREE.CylinderGeometry(0.018, 0.018, SPINE.top - SPINE.bottom, 6),
    []
  )
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(0.055, 12, 12), [])

  const nodePos = useMemo(
    () =>
      capabilities.map((_, i) => {
        const a = (i / capabilities.length) * Math.PI * 2 + Math.PI / 6
        // Slight vertical wave so the orbit reads as 3D from a low camera.
        return new THREE.Vector3(
          Math.cos(a) * ORBIT_R,
          ORBIT_Y + Math.sin(a * 2) * 0.18,
          Math.sin(a) * ORBIT_R
        )
      }),
    []
  )

  // Orbit path + curved pathways from the core to each node.
  const { orbit, wires, wireMat, orbitMat } = useMemo(() => {
    const orbitMat = new THREE.LineDashedMaterial({
      transparent: true,
      dashSize: 0.08,
      gapSize: 0.08,
      depthWrite: false,
    })
    const pts = Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2 + Math.PI / 6
      return new THREE.Vector3(
        Math.cos(a) * ORBIT_R,
        ORBIT_Y + Math.sin(a * 2) * 0.18,
        Math.sin(a) * ORBIT_R
      )
    })
    const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), orbitMat)
    orbit.computeLineDistances()

    const wireMat = new THREE.LineBasicMaterial({ transparent: true, depthWrite: false })
    const wires = nodePos.map((p) => {
      const start = new THREE.Vector3(p.x, 0, p.z).setLength(PLATES[2].r).setY(ORBIT_Y)
      const mid = start
        .clone()
        .lerp(p, 0.5)
        .setY(ORBIT_Y + 0.35)
      const curve = new THREE.QuadraticBezierCurve3(start, mid, p)
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(24)), wireMat)
    })
    return { orbit, wires, wireMat, orbitMat }
  }, [nodePos])

  useEffect(
    () => () => {
      prism.dispose()
      edges.dispose()
      node.dispose()
      spineGeo.dispose()
      pulseGeo.dispose()
      orbit.geometry.dispose()
      wires.forEach((w) => w.geometry.dispose())
      wireMat.dispose()
      orbitMat.dispose()
      document.body.style.cursor = ""
    },
    [prism, edges, node, spineGeo, pulseGeo, orbit, wires, wireMat, orbitMat]
  )

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduced])

  // Theme → colours, in place (no remount).
  const plateColor = useMemo(
    () =>
      pal.dark
        ? pal.ink.clone().lerp(pal.fog, 0.8)
        : pal.fog.clone().lerp(new THREE.Color("#ffffff"), 0.7),
    [pal]
  )
  useEffect(() => {
    wireMat.color.copy(pal.accent)
    orbitMat.color.copy(pal.line)
    orbitMat.opacity = pal.dark ? 0.7 : 0.9
    invalidate()
  }, [pal, wireMat, orbitMat, invalidate])

  useEffect(() => {
    invalidate()
  }, [step, hovered, invalidate])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const k = reduced ? 1 : 1 - Math.exp(-dt * 4)
    const s = heroState.step
    const a = anim.current
    const t = state.clock.elapsedTime

    // Assemble bottom-up: plates at or below the current step are built.
    PLATES.forEach((_, i) => {
      a.built[i] = THREE.MathUtils.lerp(a.built[i], i <= s ? 1 : 0, k)
      const b = a.built[i]
      const m = plateMats.current[i]
      if (m) m.opacity = 0.05 + b * 0.95
      const e = edgeMats.current[i]
      if (e) {
        e.color.copy(i === s ? pal.accent : pal.line)
        e.opacity = i === s ? 1 : 0.35 + b * 0.45
      }
    })
    a.wires = THREE.MathUtils.lerp(a.wires, s >= 2 ? 1 : 0, k)
    wireMat.opacity = a.wires * (pal.dark ? 0.75 : 0.85)

    nodeRefs.current.forEach((n, i) => {
      if (!n) return
      const target = hovered === i ? 1.6 : 1
      n.scale.setScalar(
        THREE.MathUtils.lerp(n.scale.x, target, reduced ? 1 : 1 - Math.exp(-dt * 10))
      )
      if (!reduced) n.rotation.y = t * 0.6 + i
    })

    if (pulse.current) {
      const span = SPINE.top - SPINE.bottom
      const p = reduced ? 0.62 : (t * 0.28) % 1
      pulse.current.position.y = SPINE.bottom + p * span
      pulse.current.visible = s >= 1
    }

    const g = rig.current
    if (g) {
      // Very slow drift; pointer adds a small parallax. Paused while a node is hovered.
      const drift = reduced || hovered !== null ? 0 : dt * 0.08
      g.rotation.y += drift
      g.rotation.x = reduced
        ? 0
        : THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.06, 3, dt)
      g.position.x = reduced
        ? 0
        : THREE.MathUtils.damp(g.position.x, pointer.current.x * 0.12, 3, dt)
      g.scale.setScalar(rigScale(aspect))
    }
    const camY = CAMERA_Y[s] ?? 1.6
    camera.position.y = reduced ? camY : THREE.MathUtils.damp(camera.position.y, camY, 2, dt)
    camera.lookAt(0, 0.05, 0)
    camera.updateMatrixWorld()

    // Project label anchors to canvas pixels.
    const place = (el: HTMLDivElement | null, v: THREE.Vector3) => {
      if (!el) return
      v.project(camera)
      const x = (v.x * 0.5 + 0.5) * size.width
      const y = (-v.y * 0.5 + 0.5) * size.height
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    }
    if (g) {
      g.updateMatrixWorld()
      const plate = PLATES[s]
      g.localToWorld(tmp.set(0, plate.y, 0))
      tmp.x += plate.r * rigScale(aspect) + 0.3
      place(overlay.current.active, tmp)
      if (hovered !== null && nodeRefs.current[hovered]) {
        nodeRefs.current[hovered].getWorldPosition(tmp)
        place(overlay.current.hover, tmp)
      }
    }
  })

  const over = (i: number) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(i)
    document.body.style.cursor = "pointer"
  }
  const out = () => {
    setHovered(null)
    document.body.style.cursor = ""
  }

  return (
    <>
      <hemisphereLight
        args={[
          pal.dark ? "#f4efe6" : "#ffffff",
          pal.dark ? "#141412" : "#d9d4c8",
          pal.dark ? 0.7 : 1.9,
        ]}
      />
      <directionalLight position={[3.5, 6, 4]} intensity={pal.dark ? 1.4 : 1.7} />
      <directionalLight position={[-4, 1.5, -3]} intensity={0.35} color={pal.accent} />

      <group ref={rig}>
        {PLATES.map((p, i) => (
          <group key={i} position={[0, p.y, 0]} scale={[p.r, p.h, p.r]}>
            <mesh geometry={prism}>
              <meshStandardMaterial
                ref={(m) => {
                  if (m) plateMats.current[i] = m
                }}
                color={plateColor}
                roughness={0.62}
                metalness={0.08}
                transparent
                opacity={0.05}
                depthWrite={false}
                flatShading
              />
            </mesh>
            <lineSegments geometry={edges}>
              <lineBasicMaterial
                ref={(m) => {
                  if (m) edgeMats.current[i] = m
                }}
                color={pal.line}
                transparent
                opacity={0.4}
                toneMapped={false}
              />
            </lineSegments>
          </group>
        ))}

        <mesh geometry={spineGeo} position={[0, (SPINE.top + SPINE.bottom) / 2, 0]}>
          <meshBasicMaterial color={pal.ink} transparent opacity={pal.dark ? 0.3 : 0.4} />
        </mesh>
        <mesh ref={pulse} geometry={pulseGeo}>
          <meshBasicMaterial color={pal.accent} toneMapped={false} />
        </mesh>

        <primitive object={orbit} />
        {wires.map((w, i) => (
          <primitive key={i} object={w} />
        ))}

        {nodePos.map((p, i) => (
          <mesh
            key={capabilities[i].id}
            ref={(m: THREE.Mesh | null) => {
              if (m) nodeRefs.current[i] = m
            }}
            geometry={node}
            position={p}
            onPointerOver={over(i)}
            onPointerOut={out}
            onClick={(e) => {
              e.stopPropagation()
              setHovered((h) => (h === i ? null : i))
            }}
          >
            <meshStandardMaterial
              color={hovered === i ? pal.accent : plateColor}
              emissive={pal.accent}
              emissiveIntensity={hovered === i ? 0.5 : 0}
              roughness={0.4}
              flatShading
            />
          </mesh>
        ))}
      </group>

      {tier !== "low" && (
        <ContactShadows
          position={[0, PLATES[0].y - 0.12, 0]}
          opacity={pal.dark ? 0.55 : 0.32}
          scale={7}
          blur={2.6}
          far={3}
          resolution={256}
          frames={1}
          color={pal.dark ? "#000000" : "#3a3833"}
        />
      )}
      {tier !== "low" && <fog attach="fog" args={[pal.fog, 8, 16]} />}
    </>
  )
}

export default function EngineScene({
  tier,
  reduced,
  active,
}: {
  tier: PerfTier
  reduced: boolean
  active: boolean
}) {
  const [dpr, setDpr] = useState<[number, number]>(() => dprFor(tier))
  const [hovered, setHovered] = useState<number | null>(null)
  const step = useHeroStep()
  const overlay = useRef<Overlay>({ active: null, hover: null })
  const cap = hovered === null ? null : capabilities[hovered]
  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={dpr}
        frameloop={!active ? "never" : reduced ? "demand" : "always"}
        camera={{ position: [0, 2.4, 7.4], fov: 36 }}
        gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <PerformanceMonitor onDecline={() => setDpr([1, 1])} />
        <Engine
          tier={tier}
          reduced={reduced}
          overlay={overlay}
          hovered={hovered}
          setHovered={setHovered}
        />
      </Canvas>
      <div
        ref={(el) => {
          overlay.current.active = el
        }}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
      >
        <p className="flex -translate-y-1/2 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          {`0${step + 1} ${heroSteps[step].label}`}
        </p>
      </div>
      <div
        ref={(el) => {
          overlay.current.hover = el
        }}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
        hidden={!cap}
      >
        {cap && (
          <div className="-translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-md border border-border bg-surface px-3 py-2 shadow-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text">
              {cap.label}
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">{cap.detail}</p>
          </div>
        )}
      </div>
    </div>
  )
}
