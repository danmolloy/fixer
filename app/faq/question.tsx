'use client';
import { FaPlus, FaMinus } from 'react-icons/fa6';

import { useState } from 'react';

export type FAQuestionProps = {
  id: number;
  question: string;
  answer: string;
};

export default function FAQuestion(props: FAQuestionProps) {
  const { question, answer } = props;
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div className='border-t p-4'>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className='flex w-full flex-row items-center justify-between py-2'
      >
        <p className='font-semibold'>{question}</p>
        {showAnswer ? <FaMinus /> : <FaPlus />}
      </button>
      {showAnswer && <p className='my-2 text-gray-600'>{answer}</p>}
    </div>
  );
}
