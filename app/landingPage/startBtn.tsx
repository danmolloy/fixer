'use client'
import { signIn } from "next-auth/react"

export default function StartBtn() {
  return (
    <button data-testid="start-btn" onClick={async () => {
      await signIn("github", { redirectTo: "/" })
    }} className="m-2 bg-black hover:bg-slate-700 text-white rounded-full py-2 px-4 text-sm ">
      Start now
      </button>
  )
}