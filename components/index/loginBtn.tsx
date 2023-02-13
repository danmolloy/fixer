import { Button } from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function LoginBtn() {
  const { data: session } = useSession()
  if (session !== null) {
    return (
      <div className="flex flex-col items-center text-base">
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()} className="secondary-btn w-20 m-1 p-1 bg-white">Sign out</button>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      Not signed in <br />
      <Button variant="outlined" onClick={() => signIn()}>Sign in</Button>
    </div>
  )
}