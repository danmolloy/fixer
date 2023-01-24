import { useSession, signIn, signOut } from "next-auth/react"
import { AiFillGithub } from 'react-icons/ai'

export default function SignInOptions() {

  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-2xl text-slate-700">
        Welcome
      </h2>
      <button onClick={() => signIn("github")} className="sign-in-btn">
        <div className=" text-2xl m-2">
          <AiFillGithub />
        </div>
        <p className="self-center">Continue with GitHub</p>
      </button>
    </div>
  )
}