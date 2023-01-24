import { useSession, signIn, signOut } from "next-auth/react"
import { AiFillGithub } from 'react-icons/ai'
import SignInOptions from "./signInOptions"
import SignOutBtn from "./signOutBtn"

export default function SignIn() {
  const { data: session } = useSession()

  return (
    <div className="border flex flex-col items-center justify-center p-8 h-96 shadow">
      <h2 className='header-title font-title'>
          Fixer
      </h2>
      <br />
    {session 
    ? <SignOutBtn />
    : <SignInOptions />
    }
    </div>
  )
}