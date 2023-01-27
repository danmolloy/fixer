import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useSession, signIn } from "next-auth/react"
import { Button } from '@mui/material'



export default function Header(props) {
  const { showMenu, setShowMenu } = props
  const { data: session } = useSession()

  return (
    <div className={session ? 'header' : 'landing-page-header'} data-testid="layout-header">
      <Link href={"/"}>
        
        <h2 className='header-title font-title'>
          Fixer
        </h2>
       
      </Link>
      {session 
      ? <button onClick={() => setShowMenu()} data-testid="menu-icon-btn">
          {showMenu 
          ? <AiOutlineClose className='menu-icon' data-testid="close-menu-icon"/>
          : <AiOutlineMenu className='menu-icon' data-testid="menu-icon"/>} 
        </button>
      : <Link href={"/sign-in"}>
          <Button variant="outlined">Sign in</Button>
        </Link>}
    </div>
  )
}