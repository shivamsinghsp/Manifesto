import { expect, test, type Page } from "@playwright/test"

const ROUTES = [
  "/",
  "/work",
  "/work/shynr",
  "/work/kanpur-architects-association",
  "/work/aao-seekhe",
  "/work/sharepoint-knowledge-hub",
  "/work/pledge-portal-qa",
  "/experience",
  "/about",
  "/playground",
  "/contact",
  "/resume",
]

function trackErrors(page: Page) {
  const errors: string[] = []
  page.on("pageerror", (e) => errors.push(e.message))
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text())
  })
  return errors
}

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("boot-seen", "1")
    } catch {}
  })
})

for (const route of ROUTES) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors = trackErrors(page)
    const res = await page.goto(route, { waitUntil: "networkidle" })
    expect(res?.status()).toBe(200)
    await expect(page.locator("h1")).toHaveCount(1)
    await expect(page.locator("main#main")).toHaveCount(1)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href")
    expect(canonical).toMatch(new RegExp(`${route === "/" ? "" : route}$`))
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(overflow).toBeLessThanOrEqual(0)
    expect(errors).toEqual([])
  })
}

test("unknown routes return 404 with a helpful page", async ({ page }) => {
  const res = await page.goto("/definitely-missing")
  expect(res?.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found")
})

test("hero headline has a properly spaced accessible name", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "Engineering systems that ship."
  )
})

test("skip link moves focus to main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow")
  await page.goto("/")
  await page.keyboard.press("Tab")
  const skip = page.getByRole("link", { name: "Skip to content" })
  await expect(skip).toBeFocused()
  await page.keyboard.press("Enter")
  // Focus is the contract. (The #main hash can be reset by the router if Enter lands before hydration.)
  await expect(page.locator("#main")).toBeFocused()
})

test("case study sections are numbered sequentially", async ({ page }) => {
  for (const slug of ["shynr", "aao-seekhe", "pledge-portal-qa", "kanpur-architects-association"]) {
    await page.goto(`/work/${slug}`)
    const labels = await page.locator("article section h2").allTextContents()
    const numbers = labels
      .map((l) => l.match(/^(\d{2})\./)?.[1])
      .filter(Boolean)
      .map(Number)
    expect(numbers.length).toBeGreaterThan(2)
    numbers.forEach((n, i) => expect(n).toBe(i + 1))
  }
})

test("email links are mailto everywhere and never open a new tab", async ({ page }) => {
  for (const route of ["/", "/work/shynr", "/contact"]) {
    await page.goto(route)
    const footerEmail = page.locator("footer").getByRole("link", { name: "Email" })
    await expect(footerEmail).toHaveAttribute("href", /^mailto:/)
    await expect(footerEmail).not.toHaveAttribute("target", "_blank")
  }
})

test("reduce-motion toggle persists", async ({ page, isMobile }) => {
  test.skip(isMobile, "toggle lives in the mobile menu")
  await page.goto("/")
  await page.getByRole("switch", { name: "Reduce motion" }).click()
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce")
  await page.reload()
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce")
})

test("mobile menu opens and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only")
  await page.goto("/")
  await page.getByRole("button", { name: "Open menu" }).click()
  const dialog = page.getByRole("dialog", { name: "Site menu" })
  await expect(dialog).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
})

test("contact form validates on the client", async ({ page }) => {
  await page.goto("/contact")
  await page.getByRole("button", { name: /send message/i }).click()
  await expect(page.getByText("Please enter your name.")).toBeVisible()
  await expect(page.getByLabel(/^Email/)).toHaveAttribute("aria-invalid", "true")
})

test("contact API validates, honours the honeypot and caps size", async ({ request }) => {
  const bad = await request.post("/api/contact", { data: { name: "", email: "x", message: "hi" } })
  expect(bad.status()).toBe(400)
  const body = await bad.json()
  expect(Object.keys(body.fieldErrors)).toEqual(
    expect.arrayContaining(["name", "email", "message"])
  )

  const bot = await request.post("/api/contact", {
    data: { name: "Bot", email: "b@b.co", message: "spam spam spam", website: "http://spam" },
  })
  expect((await bot.json()).success).toBe(true)

  const big = await request.post("/api/contact", {
    data: { name: "a".repeat(20000), email: "a@b.co", message: "hello there" },
  })
  expect(big.status()).toBe(413)
})

