import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function LoginBtn() {
  const { data: session } = useSession()
  if (session ) {
    return (
      <div className="flex flex-col items-center text-base" data-testid="logout-btn">
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()} className="border border-blue-300 text-blue-600 rounded shadow hover:border-blue-600 hover:bg-blue-50 active:bg-blue-300 w-20 m-1 p-1 bg-white">Sign out</button>
      </div>
    )
  }
  return (
    <div className="flex flex-col" data-testid="login-btn">
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}