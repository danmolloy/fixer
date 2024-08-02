'use client'
import { signIn } from "../auth"

export default function SignInBtn() {
  return (
    <button data-testid="sign-in-btn" onClick={() => signIn("github", { redirectTo: "/" })}>
      Sign in
    </button>
  )
}