import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <div
      className={`/* flex h-[90vh] flex-col items-center text-center`}
      data-testid='hero-div'
    >
      <div className='flex h-full w-full flex-col text-black items-center justify-start bg-white/80 backdrop-blur-xl'>
        <h1 className=' mt-12 pb-4 px-4 text-4xl md:text-6xl font-semibold'>
          Communication made <span className='text-blue-600'>simple</span> for
          orchestras.
        </h1>
        <p data-testid='tagline' className='px-4  text-lg '>
          Effortless booking and seamless communications for fixers.
        </p>
        <div className='flex w-full flex-row flex-wrap justify-center mt-48'>
          <Link
            href='/signup'
            className='m-2 rounded bg-black px-4 py-2 text-sm text-white hover:bg-slate-800'
          >
            Start now
          </Link>
          <Link
            href='/about'
            className='m-2 rounded border border-slate-300 px-4 py-2 text-sm text-black hover:border-slate-400'
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
