'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa6';

export default function GithubSignIn() {
  return (
    <button

      className='flex flex-row items-center rounded border border-slate-300 p-1 px-4 hover:bg-slate-50'
      data-testid='github-sign-in'
      onClick={async () => await signIn('github', { redirectTo: '/' })}
    >
      <div className=''>
        <FaGithub />
      </div>
      <p className='ml-1'>GitHub</p>
    </button>
  );
}
