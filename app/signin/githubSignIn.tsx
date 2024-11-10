'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa6';

export default function GithubSignIn() {
  return (
    <button
      className='flex flex-row items-center rounded bg-black p-1 px-4 text-white hover:bg-gray-700'
      data-testid='sign-in-btn'
      onClick={async () => await signIn('github', { redirectTo: '/' })}
    >
      <div className=''>
        <FaGithub />
      </div>
      <p className='ml-1'>Sign in with GitHub</p>
    </button>
  );
}
