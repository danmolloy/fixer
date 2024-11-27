import ContactForm from './form';
import ContactInfo from './info';

export default function ContactPage() {
  return (
    <div
      data-testid='contact-page'
      className='flex flex-col items-center justify-evenly md:flex-row'
    >
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
