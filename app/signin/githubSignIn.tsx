'use client'

import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa6"

export default function GithubSignIn() {
  return (
    <button
        className="flex flex-row bg-black hover:bg-gray-700 items-center text-white p-1 px-4 rounded"
        data-testid='sign-in-btn'
        onClick={async () => await signIn('github', { redirectTo: '/' })}
      >
        <div className=''>
          <FaGithub />
        </div>
        <p className='ml-1'>Sign in with GitHub</p>
      </button>
  )
}