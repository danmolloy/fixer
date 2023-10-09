import ContactForm from "./contactForm";
import ContactInfo from "./contactInfo";

export default function ContactIndex() {
  return (
    <div className="border rounded shadow">
      <ContactInfo />
      <ContactForm />
    </div>
  )
}