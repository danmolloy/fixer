'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa6';

export default function GithubSignIn() {
  return (
    <button
      className='flex flex-row items-center rounded  p-1 px-4 border-slate-300 hover:bg-slate-50 border'
      data-testid='sign-in-btn'
      onClick={async () => await signIn('github', { redirectTo: '/' })}
    >
      <div className=''>
        <FaGithub />
      </div>
      <p className='ml-1'>GitHub</p>
    </button>
  );
}
