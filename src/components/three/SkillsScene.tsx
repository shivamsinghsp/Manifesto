"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { skillGroups, type SkillGroup } from "@/content/skills"
import { dprFor, type PerfTier } from "@/lib/device"
import { createGlowTexture, createLabelTexture, cssFontFamily } from "./textures"

type GroupId = SkillGroup["id"]

const RINGS: Record<GroupId, { radius: number; tilt: [number, number, number]; speed: number }> = {
  // Biggest groups get the widest rings; moderate tilts keep the ellipses open so labels don't stack.
  database: { radius: 1.35, tilt: [0.55, 0, 0.2], speed: 0.14 },
  enterprise: { radius: 2.15, tilt: [0.8, 0.35, -0.3], speed: -0.1 },
  backend: { radius: 2.85, tilt: [0.62, -0.45, 0.4], speed: 0.08 },
  frontend: { radius: 3.5, tilt: [0.9, 0.2, -0.15], speed: -0.06 },
}

function Ring({
  group,
  selected,
  reduced,
  fontFamily,
}: {
  group: SkillGroup
  selected: GroupId | null
  reduced: boolean
  fontFamily: string
}) {
  const cfg = RINGS[group.id]
  const spin = useRef<THREE.Group>(null)
  const color = useMemo(() => new THREE.Color(group.color), [group.color])
  const labels = useMemo(
    () =>
      group.items.map((item) =>
        createLabelTexture(item, { font: fontFamily, color: "#F1F3F7", px: 36 })
      ),
    [group.items, fontFamily]
  )
  const ringGeo = useMemo(() => {
    const pts = new THREE.EllipseCurve(0, 0, cfg.radius, cfg.radius, 0, Math.PI * 2).getPoints(160)
    return new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(p.x, p.y, 0)))
  }, [cfg.radius])
  useEffect(
    () => () => {
      labels.forEach((l) => l.texture.dispose())
      ringGeo.dispose()
    },
    [labels, ringGeo]
  )

  const dimmed = selected !== null && selected !== group.id
  const lineMat = useRef<THREE.LineBasicMaterial>(null)
  const spriteMats = useRef<(THREE.SpriteMaterial | null)[]>([])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    if (spin.current && !reduced)
      spin.current.rotation.z += dt * cfg.speed * (selected === group.id ? 0.4 : 1)
    const targetLine = dimmed ? 0.08 : selected === group.id ? 0.9 : 0.35
    if (lineMat.current)
      lineMat.current.opacity = THREE.MathUtils.damp(lineMat.current.opacity, targetLine, 6, dt)
    spriteMats.current.forEach((m) => {
      if (m) m.opacity = THREE.MathUtils.damp(m.opacity, dimmed ? 0.18 : 1, 6, dt)
    })
  })

  return (
    <group rotation={cfg.tilt}>
      <group ref={spin}>
        <lineLoop geometry={ringGeo}>
          <lineBasicMaterial
            ref={lineMat}
            color={color}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </lineLoop>
        {labels.map((l, i) => {
          const a = (i / labels.length) * Math.PI * 2
          const h = 0.27
          return (
            <sprite
              key={group.items[i]}
              position={[Math.cos(a) * cfg.radius, Math.sin(a) * cfg.radius, 0]}
              scale={[h * l.aspect, h, 1]}
            >
              <spriteMaterial
                ref={(m) => {
                  spriteMats.current[i] = m
                }}
                map={l.texture}
                transparent
                depthWrite={false}
              />
            </sprite>
          )
        })}
      </group>
    </group>
  )
}

function Cluster({ selected, reduced }: { selected: GroupId | null; reduced: boolean }) {
  const root = useRef<THREE.Group>(null)
  const glow = useMemo(() => createGlowTexture(), [])
  useEffect(() => () => glow.dispose(), [glow])
  const [fontFamily, setFontFamily] = useState<string | null>(null)
  const { gl } = useThree()
  const drag = useRef({ active: false, x: 0, y: 0, vx: 0, vy: 0 })

  useEffect(() => {
    let alive = true
    document.fonts.ready.then(() => alive && setFontFamily(cssFontFamily("--font-plex-mono")))
    return () => {
      alive = false
    }
  }, [])

  // Drag to rotate. Horizontal drags rotate; vertical gestures still scroll the page on touch.
  useEffect(() => {
    const el = gl.domElement
    const down = (e: PointerEvent) => {
      drag.current.active = true
      drag.current.x = e.clientX
      drag.current.y = e.clientY
    }
    const move = (e: PointerEvent) => {
      const d = drag.current
      if (!d.active) return
      d.vy = (e.clientX - d.x) * 0.006
      d.vx = (e.clientY - d.y) * 0.004
      d.x = e.clientX
      d.y = e.clientY
    }
    const up = () => {
      drag.current.active = false
    }
    el.addEventListener("pointerdown", down)
    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerup", up)
    el.addEventListener("pointercancel", up)
    return () => {
      el.removeEventListener("pointerdown", down)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      el.removeEventListener("pointercancel", up)
    }
  }, [gl])

  useFrame((state, delta) => {
    const g = root.current
    if (!g) return
    const d = drag.current
    g.rotation.y += d.vy
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + d.vx, -0.6, 0.6)
    d.vy *= 0.9
    d.vx *= 0.9
    if (!reduced && !d.active) g.rotation.y += delta * 0.05
    if (!reduced) g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06
  })

  return (
    <group ref={root}>
      <mesh>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshBasicMaterial color="#00B8D4" wireframe transparent opacity={0.35} />
      </mesh>
      <sprite scale={2.4}>
        <spriteMaterial
          map={glow}
          color="#00E5FF"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      {fontFamily &&
        skillGroups.map((g) => (
          <Ring
            key={g.id}
            group={g}
            selected={selected}
            reduced={reduced}
            fontFamily={fontFamily}
          />
        ))}
    </group>
  )
}

export default function SkillsScene({
  selected,
  reduced,
  active,
  tier,
}: {
  selected: GroupId | null
  reduced: boolean
  active: boolean
  tier: PerfTier
}) {
  return (
    <Canvas
      dpr={dprFor(tier)}
      frameloop={!active ? "never" : reduced ? "demand" : "always"}
      camera={{ position: [0, 0.2, 10.8], fov: 45 }}
      gl={{ antialias: tier !== "low", alpha: true }}
      style={{ touchAction: "pan-y", cursor: "grab" }}
    >
      <Cluster selected={selected} reduced={reduced} />
    </Canvas>
  )
}
