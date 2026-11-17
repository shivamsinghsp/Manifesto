# PROMPT 6C — REMAINING BLOCKERS

## BLOCKER

*None.* There are no code-level blockers preventing the portfolio from being deployed. The build succeeds, all routes render, and the design system loads consistently.

---

## IMPORTANT

| Issue | Category | Details |
|---|---|---|
| Project images missing | USER INPUT REQUIRED | All 4 projects use empty `src: ""` with fallback plates. See `ASSET_BLOCKERS.md` for exact file requirements. |
| Contact form env vars | USER INPUT REQUIRED | `RESEND_API_KEY` and `CONTACT_EMAIL` must be set in the deployment environment. Without them, form submissions return a visible error. See `CONTACT_FORM_DEPLOYMENT.md`. |

---

## OPTIONAL

| Issue | Category | Details |
|---|---|---|
| Contact form rate limiting | OPTIONAL | No server-side rate limiting. The Resend free tier (100 emails/day) provides a natural ceiling, but production should consider adding rate limiting middleware. |
| Contact form CSRF | OPTIONAL | No explicit CSRF token. Next.js API routes are same-origin by default, which mitigates most CSRF vectors. |
| Custom email domain | OPTIONAL | Form sends from `onboarding@resend.dev`. A verified custom domain would improve deliverability. |
| SEO meta images | OPTIONAL | No Open Graph images configured. Adding `og:image` meta tags would improve social sharing previews. |

---

## USER INPUT REQUIRED

| Item | What Shivam Needs to Do |
|---|---|
| **Aao Seekhe screenshots** | Provide hero image, architecture diagram, interface screenshot |
| **Knowledge Hub screenshot** | Provide hero image of the SharePoint interface |
| **SME Platform screenshot** | Provide hero image of the booking/expert interface |
| **[REMOVED: campus-connect] screenshot** | Provide hero image of the student dashboard |
| **Resend API key** | Sign up at resend.com, create API key, add to deployment env |
| **Contact email** | Set `CONTACT_EMAIL` in deployment env (recommend: `shivamsinghabc439@gmail.com`) |

