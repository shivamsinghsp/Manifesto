/**
 * Prints /resume to public/resume.pdf (A4, one page, light theme).
 * Usage: npm run build && npm run resume:pdf   (starts `next start` itself on RESUME_PORT, default 3200)
 * Validates: exactly one page, and key facts present in the extracted text.
 */
import { spawn } from "node:child_process"
import { writeFileSync } from "node:fs"
import { chromium } from "playwright"

const PORT = Number(process.env.RESUME_PORT || 3200)
const OUT = process.env.RESUME_OUT || "public/resume.pdf"
const exe = process.env.PW_CHROMIUM_PATH || undefined

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" })
const stop = () => server.kill("SIGTERM")
process.on("exit", stop)

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/resume`)
      if (r.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error("server did not start")
}

try {
  await waitForServer()
  const browser = await chromium.launch(exe ? { executablePath: exe } : {})
  const page = await browser.newPage({ colorScheme: "light", reducedMotion: "reduce" })
  await page.addInitScript(() => localStorage.setItem("theme", "light"))
  await page.goto(`http://localhost:${PORT}/resume`, { waitUntil: "networkidle" })
  await page.evaluate(() => document.fonts.ready)
  await page.emulateMedia({ media: "print" })
  const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true })
  await browser.close()
  writeFileSync(OUT, pdf)
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length
  console.log(`wrote ${OUT}: ${pdf.length} bytes, ${pages} page(s)`)
  if (pages !== 1) {
    console.error("Resume must be exactly one page.")
    process.exitCode = 1
  }
} finally {
  stop()
}
