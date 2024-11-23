import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

export default function ContactInfo() {
  return (
    <div data-testid='contact-info' className='bg-slate-50 px-4 py-12 w-full  h-full md:h-[90vh] md:-mb-16 flex flex-col '>
      <h1 className='font-bold'>Get in touch</h1>
      <p className='py-8  '>
        Use our contact form or use one of the following lines of contact.
        <br />
        We will endeavour to reply as soon as possible.
      </p>
      <div>
        <div className='flex flex-row items-center my-1'>
          <AiOutlinePhone />
          <p className='ml-1'>+44 7479 016 386</p>
        </div>
        <div className='flex flex-row items-center my-1'>
          <AiOutlineMail />
          <p className='ml-1'>danmolloy91@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
