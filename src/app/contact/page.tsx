import { ContactForm } from "./ContactForm"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Shivam Singh — a full-stack engineer open to software engineering roles and technical collaborations.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactForm />
}
