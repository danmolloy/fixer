import ContactForm from "./contactForm";
import ContactInfo from "./contactInfo";

export default function ContactIndex() {
  return (
    <div data-testid="contact-index" className="border rounded shadow">
      <ContactInfo />
      <ContactForm />
    </div>
  )
}