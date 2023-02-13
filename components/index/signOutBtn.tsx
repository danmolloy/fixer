import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function SignOutBtn() {
  return (
    <div className="flex flex-col justify-center h-full">
      <button className="sign-in-btn justify-center" onClick={() => signOut()}>Sign out</button>
    </div>
  )
}