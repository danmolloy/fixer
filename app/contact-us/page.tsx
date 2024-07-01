import ContactForm from "./form";
import ContactInfo from "./info";

export default function ContactPage() {
  return (
    <div data-testid="contact-page">
      <ContactInfo />
      <ContactForm />
    </div>
  )
}