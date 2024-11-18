'use client';
import Link from 'next/link';

export default function CTASection() {
  return (
    <div
      data-testid='cta-section'
      className='-mb-16 flex min-h-[80vh] flex-col items-center justify-center bg-blue-600 px-8 py-32 text-white'
    >
      <p className='text-4xl font-semibold'>Ready to tune?</p>
      <p className='text-4xl font-semibold'>Sign up for free.</p>
      <Link
        href='/signup'
        className='mt-12 flex w-24 items-center justify-center self-center rounded bg-white p-2 text-blue-600 hover:bg-blue-50'
      >
        Start
      </Link>
    </div>
  );
}
