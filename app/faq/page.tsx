import Link from 'next/link';
import { faqData } from './faqData';

export default function FaqIndex() {
  return (
    <div data-testid='faq-index' className='rounded border px-4 py-8 shadow'>
      <div>
        <h1 className='font-bold'>Frequently Asked Questions</h1>
        <p className='py-4'>
          Can{"'"}t find the answer you{"'"}re looking for?{' '}
          <Link
            href='/contact'
            className='font-extrabold text-indigo-600 hover:underline'
          >
            Contact us
          </Link>
          .
        </p>
      </div>
      <div className='py-4'>
        {faqData.map((i) => (
          <div data-testid={`question-${i.id}`} className='py-4' key={i.id}>
            <p className='py-2 text-lg font-bold'>{i.question}</p>
            <p>{i.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
