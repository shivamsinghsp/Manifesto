"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import * as THREE from "three"
import { heroSteps } from "@/content/hero"
import { heroState } from "@/lib/hero-store"
import { dprFor, type PerfTier } from "@/lib/device"
import { createGlowTexture, createLabelTexture, cssFontFamily } from "./textures"
import { useScenePalette } from "./palette"

interface SceneProps {
  tier: PerfTier
  reduced: boolean
}

/** Node layout adapts to the canvas aspect: vertical zig-zag on portrait, diagonal on landscape. */
function useNodePositions() {
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height))
  return useMemo(() => {
    const portrait = aspect < 1.15
    return portrait
      ? [
          new THREE.Vector3(-0.85, 2.15, -0.4),
          new THREE.Vector3(0.85, 1.05, 0.5),
          new THREE.Vector3(-0.45, 0, -0.2),
          new THREE.Vector3(0.9, -1.05, 0.4),
          new THREE.Vector3(-0.55, -2.15, -0.3),
        ]
      : [
          new THREE.Vector3(-3.4, 1.3, -0.4),
          new THREE.Vector3(-1.7, -0.3, 0.5),
          new THREE.Vector3(0, 0.7, -0.3),
          new THREE.Vector3(1.7, -0.5, 0.4),
          new THREE.Vector3(3.4, 0.9, -0.2),
        ]
  }, [aspect])
}

