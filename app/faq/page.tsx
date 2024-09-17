import Link from 'next/link';
import { faqData } from './faqData';
import FAQuestion from './question';

export default function FaqIndex() {
  return (
    <div data-testid='faq-index' className='px-4 py-8'>
      <div>
        <h1 className='font-bold'>Frequently Asked Questions</h1>
        <p className='py-4'>
          Can{"'"}t find the answer you{"'"}re looking for?{' '}
          <Link
            href='/contact-us'
            className='font-extrabold text-blue-600 hover:underline'
          >
            Contact us
          </Link>
          .
        </p>
      </div>
      <div className='py-4'>
        {faqData.map((i) => (
          <FAQuestion
            key={i.id}
            id={i.id}
            question={i.question}
            answer={i.answer}
          />
        ))}
      </div>
    </div>
  );
}