test("geofencing lab reports inside / outside", async ({ page }) => {
  await page.goto("/playground")
  await page.getByRole("button", { name: "Outside", exact: true }).click()
  await expect(page.locator("#geo-readout")).toContainText("Outside geofence")
  await page.getByRole("button", { name: "At office" }).click()
  await expect(page.locator("#geo-readout")).toContainText("Inside geofence")
})

test("resume PDF is served directly", async ({ request }) => {
  const res = await request.get("/resume.pdf")
  expect(res.status()).toBe(200)
  expect(res.headers()["content-type"]).toContain("application/pdf")
})

test("SEO routes use the configured site URL", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text()
  expect(robots).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/)
  expect(robots).not.toContain("shivamsingh.dev")
  const sitemap = await (await request.get("/sitemap.xml")).text()
  expect(sitemap).toContain("/work/shynr")
  const og = await request.get("/opengraph-image")
  expect(og.headers()["content-type"]).toContain("image/png")
})

test("project cards navigate to their case study (view-transition link)", async ({ page }) => {
  await page.goto("/work")
  await page
    .getByRole("link", { name: /Kanpur Architect Association/ })
    .first()
    .click()
  await expect(page).toHaveURL(/\/work\/kanpur-architects-association$/)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kanpur Architect Association")
})

test("3D hero mounts after interaction without errors", async ({ page }) => {
  const errors = trackErrors(page)
  await page.goto("/", { waitUntil: "networkidle" })
  await page.mouse.move(200, 300)
  await page.mouse.move(400, 320)
  await expect(page.locator("#hero canvas")).toHaveCount(1, { timeout: 15000 })
  expect(errors).toEqual([])
})

test("saved theme applies before first paint and the menu switches it", async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("seeded")) {
      localStorage.setItem("theme", "light")
      sessionStorage.setItem("seeded", "1")
    }
    document.addEventListener("DOMContentLoaded", () => {
      ;(window as unknown as { __t: string | null }).__t =
        document.documentElement.getAttribute("data-theme")
    })
  })
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/")
  expect(await page.evaluate(() => (window as unknown as { __t: string | null }).__t)).toBe("light")
  await page
    .getByRole("button", { name: /^Theme/ })
    .first()
    .click()
  await page.getByRole("menuitemradio", { name: "Dark" }).click()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
  await page.reload()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
})

test("career facts come from one source and the Rapsora role is not current", async ({ page }) => {
  await page.goto("/experience")
  const main = page.locator("main")
  await expect(main).toContainText("Jan 2026 – Oct 2026")
  await expect(main).toContainText("10 mos")
  await expect(main).not.toContainText(/6-month|January\s*–\s*June 2026/)
  await page.goto("/work/pledge-portal-qa")
  await expect(page.getByRole("link", { name: /Public portal/ })).toHaveAttribute(
    "href",
    "https://pledgeup.in"
  )
  await expect(page.getByRole("note")).toContainText("QA-only")
})

test("no confidential client name appears on the Knowledge Hub page", async ({ page }) => {
  // The client's name must never be written in this public repo, so compare SHA-256 hashes
  // of the page's words and three-word phrases instead.
  const FORBIDDEN = new Set([
    "ca5bcec12f716f44d9745d349cc80422f0d14cbab09329caf533bef7c2d952eb",
    "13a7b2f7e97bd78cf62b0ec52429ae5e9dc90e70f1c18cf73e971161306d2b16",
  ])
  await page.goto("/work/sharepoint-knowledge-hub")
  const words = (await page.locator("body").innerText()).toLowerCase().match(/[a-z]+/g) ?? []
  const phrases = new Set([...words, ...words.map((w, i) => words.slice(i, i + 3).join(" "))])
  const { createHash } = await import("node:crypto")
  const hits = [...phrases].filter((t) =>
    FORBIDDEN.has(createHash("sha256").update(t).digest("hex"))
  )
  expect(hits.length, "confidential client name found on the page").toBe(0)
  const imgs = await page
    .locator("img")
    .evaluateAll((els) =>
      els.map((e) => (e as HTMLImageElement).currentSrc || (e as HTMLImageElement).src)
    )
  expect(imgs.some((s) => s.includes("sharepoint-knowledge-hub/0"))).toBe(false)
})
