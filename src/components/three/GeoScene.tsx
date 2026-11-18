"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MutableRefObject,
  type RefObject,
} from "react"
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import { Grid, Html, Line } from "@react-three/drei"
import * as THREE from "three"
import type { GeofenceStatus } from "@/lib/geo"
import { dprFor, type PerfTier } from "@/lib/device"
import { useScenePalette, type ScenePalette } from "./palette"
import { createGlowTexture } from "./textures"

/** 1 world unit = 10 metres. Ground plane: x = east, -z = north. */
export const M_PER_UNIT = 10
export const MAP_HALF_M = 480

const statusColor = (pal: ScenePalette): Record<GeofenceStatus, string> => ({
  in_range: pal.hex.accent,
  near_edge: pal.hex.warn,
  outside: pal.hex.bad,
})

export interface GeoSceneProps {
  user: { x: number; y: number }
  radius: number
  status: GeofenceStatus
  distance: number
  onUserChange: (x: number, y: number) => void
  onRadiusChange: (r: number) => void
  reduced: boolean
  active: boolean
  tier: PerfTier
}

/** drei <Html> needs an explicit portal target; without it the first overlay can mount before the canvas parent exists. */
const PortalCtx = createContext<MutableRefObject<HTMLDivElement | null> | null>(null)
function Overlay(props: ComponentProps<typeof Html>) {
  const portal = useContext(PortalCtx)
  return (
    <Html
      {...props}
      portal={(portal ?? undefined) as RefObject<HTMLElement> | undefined}
      style={{ pointerEvents: "none" }}
      zIndexRange={[10, 0]}
    />
  )
}

const clampM = (v: number) => Math.max(-MAP_HALF_M, Math.min(MAP_HALF_M, v))

