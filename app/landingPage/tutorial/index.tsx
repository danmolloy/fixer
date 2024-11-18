'use client';
import { useState } from 'react';
import { tutorialData } from './lib';
import Image from 'next/image';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

export default function TutorialIndex() {
  const [indexNum, setIndexNum] = useState<number>(0);

  return (
    <div data-testid="tutorial-index" className='flex min-h-[120vh] w-full flex-col justify-center bg-slate-200 p-4 py-36 text-black transition-all'>
      <div className='text-center'>
        <p className='text-lg text-blue-600'>How it works</p>
        <h2 className='text-3xl font-medium'>
          {tutorialData[indexNum].header}
        </h2>
      </div>
      <div className='my-8 flex w-full flex-col transition-all md:flex-row'>
        <div className='mb-4 self-center px-12 transition-all md:w-1/2'>
          <p>{tutorialData[indexNum].body}</p>
        </div>
        <Image
          className='h-60 w-60 self-center transition-all md:w-1/2'
          alt={`${tutorialData[indexNum].header} illustration`}
          src={tutorialData[indexNum].svg}
        />
      </div>
      <div className='flex flex-row items-center justify-center'>
        <button
                data-testid="left-btn"

          className='m-2 rounded p-2 text-lg hover:bg-slate-300 disabled:opacity-30'
          disabled={indexNum === 0}
          onClick={() => setIndexNum(indexNum - 1)}
        >
          <FaAngleLeft />
        </button>
        <button
        data-testid="right-btn"
          className='m-2 rounded p-2 text-lg hover:bg-slate-300 disabled:opacity-30'
          disabled={indexNum === tutorialData.length - 1}
          onClick={() => setIndexNum(indexNum + 1)}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}
