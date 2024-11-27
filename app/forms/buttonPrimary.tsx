'use client';
import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export type ButtonPrimaryProps = {
  isSubmitting?: boolean;
  disabled: boolean;
  handleClick: (e?: Event) => void;
  id: string;
  text: string;
  className: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  const { handleClick, id, text, className, type, isSubmitting, disabled } =
    props;

  return (
    <button
      disabled={isSubmitting === true || disabled === true ? true : false}
      type={type}
      className={`${className} m-1 flex items-center justify-center rounded border px-2 py-1 shadow-sm`}
      data-testid={id}
      onClick={() => handleClick()}
    >
      {isSubmitting === true ? (
        <div className='animate-spin p-1 text-blue-600'>
          <p className='hidden'>Submitting</p>
          {<AiOutlineLoading />}
        </div>
      ) : (
        text
      )}
    </button>
  );
}