/** Deterministic PRNG so the city is identical on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function City({
  radius,
  color,
  tier,
  dark,
}: {
  radius: number
  color: string
  tier: PerfTier
  dark: boolean
}) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const blocks = useMemo(() => {
    const rand = mulberry32(7)
    const out: { x: number; z: number; w: number; d: number; h: number }[] = []
    const pitch = 8
    const span = tier === "low" ? 4 : 6
    for (let i = -span; i <= span; i++) {
      for (let j = -span; j <= span; j++) {
        const cx = i * pitch,
          cz = j * pitch
        if (Math.hypot(cx, cz) < 7) continue // office plaza
        const n = 1 + Math.floor(rand() * 3)
        for (let k = 0; k < n; k++) {
          const w = 1.6 + rand() * 2.6,
            d = 1.6 + rand() * 2.6
          out.push({
            x: cx + (rand() - 0.5) * (pitch - 2.4 - w),
            z: cz + (rand() - 0.5) * (pitch - 2.4 - d),
            w,
            d,
            h: 0.4 + rand() ** 2 * (Math.hypot(cx, cz) < 30 ? 2.6 : 3.4),
          })
        }
      }
    }
    return out
  }, [tier])

  useEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    blocks.forEach((b, i) => {
      m.compose(
        new THREE.Vector3(b.x, b.h / 2, b.z),
        new THREE.Quaternion(),
        new THREE.Vector3(b.w, b.h, b.d)
      )
      mesh.setMatrixAt(i, m)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [blocks])

  // Tint buildings that fall inside the geofence
  useEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const inside = dark
      ? new THREE.Color(color).multiplyScalar(0.35).add(new THREE.Color("#141e33"))
      : new THREE.Color("#e9e5dc").lerp(new THREE.Color(color), 0.35)
    const outside = new THREE.Color(dark ? "#121a2c" : "#d6d1c4")
    const r = radius / M_PER_UNIT
    blocks.forEach((b, i) => mesh.setColorAt(i, Math.hypot(b.x, b.z) <= r ? inside : outside))
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [blocks, radius, color, dark])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, blocks.length]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.85} metalness={0.1} />
    </instancedMesh>
  )
}

function GeoWorld({
  user,
  radius,
  status,
  distance,
  onUserChange,
  onRadiusChange,
  reduced,
  tier,
}: Omit<GeoSceneProps, "active">) {
  const pal = useScenePalette()
  const color = statusColor(pal)[status]
  const colorObj = useMemo(() => new THREE.Color(color), [color])
  const glow = useMemo(() => createGlowTexture(), [])
  useEffect(() => () => glow.dispose(), [glow])
  const [dragging, setDragging] = useState<null | "user" | "radius">(null)
  const downAt = useRef<{ x: number; y: number } | null>(null)
  const { camera, size, gl } = useThree()

  const r = radius / M_PER_UNIT
  const ux = user.x / M_PER_UNIT
  const uz = -user.y / M_PER_UNIT

  // Camera: fly in from altitude on mount, frame the map for the current aspect.
  const intro = useRef(reduced ? 1 : 0)
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    gl.domElement.addEventListener("pointermove", onMove)
    return () => gl.domElement.removeEventListener("pointermove", onMove)
  }, [gl])

  const pulse = useRef<THREE.Mesh>(null)
  const wallMat = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const aspect = size.width / Math.max(1, size.height)
    // Frame whatever matters right now: the fence and the user, never less than ~120 m.
    const frameUnits = Math.max(radius * 1.45, Math.hypot(user.x, user.y) * 1.2, 120) / M_PER_UNIT
    const fit = Math.max(1, 1.25 / aspect)
    intro.current = Math.min(1, intro.current + dt * 0.55)
    const e = 1 - Math.pow(1 - intro.current, 3)
    const alt = THREE.MathUtils.lerp(260, frameUnits * 1.9 * fit, e)
    const back = THREE.MathUtils.lerp(10, frameUnits * 1.75 * fit, e)
    const px = reduced || dragging ? 0 : pointer.current.x * 3
    const pz = reduced || dragging ? 0 : pointer.current.y * 2
    // While dragging, hold the zoom so the map doesn't slide under the pointer.
    const zoomRate = dragging ? 0 : 2.5
    camera.position.x = THREE.MathUtils.damp(camera.position.x, px, 3, dt)
    camera.position.y =
      intro.current < 1 ? alt : THREE.MathUtils.damp(camera.position.y, alt, zoomRate, dt)
    camera.position.z =
      intro.current < 1 ? back : THREE.MathUtils.damp(camera.position.z, back + pz, zoomRate, dt)
    camera.lookAt(0, 0, 0)

    if (pulse.current && !reduced) {
      const k = (state.clock.elapsedTime * 0.8) % 1
      pulse.current.scale.setScalar(0.6 + k * 2.2)
      ;(pulse.current.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - k)
    }
    if (wallMat.current) wallMat.current.color.lerp(colorObj, 0.15)
  })

  const toMeters = (p: THREE.Vector3) => ({
    x: clampM(p.x * M_PER_UNIT),
    y: clampM(-p.z * M_PER_UNIT),
  })

  const onPlaneMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging) return
    const m = toMeters(e.point)
    if (dragging === "user") onUserChange(Math.round(m.x), Math.round(m.y))
    else onRadiusChange(Math.round(Math.hypot(m.x, m.y) / 5) * 5)
  }
  const endDrag = () => setDragging(null)
  useEffect(() => {
    window.addEventListener("pointerup", endDrag)
    window.addEventListener("pointercancel", endDrag)
    return () => {
      window.removeEventListener("pointerup", endDrag)
      window.removeEventListener("pointercancel", endDrag)
    }
  }, [])
  useEffect(() => {
    gl.domElement.style.cursor = dragging ? "grabbing" : ""
  }, [dragging, gl])

  const startDrag = (kind: "user" | "radius") => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setDragging(kind)
  }

  return (
    <>
      <color attach="background" args={[pal.dark ? "#070A12" : "#EEEBE3"]} />
      <fog attach="fog" args={[pal.dark ? "#070A12" : "#EEEBE3", 70, 170]} />
      <ambientLight intensity={pal.dark ? 0.55 : 0.9} />
      <directionalLight position={[30, 60, 20]} intensity={pal.dark ? 1.1 : 1.3} />
      <hemisphereLight
        args={[pal.dark ? "#2a4a7a" : "#ffffff", pal.dark ? "#05070c" : "#cfc8b8", 0.5]}
      />

      {/* Ground + interaction plane (tap/click to place the user) */}
      <mesh
        rotation-x={-Math.PI / 2}
        onPointerMove={onPlaneMove}
        onPointerDown={(e) => {
          downAt.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={(e) => {
          const d = downAt.current
          downAt.current = null
          if (dragging || !d) return
          if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 8) {
            const m = toMeters(e.point)
            onUserChange(Math.round(m.x), Math.round(m.y))
          }
        }}
      >
        <planeGeometry args={[MAP_HALF_M / 5, MAP_HALF_M / 5]} />
        <meshStandardMaterial color={pal.dark ? "#0A101C" : "#E4DFD3"} roughness={1} />
      </mesh>
      <Grid
        position={[0, 0.01, 0]}
        args={[MAP_HALF_M / 5, MAP_HALF_M / 5]}
        cellSize={2.5}
        sectionSize={10}
        cellColor={pal.dark ? "#16233b" : "#cfc8b9"}
        sectionColor={pal.dark ? "#1f3a62" : "#a9a08d"}
        cellThickness={0.6}
        sectionThickness={1}
        fadeDistance={140}
        fadeStrength={1.5}
      />
      <City radius={radius} color={color} tier={tier} dark={pal.dark} />

      {/* Geofence: floor disc, boundary ring and a translucent wall */}
      <group>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]} scale={r}>
          <circleGeometry args={[1, 96]} />
          <meshBasicMaterial color={color} transparent opacity={0.07} depthWrite={false} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, 0]} scale={r}>
          <ringGeometry args={[0.985, 1, 160]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.95}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 1.2, 0]} scale={[r, 2.4, r]}>
          <cylinderGeometry args={[1, 1, 1, 96, 1, true]} />
          <meshBasicMaterial
            ref={wallMat}
            color={color}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Radius handle (east edge) */}
        <group position={[r, 0.6, 0]}>
          <mesh
            onPointerDown={startDrag("radius")}
            onPointerOver={() => (gl.domElement.style.cursor = "ew-resize")}
            onPointerOut={() => !dragging && (gl.domElement.style.cursor = "")}
          >
            <sphereGeometry args={[0.9, 20, 20]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          <Overlay center position={[0, 2.2, 0]}>
            <div className="geo-chip">r = {radius} m</div>
          </Overlay>
        </group>
      </group>

      {/* Office */}
      <group>
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.18, 0.4, 4.4, 12]} />
          <meshStandardMaterial
            color={pal.dark ? "#d8e1f0" : "#3d4452"}
            emissive={pal.accent}
            emissiveIntensity={pal.dark ? 0.25 : 0.1}
          />
        </mesh>
        <sprite position={[0, 4.6, 0]} scale={4}>
          <spriteMaterial
            map={glow}
            color={pal.dark ? "#ffffff" : pal.hex.accent}
            transparent
            opacity={0.8 * pal.glow}
            blending={pal.blending}
            depthWrite={false}
          />
        </sprite>
        <Overlay center position={[0, 6.6, 0]}>
          <div className="geo-chip">OFFICE</div>
        </Overlay>
      </group>

      {/* Distance vector */}
      <Line
        points={[
          [0, 0.12, 0],
          [ux, 0.12, uz],
        ]}
        color={color}
        lineWidth={2}
        dashed
        dashSize={1}
        gapSize={0.7}
      />
      {Math.hypot(ux, uz) > 3 && (
        <Overlay center position={[ux * 0.45, 0.8, uz * 0.45]}>
          <div className="geo-chip geo-chip--strong" style={{ borderColor: color, color }}>
            {Math.round(distance)} m
          </div>
        </Overlay>
      )}

      {/* User pin */}
      <group position={[ux, 0, uz]}>
        <mesh ref={pulse} rotation-x={-Math.PI / 2} position={[0, 0.06, 0]}>
          <ringGeometry args={[0.8, 1, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} depthWrite={false} />
        </mesh>
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 4.8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh
          position={[0, 5, 0]}
          onPointerDown={startDrag("user")}
          onPointerOver={() => (gl.domElement.style.cursor = "grab")}
          onPointerOut={() => !dragging && (gl.domElement.style.cursor = "")}
        >
          <sphereGeometry args={[1.1, 24, 24]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <sprite position={[0, 5, 0]} scale={5}>
          <spriteMaterial
            map={glow}
            color={color}
            transparent
            opacity={0.65 * Math.max(pal.glow, 0.4)}
            blending={pal.blending}
            depthWrite={false}
          />
        </sprite>
        <Overlay center position={[0, 7.4, 0]}>
          <div className="geo-chip">YOU</div>
        </Overlay>
      </group>
    </>
  )
}

export default function GeoScene({ active, ...props }: GeoSceneProps) {
  const portal = useRef<HTMLDivElement | null>(null)
  return (
    <div ref={portal} className="relative h-full w-full">
      <PortalCtx.Provider value={portal}>
        <Canvas
          dpr={dprFor(props.tier)}
          frameloop={active ? "always" : "never"}
          camera={{ position: [0, 260, 10], fov: 40, near: 1, far: 600 }}
          gl={{ antialias: props.tier !== "low", powerPreference: "high-performance" }}
          style={{ touchAction: "pan-y" }}
        >
          <PortalCtx.Provider value={portal}>
            <GeoWorld {...props} />
          </PortalCtx.Provider>
        </Canvas>
      </PortalCtx.Provider>
    </div>
  )
}
