"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import * as THREE from "three"
import { heroState, useHeroStep } from "@/lib/hero-store"
import { dprFor, type PerfTier } from "@/lib/device"
import { useScenePalette } from "./palette"

const N = 27

interface Layout {
  pos: THREE.Vector3[]
  scale: THREE.Vector3[]
  /** 0 = wireframe only, 1 = solid */
  solid: number
  /** Opacity of the big "sketch" outline cube. */
  outline: number
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/** Five target layouts for the same 27 blocks: IDEA → DESIGN → ARCHITECTURE → CODE → PRODUCT. */
function buildLayouts(): Layout[] {
  const lattice = (s: number) => {
    const out: THREE.Vector3[] = []
    for (let y = 1; y >= -1; y--)
      for (let z = -1; z <= 1; z++) for (let x = -1; x <= 1; x++) out.push(v(x * s, y * s, z * s))
    return out
  }
  const fill = (s: THREE.Vector3) => Array.from({ length: N }, () => s.clone())

  // IDEA: a loose lattice of points inside a sketched outline.
  const idea: Layout = {
    pos: lattice(0.62),
    scale: fill(v(0.12, 0.12, 0.12)),
    solid: 0,
    outline: 1,
  }

  // DESIGN: flat UI tiles (a 6 × 5 board minus three).
  const design: THREE.Vector3[] = []
  for (let i = 0; i < N; i++) {
    const c = i % 6
    const r = Math.floor(i / 6)
    design.push(v((c - 2.5) * 0.62, (2 - r) * 0.5, 0))
  }
  const designScale = design.map((_, i) => (i < 6 ? v(0.56, 0.3, 0.05) : v(0.52, 0.42, 0.05)))

  // ARCHITECTURE: three exploded layers (presentation / services / data).
  const arch = lattice(0.66).map((p) => v(p.x, p.y * 1.9, p.z))

  // CODE: lines of different lengths with indentation.
  const lines = [5, 3, 4, 6, 2, 4, 3]
  const indent = [0, 1, 1, 2, 2, 1, 0]
  const code: THREE.Vector3[] = []
  lines.forEach((len, row) => {
    for (let k = 0; k < len; k++) code.push(v(-1.7 + (indent[row] + k) * 0.5, 1.45 - row * 0.48, 0))
  })

  // PRODUCT: the assembled cube.
  const product = lattice(0.5)

  return [
    idea,
    { pos: design, scale: designScale, solid: 0.35, outline: 0 },
    { pos: arch, scale: fill(v(0.52, 0.14, 0.52)), solid: 0.55, outline: 0 },
    { pos: code, scale: fill(v(0.42, 0.2, 0.12)), solid: 0.7, outline: 0 },
    { pos: product, scale: fill(v(0.48, 0.48, 0.48)), solid: 1, outline: 0.35 },
  ]
}

function Blocks({ tier, reduced }: { tier: PerfTier; reduced: boolean }) {
  const pal = useScenePalette()
  const layouts = useMemo(buildLayouts, [])
  const step = useHeroStep()
  const solidRef = useRef<THREE.InstancedMesh>(null)
  const wireRef = useRef<THREE.InstancedMesh>(null)
  const group = useRef<THREE.Group>(null)
  const outline = useRef<THREE.LineSegments>(null)
  const cur = useRef({
    pos: layouts[0].pos.map((p) => p.clone()),
    scale: layouts[0].scale.map((s) => s.clone()),
    solid: 0,
    outline: 1,
  })
  const pointer = useRef({ x: 0, y: 0 })
  const invalidate = useThree((s) => s.invalidate)
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height))
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const outlineGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.1, 2.1, 2.1)),
    []
  )
  useEffect(
    () => () => {
      box.dispose()
      outlineGeo.dispose()
    },
    [box, outlineGeo]
  )

  useEffect(() => {
    outline.current?.computeLineDistances()
  }, [])

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduced])

  // On-demand rendering (reduced motion): snap and redraw when the step changes.
  useEffect(() => {
    invalidate()
  }, [step, pal, invalidate])

  // Per-block tint: the active layer/row picks up the accent colour.
  useEffect(() => {
    const m = solidRef.current
    if (!m) return
    const base = pal.ink.clone().lerp(pal.fog, pal.dark ? 0.55 : 0.75)
    for (let i = 0; i < N; i++) {
      const accentRow =
        step === 2 ? Math.floor(i / 9) === 1 : step === 3 ? i < 5 : step === 4 ? i % 4 === 0 : false
      m.setColorAt(i, accentRow ? pal.accent : base)
    }
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    invalidate()
  }, [step, pal, invalidate])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const target = layouts[heroState.step] ?? layouts[0]
    const k = reduced ? 1 : 1 - Math.exp(-dt * 5)
    const c = cur.current
    for (let i = 0; i < N; i++) {
      // Stagger: later blocks follow slightly behind for a "build" feel.
      const ki = reduced ? 1 : Math.min(1, k * (1.25 - (i / N) * 0.5))
      c.pos[i].lerp(target.pos[i], ki)
      c.scale[i].lerp(target.scale[i], ki)
      dummy.position.copy(c.pos[i])
      dummy.scale.copy(c.scale[i])
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      solidRef.current?.setMatrixAt(i, dummy.matrix)
      wireRef.current?.setMatrixAt(i, dummy.matrix)
    }
    if (solidRef.current) solidRef.current.instanceMatrix.needsUpdate = true
    if (wireRef.current) wireRef.current.instanceMatrix.needsUpdate = true
    c.solid = THREE.MathUtils.lerp(c.solid, target.solid, k)
    c.outline = THREE.MathUtils.lerp(c.outline, target.outline, k)
    const sm = solidRef.current?.material as THREE.MeshStandardMaterial | undefined
    if (sm) sm.opacity = c.solid * (pal.dark ? 0.92 : 0.96)
    const om = outline.current?.material as THREE.LineBasicMaterial | undefined
    if (om) om.opacity = c.outline * 0.6

    const g = group.current
    if (g) {
      const t = state.clock.elapsedTime
      const spin =
        heroState.step === 4
          ? t * 0.35
          : heroState.step === 2
            ? 0.6 + Math.sin(t * 0.3) * 0.15
            : 0.5
      g.rotation.y = reduced
        ? 0.6
        : THREE.MathUtils.damp(g.rotation.y, spin + pointer.current.x * 0.25, 3, dt)
      const tilt = heroState.step === 1 || heroState.step === 3 ? 0.08 : 0.42
      g.rotation.x = reduced
        ? 0.35
        : THREE.MathUtils.damp(g.rotation.x, tilt + pointer.current.y * 0.12, 3, dt)
      if (!reduced) g.position.y = Math.sin(t * 0.6) * 0.06
      g.scale.setScalar(aspect < 1 ? 0.78 : 1)
    }
  })

  return (
    <>
      <ambientLight intensity={pal.dark ? 0.55 : 0.9} />
      <directionalLight position={[4, 6, 5]} intensity={pal.dark ? 1.2 : 1.1} />
      <directionalLight position={[-5, -2, 3]} intensity={0.35} color={pal.accent} />
      <group ref={group}>
        <instancedMesh ref={solidRef} args={[box, undefined, N]} frustumCulled={false}>
          <meshStandardMaterial
            transparent
            opacity={0}
            roughness={0.55}
            metalness={0.15}
            depthWrite={false}
          />
        </instancedMesh>
        <instancedMesh ref={wireRef} args={[box, undefined, N]} frustumCulled={false}>
          <meshBasicMaterial
            color={pal.accent}
            wireframe
            transparent
            opacity={pal.dark ? 0.7 : 0.55}
            toneMapped={false}
          />
        </instancedMesh>
        <lineSegments ref={outline} geometry={outlineGeo}>
          <lineDashedMaterial
            color={pal.line}
            transparent
            opacity={0.6}
            dashSize={0.12}
            gapSize={0.08}
          />
        </lineSegments>
      </group>
      {tier !== "low" && <fog attach="fog" args={[pal.fog, 9, 18]} />}
    </>
  )
}

export default function BuildCubeScene({
  tier,
  reduced,
  active,
}: {
  tier: PerfTier
  reduced: boolean
  active: boolean
}) {
  const [dpr, setDpr] = useState<[number, number]>(() => dprFor(tier))
  return (
    <Canvas
      dpr={dpr}
      frameloop={!active ? "never" : reduced ? "demand" : "always"}
      camera={{ position: [0, 0.2, 7.2], fov: 40 }}
      gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <PerformanceMonitor onDecline={() => setDpr([1, 1])} />
      <Blocks tier={tier} reduced={reduced} />
    </Canvas>
  )
}
