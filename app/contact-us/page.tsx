import ContactForm from './form';
import ContactInfo from './info';

export default function ContactPage() {
  return (
    <div data-testid='contact-page' className=' flex flex-col md:flex-row justify-evenly items-center'>
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
