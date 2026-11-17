import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0E17", color: "#F1F3F7", fontSize: 92, fontWeight: 700, fontFamily: "serif", fontStyle: "italic" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          S<span style={{ color: "#00E5FF" }}>S</span>
        </div>
      </div>
    ),
    size
  )
}
