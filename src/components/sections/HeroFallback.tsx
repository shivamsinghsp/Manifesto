import { heroSteps } from "@/content/hero"

/** Static SVG rendition of the hero system — shown before WebGL loads and when it can't. */
export function HeroFallback() {
  const pts = [
    [70, 60],
    [150, 130],
    [110, 210],
    [200, 280],
    [150, 360],
  ]
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")
  return (
    <svg
      viewBox="0 0 280 420"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="hf-glow">
          <stop offset="0" style={{ stopColor: "var(--canvas-accent)" }} stopOpacity="0.45" />
          <stop offset="1" style={{ stopColor: "var(--canvas-accent)" }} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d={d}
        fill="none"
        className="stroke-accent"
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="22" fill="url(#hf-glow)" />
          <circle cx={x} cy={y} r="4" className={i === 2 ? "fill-accent" : "fill-text"} />
          <text
            x={x + 16}
            y={y + 4}
            className="fill-text-tertiary"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
          >
            {`0${i + 1} ${heroSteps[i].label}`}
          </text>
        </g>
      ))}
    </svg>
  )
}
