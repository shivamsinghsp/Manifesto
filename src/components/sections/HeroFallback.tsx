import { heroSteps } from "@/content/hero"

/**
 * Static rendition of the hero engine — shown before WebGL loads, on low-end devices and
 * when WebGL is unavailable. Same composition as the 3D scene: five plates, bottom-up, an
 * orbit of capability nodes around the ARCHITECTURE layer and a label column on the right.
 */
const CX = 150
const DEPTH = 10
const ORBIT = { cy: 212, rx: 146, ry: 52 }
const PLATES = [
  { w: 118, y: 318 },
  { w: 98, y: 264 },
  { w: 80, y: 212 },
  { w: 62, y: 162 },
  { w: 44, y: 116 },
]
const LABEL_X = 314
const NODES = [0, 60, 120, 180, 240, 300].map((deg) => {
  const a = (deg * Math.PI) / 180
  return {
    x: CX + Math.cos(a) * ORBIT.rx,
    y: ORBIT.cy + Math.sin(a) * ORBIT.ry,
    front: Math.sin(a) > 0,
  }
})

/** Isometric octagon outline (flattened 2.4:1). */
function octagon(w: number, y: number) {
  return Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8
    return `${(CX + Math.cos(a) * w).toFixed(1)},${(y + Math.sin(a) * w * 0.42).toFixed(1)}`
  }).join(" ")
}

function Node({ x, y }: { x: number; y: number }) {
  return (
    <rect
      x={x - 4}
      y={y - 4}
      width="8"
      height="8"
      transform={`rotate(45 ${x} ${y})`}
      className="fill-surface stroke-text-secondary"
      strokeWidth="1"
    />
  )
}

export function HeroFallback() {
  const { cy, rx, ry } = ORBIT
  const orbitArc = (sweep: 0 | 1) => (
    <path
      d={`M ${CX - rx} ${cy} A ${rx} ${ry} 0 0 ${sweep} ${CX + rx} ${cy}`}
      fill="none"
      className="stroke-text-tertiary"
      strokeWidth="0.8"
      strokeDasharray="3 4"
      opacity="0.7"
    />
  )
  return (
    <svg
      viewBox="0 0 440 420"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <ellipse cx={CX} cy={352} rx={138} ry={24} className="fill-text" opacity="0.06" />
      {/* Back half of the orbit and the back nodes sit behind the plates. */}
      {orbitArc(1)}
      {NODES.filter((n) => !n.front).map((n, i) => (
        <Node key={`b${i}`} {...n} />
      ))}
      <line x1={CX} x2={CX} y1={72} y2={330} className="stroke-text-tertiary" strokeWidth="1" />
      {PLATES.map((p, i) => (
        <g key={i}>
          <polygon
            points={octagon(p.w, p.y + DEPTH)}
            className="fill-surface-alt stroke-text-tertiary"
            strokeWidth="0.8"
          />
          <polygon
            points={octagon(p.w, p.y)}
            className={i === 2 ? "fill-surface stroke-accent" : "fill-surface stroke-text-tertiary"}
            strokeWidth={i === 2 ? 1.4 : 0.8}
          />
        </g>
      ))}
      {orbitArc(0)}
      {NODES.filter((n) => n.front).map((n, i) => (
        <Node key={`f${i}`} {...n} />
      ))}
      <circle cx={CX} cy={186} r="3.5" className="fill-accent" />
      {/* Label column with leader lines, clear of the orbit. */}
      <g fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">
        {PLATES.map((p, i) => (
          <g key={i}>
            <line
              x1={CX + p.w + 8}
              x2={LABEL_X - 8}
              y1={p.y}
              y2={p.y}
              className={i === 2 ? "stroke-accent" : "stroke-text-tertiary"}
              strokeWidth="0.6"
              opacity={i === 2 ? 1 : 0.5}
            />
            <text x={LABEL_X} y={p.y + 3} className={i === 2 ? "fill-text" : "fill-text-tertiary"}>
              {`0${i + 1} ${heroSteps[i].label}`}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
