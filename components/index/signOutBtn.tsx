import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function SignOutBtn() {
  return (
    <div className="flex flex-col justify-center h-full" data-testid="signout-btn">
      <button className="m-2 border p-2 rounded flex flex-row items-center w-72 hover:bg-slate-200 active:bg-slate-300 justify-center" onClick={() => signOut()}>Sign out</button>
    </div>
  )
}