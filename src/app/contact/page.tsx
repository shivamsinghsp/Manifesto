import { Metadata } from "next"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shivam Singh — a full-stack engineer open to opportunities in web application and enterprise platform development.",
}

export default function ContactPage() {
  return <ContactForm />
}
