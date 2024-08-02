'use client'
import { signOut } from "../auth";

export default function SignOutBtn() {
  return (
    <button data-testid="sign-out-btn" onClick={() => signOut({redirectTo: "/"})}>
      Sign out
    </button>
  )
}