function SystemGraph({ tier, reduced }: SceneProps) {
  const positions = useNodePositions()
  const pal = useScenePalette()
  const CYAN = pal.accent
  const WHITE = pal.ink
  const DIM = pal.line
  const LABEL_DIM = pal.ink
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(positions, false, "catmullrom", 0.5),
    [positions]
  )
  const glow = useMemo(() => createGlowTexture(), [])
  const [fontReady, setFontReady] = useState(false)
  useEffect(() => {
    let alive = true
    document.fonts.ready.then(() => alive && setFontReady(true))
    return () => {
      alive = false
    }
  }, [])
  const labels = useMemo(() => {
    if (!fontReady) return null
    const font = cssFontFamily("--font-plex-mono")
    return heroSteps.map((s, i) =>
      createLabelTexture(`0${i + 1}  ${s.label}`, { font, px: 34, pill: false, tracking: 5 })
    )
  }, [fontReady])
  useEffect(() => () => labels?.forEach((l) => l.texture.dispose()), [labels])

  // Base link + "data already flowed" link (draw range grows with scroll progress)
  const TUBE_SEG = 240,
    RADIAL = 6
  const tubeBase = useMemo(
    () => new THREE.TubeGeometry(curve, TUBE_SEG, 0.012, RADIAL, false),
    [curve]
  )
  const tubeLit = useMemo(
    () => new THREE.TubeGeometry(curve, TUBE_SEG, 0.02, RADIAL, false),
    [curve]
  )

  // Particle LUT: precomputed points along the curve for cheap per-frame sampling
  const COUNT = tier === "low" ? 60 : tier === "mid" ? 120 : 220
  const LUT_SIZE = 512
  const lut = useMemo(() => curve.getSpacedPoints(LUT_SIZE - 1), [curve])
  const particles = useMemo(() => {
    const seeds = new Float32Array(COUNT * 4)
    for (let i = 0; i < COUNT; i++) {
      seeds[i * 4] = Math.random() // offset
      seeds[i * 4 + 1] = 0.035 + Math.random() * 0.05 // speed
      seeds[i * 4 + 2] = (Math.random() - 0.5) * 0.14 // jitter x
      seeds[i * 4 + 3] = (Math.random() - 0.5) * 0.14 // jitter y
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3))
    return { seeds, geo }
  }, [COUNT])

  const dust = useMemo(() => {
    const n = tier === "high" ? 280 : tier === "mid" ? 110 : 0
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9
      arr[i * 3 + 2] = -2 - Math.random() * 6
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3))
    return geo
  }, [tier])

  useEffect(
    () => () => {
      glow.dispose()
      tubeBase.dispose()
      tubeLit.dispose()
      particles.geo.dispose()
      dust.dispose()
    },
    [glow, tubeBase, tubeLit, particles, dust]
  )

  const nodeRefs = useRef<(THREE.Group | null)[]>([])
  const haloRefs = useRef<(THREE.Sprite | null)[]>([])
  const shellRefs = useRef<(THREE.Mesh | null)[]>([])
  const labelRefs = useRef<(THREE.Sprite | null)[]>([])
  const pointsRef = useRef<THREE.Points>(null)
  const dustRef = useRef<THREE.Points>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const smoothProgress = useRef(heroState.progress)
  const lookTarget = useRef(new THREE.Vector3())
  const { camera, invalidate } = useThree()

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    // In demand mode (reduced motion) re-render when the step changes via scroll.
    let last = heroState.step
    const id = reduced
      ? window.setInterval(() => {
          if (heroState.step !== last) {
            last = heroState.step
            invalidate()
          }
        }, 150)
      : 0
    return () => {
      window.removeEventListener("pointermove", onMove)
      clearInterval(id)
    }
  }, [reduced, invalidate])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    const target = reduced ? (heroState.step + 0.5) / 5 : heroState.progress
    smoothProgress.current +=
      (target - smoothProgress.current) * (reduced ? 1 : 1 - Math.exp(-dt * 4))
    const p = smoothProgress.current
    const activeIdx = heroState.step

    // Lit portion of the link follows progress
    const litIndexCount = tubeLit.index ? tubeLit.index.count : 0
    const segs = Math.floor(Math.min(1, p * 1.04) * TUBE_SEG)
    tubeLit.setDrawRange(0, Math.floor((segs * RADIAL * 6) / 3) * 3 || 0)
    if (litIndexCount === 0) tubeLit.setDrawRange(0, 0)

    // Nodes
    positions.forEach((_, i) => {
      const isActive = i === activeIdx
      const passed = i < activeIdx
      const g = nodeRefs.current[i]
      if (g) {
        const s = THREE.MathUtils.damp(g.scale.x, isActive ? 1.45 : 1, 6, dt)
        g.scale.setScalar(s)
        if (!reduced) g.position.y = positions[i].y + Math.sin(t * 0.8 + i * 1.3) * 0.05
      }
      const halo = haloRefs.current[i]
      if (halo) {
        const m = halo.material as THREE.SpriteMaterial
        m.opacity = THREE.MathUtils.damp(
          m.opacity,
          (isActive ? 0.95 : passed ? 0.45 : 0.22) * pal.glow,
          6,
          dt
        )
        m.color.lerp(isActive || passed ? CYAN : WHITE, 0.1)
      }
      const shell = shellRefs.current[i]
      if (shell) {
        if (!reduced) {
          shell.rotation.x += dt * (isActive ? 0.9 : 0.25)
          shell.rotation.y += dt * (isActive ? 0.6 : 0.18)
        }
        const mat = shell.material as THREE.MeshBasicMaterial
        mat.opacity = THREE.MathUtils.damp(mat.opacity, isActive ? 0.9 : 0.28, 6, dt)
        mat.color.lerp(isActive ? CYAN : passed ? CYAN : DIM, 0.12)
      }
      const label = labelRefs.current[i]
      if (label) {
        const m = label.material as THREE.SpriteMaterial
        m.color.lerp(isActive ? CYAN : LABEL_DIM, 0.15)
        m.opacity = THREE.MathUtils.damp(m.opacity, isActive ? 1 : 0.75, 6, dt)
      }
    })

    // Particles flow along the curve; speed rises slightly with scroll
    const pts = pointsRef.current
    if (pts && !reduced) {
      const arr = (pts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
      const { seeds } = particles
      const boost = 1 + p * 0.8
      for (let i = 0; i < COUNT; i++) {
        const u = (seeds[i * 4] + t * seeds[i * 4 + 1] * boost) % 1
        const f = u * (LUT_SIZE - 1)
        const a = lut[Math.floor(f)],
          b = lut[Math.min(LUT_SIZE - 1, Math.floor(f) + 1)]
        const k = f - Math.floor(f)
        arr[i * 3] = a.x + (b.x - a.x) * k + seeds[i * 4 + 2]
        arr[i * 3 + 1] = a.y + (b.y - a.y) * k + seeds[i * 4 + 3]
        arr[i * 3 + 2] = a.z + (b.z - a.z) * k
      }
      pts.geometry.attributes.position.needsUpdate = true
    } else if (pts && reduced && !pts.userData.placed) {
      const arr = (pts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        const q = lut[Math.floor(particles.seeds[i * 4] * (LUT_SIZE - 1))]
        arr.set([q.x, q.y, q.z], i * 3)
      }
      pts.geometry.attributes.position.needsUpdate = true
      pts.userData.placed = true
    }
    if (dustRef.current && !reduced) dustRef.current.rotation.y = t * 0.015

    // Camera rig: drift toward the active node + pointer parallax
    const focus = positions[activeIdx]
    const camX = focus.x * 0.2 + (reduced ? 0 : pointer.current.x * 0.4)
    const camY = focus.y * 0.12 - (reduced ? 0 : pointer.current.y * 0.25)
    const aspect = state.size.width / Math.max(1, state.size.height)
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      aspect < 1.15 ? 7.6 * Math.max(1, 0.95 / aspect) : 8.2,
      3,
      dt
    )
    camera.position.x = THREE.MathUtils.damp(camera.position.x, camX, 2.5, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, camY, 2.5, dt)
    lookTarget.current.lerp(
      new THREE.Vector3(focus.x * 0.25, focus.y * 0.15, 0),
      reduced ? 1 : 1 - Math.exp(-dt * 3)
    )
    camera.lookAt(lookTarget.current)
  })

  return (
    <>
      <fog attach="fog" args={[pal.fog, 7, 17]} />
      <mesh geometry={tubeBase}>
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={pal.dark ? 0.18 : 0.3}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={tubeLit}>
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.75}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {positions.map((pos, i) => (
        <group
          key={i}
          position={pos}
          ref={(el) => {
            nodeRefs.current[i] = el
          }}
        >
          <mesh>
            <sphereGeometry args={[0.085, 20, 20]} />
            <meshBasicMaterial color={WHITE} toneMapped={false} />
          </mesh>
          <mesh
            ref={(el) => {
              shellRefs.current[i] = el
            }}
          >
            <icosahedronGeometry args={[0.32, 0]} />
            <meshBasicMaterial color={DIM} wireframe transparent opacity={0.3} depthWrite={false} />
          </mesh>
          <sprite
            ref={(el) => {
              haloRefs.current[i] = el
            }}
            scale={1.3}
          >
            <spriteMaterial
              map={glow}
              color={WHITE}
              transparent
              opacity={0.25 * pal.glow}
              depthWrite={false}
              blending={pal.blending}
              toneMapped={false}
            />
          </sprite>
          {labels && (
            <sprite
              ref={(el) => {
                labelRefs.current[i] = el
              }}
              position={[0.45 + (0.2 * labels[i].aspect) / 2, 0, 0]}
              scale={[0.2 * labels[i].aspect, 0.2, 1]}
            >
              <spriteMaterial
                map={labels[i].texture}
                color={LABEL_DIM}
                transparent
                depthWrite={false}
                toneMapped={false}
              />
            </sprite>
          )}
        </group>
      ))}

      <points ref={pointsRef} geometry={particles.geo} frustumCulled={false}>
        <pointsMaterial
          map={glow}
          color={CYAN}
          size={0.09}
          sizeAttenuation
          transparent
          opacity={pal.dark ? 0.9 : 0.75}
          depthWrite={false}
          blending={pal.blending}
          toneMapped={false}
        />
      </points>
      {tier !== "low" && (
        <points ref={dustRef} geometry={dust}>
          <pointsMaterial
            map={glow}
            color={pal.accent2}
            size={0.05}
            sizeAttenuation
            transparent
            opacity={pal.dark ? 0.45 : 0.3}
            depthWrite={false}
            blending={pal.blending}
          />
        </points>
      )}
    </>
  )
}

export default function HeroScene({ tier, reduced, active }: SceneProps & { active: boolean }) {
  const [dpr, setDpr] = useState<[number, number]>(() => dprFor(tier))
  return (
    <Canvas
      dpr={dpr}
      frameloop={!active ? "never" : reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 8.2], fov: 42 }}
      gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <PerformanceMonitor onDecline={() => setDpr([1, 1])} />
      <SystemGraph tier={tier} reduced={reduced} />
    </Canvas>
  )
}
