'use client'

import { signIn } from "next-auth/react"

export default function SignUpBtn() {
  return (
    <button
        className="text-blue-600 hover:underline ml-1"
        data-testid='sign-in-btn'
        onClick={async () => await signIn('github', { redirectTo: '/' })}
      >
      Sign Up
      </button>
  )
}