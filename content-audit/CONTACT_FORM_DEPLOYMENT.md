# CONTACT FORM DEPLOYMENT GUIDE

## Architecture

The contact form uses **Resend** (email API service) via a Next.js API route.

### Flow
```
User submits form → POST /api/contact → Resend API → Email delivered to CONTACT_EMAIL
```

### Files
- **Frontend**: `src/app/contact/page.tsx` — React form with loading/success/error states
- **Backend**: `src/app/api/contact/route.ts` — POST handler with validation

## Current Implementation Status

| Feature | Status |
|---|---|
| Client-side form | ✅ Implemented |
| Loading state | ✅ Implemented |
| Success message | ✅ Implemented |
| Error message | ✅ Implemented |
| Server-side field validation | ✅ `name`, `email`, `message` required |
| Resend integration | ✅ Implemented |
| Missing env var handling | ✅ Returns 500 with safe message |
| Error catch block | ✅ Returns safe error without exposing internals |
| Client-side email validation | ⚠️ Browser `type="email"` only (no regex) |
| Rate limiting | ❌ Not implemented |
| CSRF protection | ❌ Not implemented (Next.js same-origin mitigates) |
| Honeypot field | ❌ Not implemented |

## Required Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| `RESEND_API_KEY` | Authenticates with Resend email API | `re_xxxxxxxxxx` |
| `CONTACT_EMAIL` | Recipient email for form submissions | `shivamsinghabc439@gmail.com` |

## Local Development Setup

1. Create a `.env.local` file in the project root:
```
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=shivamsinghabc439@gmail.com
```

2. Get a Resend API key at https://resend.com (free tier: 100 emails/day)

3. Until configured, form submissions will return a 500 error with the message: "Failed to send message. Please try again later."

## Production Deployment

### Vercel
Add both environment variables in the Vercel dashboard:
`Settings → Environment Variables`

### Other hosts
Set `RESEND_API_KEY` and `CONTACT_EMAIL` as server-side environment variables.

## Failure Behavior

| Scenario | User Sees |
|---|---|
| Missing `RESEND_API_KEY` | `[ERROR] Failed to send message. Please try again.` |
| Missing `CONTACT_EMAIL` | `[ERROR] Failed to send message. Please try again.` (server logs: "CONTACT_EMAIL environment variable is not configured.") |
| Missing form fields | 400 error (browser validation prevents this) |
| Resend API failure | `[ERROR] Failed to send message. Please try again.` |
| Successful send | `[MESSAGE_SENT] Thank you for reaching out.` |
| Network failure | `[ERROR] Failed to send message. Please try again.` |

## Security Considerations

- API key is server-side only (never exposed to client)
- `replyTo` is set to the submitter's email (no spoofing risk — replies go to them)
- `from` address uses Resend's default `onboarding@resend.dev` domain until a custom domain is verified
- No user input is directly interpolated into HTML (text-only emails)

## Remaining Action for Shivam

1. Sign up at https://resend.com
2. Create an API key
3. Set `RESEND_API_KEY` and `CONTACT_EMAIL` in your deployment environment
4. (Optional) Verify a custom sending domain for branded `from` addresses
5. (Optional) Add rate limiting for production spam protection
