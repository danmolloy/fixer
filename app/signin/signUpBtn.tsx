'use client';

import { signIn } from 'next-auth/react';

export default function SignUpBtn() {
  return (
    <button
      className='ml-1 text-blue-600 hover:underline'
      data-testid='sign-in-btn'
      onClick={async () => await signIn('github', { redirectTo: '/' })}
    >
      Sign Up
    </button>
  );
}
