'use client';
import { signIn } from 'next-auth/react';

export function EmailSignIn() {
  const sendgridAction = (formData: FormData) => {
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    signIn('sendgrid', formDataObj);
  };

  return (
    <form action={sendgridAction} className='flex w-full flex-col'>
      <input
        type='email'
        name='email'
        placeholder='example@company.com'
        className='my-1 w-72 rounded border p-2 text-sm'
      />
      <input
        type='submit'
        className='my-2 rounded bg-blue-600 p-2 text-sm text-white hover:bg-blue-500'
        value='Sign in'
      />
    </form>
  );
}
