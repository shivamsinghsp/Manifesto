import { ImageResponse } from "next/og"
import { site } from "@/content/site"

export const OG_SIZE = { width: 1200, height: 630 }

/** Branded 1200×630 social card in the blueprint style. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  const steps = ["IDEA", "DESIGN", "ARCHITECTURE", "CODE", "PRODUCT"]
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#0E0E0D",
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(0,184,212,0.22), transparent 70%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        color: "#F1F3F7",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 24,
          letterSpacing: 4,
          color: "#8590A4",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: "#FF5E1F",
            boxShadow: "none",
          }}
        />
        {`${eyebrow.toUpperCase()}`}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: title.length > 34 ? 64 : 80,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 30, color: "#ACA79D", maxWidth: 980, lineHeight: 1.35 }}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: 3,
                  padding: "8px 12px",
                  border: `1px solid ${i === 2 ? "#FF5E1F" : "rgba(255,255,255,0.15)"}`,
                  color: i === 2 ? "#FF5E1F" : "#ACA79D",
                }}
              >
                {s}
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 18, height: 1, background: "rgba(0,229,255,0.5)" }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 26, color: "#F1F3F7", fontWeight: 700 }}>{site.name}</div>
      </div>
    </div>,
    OG_SIZE
  )
}
