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
    <svg viewBox="0 0 280 420" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="hf-glow">
          <stop offset="0" stopColor="#00E5FF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#00E5FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={d} fill="none" stroke="#00B8D4" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="22" fill="url(#hf-glow)" />
          <circle cx={x} cy={y} r="4" fill={i === 2 ? "#00E5FF" : "#F1F3F7"} />
          <text x={x + 16} y={y + 4} fill="#8590A4" fontSize="10" fontFamily="monospace" letterSpacing="1.5">
            {`0${i + 1} ${heroSteps[i].label}`}
          </text>
        </g>
      ))}
    </svg>
  )
}
