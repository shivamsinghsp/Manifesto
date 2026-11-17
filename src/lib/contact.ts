import { z } from "zod"

export const CONTACT_LIMITS = {
  name: 100,
  company: 120,
  email: 200,
  messageMin: 10,
  messageMax: 5000,
  /** Submissions faster than this after the form rendered are treated as bots. */
  minFillMs: 2500,
} as const

/** Shared by the client form and /api/contact so both validate identically. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(CONTACT_LIMITS.name, `Name must be ${CONTACT_LIMITS.name} characters or fewer.`),
  company: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.company, `Company must be ${CONTACT_LIMITS.company} characters or fewer.`)
    .optional()
    .default(""),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(CONTACT_LIMITS.email, "That email address is too long.")
    .email("Please enter a valid email address, e.g. alex@company.com."),
  message: z
    .string()
    .trim()
    .min(
      CONTACT_LIMITS.messageMin,
      `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`
    )
    .max(
      CONTACT_LIMITS.messageMax,
      `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer.`
    ),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactField = keyof ContactInput
export type FieldErrors = Partial<Record<ContactField, string>>

export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}
