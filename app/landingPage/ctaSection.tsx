'use client';

import { signIn } from 'next-auth/react';

export default function CTASection() {
  return (
    <div
      data-testid='cta-section'
      className='flex min-h-[80vh] flex-col items-center justify-center bg-blue-600 px-8 py-32 text-white'
    >
      <p className='text-4xl font-semibold'>Ready to tune?</p>
      <p className='text-4xl font-semibold'>Start your free trial today.</p>
      <button
        onClick={async () => await signIn('github', { redirectTo: '/' })}
        className='mt-12 w-24 self-center rounded bg-white p-2 text-blue-600 hover:bg-blue-50'
      >
        Sign Up
      </button>
    </div>
  );
}
