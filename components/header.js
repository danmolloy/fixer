import Link from 'next/link'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSession, signIn } from "next-auth/react"



export default function Header() {
  const { data: session } = useSession()

  return (
    <div className={session ? 'header' : 'landing-page-header'}>
      <Link href={"/"}>
        
        <h2 className='header-title'>
          Fixer
        </h2>
        
      </Link>
      {session 
      ? <AiOutlineMenu className='menu-icon'/> 
      : <button id="signin-btn" onClick={() => signIn('github')} className="signin-btn">Sign in</button>}
    </div>
  )
}