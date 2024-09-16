import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

export default function ContactInfo() {
  return (
    <div data-testid='contact-info' className='bg-slate-50 px-4 py-12'>
      <h1 className='font-bold'>Get in touch</h1>
      <p className='py-4 md:w-2/3'>
        Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie
        a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu sed malesuada
        et magna.
      </p>
      <div className='my-2 flex flex-row items-center'>
        <div className='text-xl'>
          <AiOutlinePhone />
        </div>
        <p className='ml-2'>+44 (0)7 555 555 555</p>
      </div>
      <div className='my-2 flex flex-row items-center'>
        <div className='text-xl'>
          <AiOutlineMail />
        </div>
        <p className='ml-2'>contact@gigfix.com</p>
      </div>
    </div>
  );
}
