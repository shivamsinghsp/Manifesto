# VIEWPORT SCREENSHOT CHECKLIST — FINAL (PROMPT 6B)

## Testing Matrix

For each cell: ✅ = verified in code audit, ⬜ = needs manual device verification

---

### 320 × 800 (Critical Minimum)

| Page | Layout | Typography | Overflow | Navigation | Imagery | Footer | a11y |
|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work/aao-seekhe` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/experience` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/about` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/resume` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |

---

### 375 × 812 (iPhone SE / 13 mini)

| Page | Layout | Typography | Overflow | Navigation | Imagery | Footer | a11y |
|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/experience` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/about` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |

---

### 390 × 844 (iPhone 14)

| Page | Layout | Typography | Overflow | Navigation | Imagery | Footer | a11y |
|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work/aao-seekhe` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/experience` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/about` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |

---

### 430 × 932 (iPhone 14 Pro Max)

| Page | Layout | Typography | Overflow | Navigation | Imagery | Footer | a11y |
|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work/aao-seekhe` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/experience` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/about` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |

---

### 768 × 1024 (iPad)

| Page | Layout | Typography | Overflow | Navigation | Imagery | Footer | a11y |
|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/experience` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |

---

### 1024 × 768 (Landscape Tablet / Small Desktop)

| Page | Layout | Typography | Overflow | Navigation | Imagery | Footer | a11y |
|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### 1440 × 900 (Desktop)

| Page | Layout | Typography | Overflow | Navigation | Imagery | Footer | a11y |
|---|---|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/work` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/about` | ✅ | ✅ | ✅ | ✅ | N/A | ✅ | ✅ |

---

## Manual Verification Recommended

The above ✅ marks indicate code-level verification. For production sign-off, manual visual inspection is recommended on:

- [ ] Real iPhone (Safari) at 390px
- [ ] Real Android (Chrome) at 360px
- [ ] Chrome DevTools emulation at 320px
- [ ] iPad Safari at 768px
- [ ] Desktop Chrome at 1440px

Focus areas for manual testing:
- [ ] IBM Plex Serif font rendering
- [ ] Dark background consistency
- [ ] HeroSystem animation smoothness
- [ ] Mobile nav open/close behavior
- [ ] Contact form input focus states
- [ ] Timeline intersection observer behavior
