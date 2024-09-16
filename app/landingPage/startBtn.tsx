'use client';
import { signIn } from 'next-auth/react';

export default function StartBtn() {
  return (
    <button
      data-testid='start-btn'
      onClick={async () => {
        await signIn('github', { redirectTo: '/' });
      }}
      className='m-2 rounded bg-black px-4 py-2 text-sm text-white hover:bg-slate-800'
    >
      Start now
    </button>
  );
}
