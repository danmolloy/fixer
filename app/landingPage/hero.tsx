import Link from 'next/link';
import React from 'react';
import StartBtn from './startBtn';

export default function Hero() {
  return (
    <div
      className={`/* flex h-[90vh] flex-col items-center bg-gradient-to-b from-white via-blue-300 to-white text-center`}
      data-testid='hero-div'
    >
      <div className='flex h-full flex-col items-center justify-center bg-white/80 backdrop-blur-xl'>
        <h1 className='-mt-12 px-12 pb-4 text-4xl md:text-6xl'>
          Communication made <span className='text-blue-600'>simple</span> for
          fixers and musicians.
        </h1>
        <p className='p-4 text-lg text-slate-700'>
          Effortless fixing and seamless communications for orchestras and
          musicians.
        </p>
        <div className='flex w-full flex-row flex-wrap justify-center'>
          <StartBtn />
          <Link
            href='/about'
            className='m-2 rounded border px-4 py-2 text-sm text-black hover:border-slate-300'
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
