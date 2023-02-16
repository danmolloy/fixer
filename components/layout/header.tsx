import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useSession, signIn } from "next-auth/react"
import { Button } from '@mui/material'
import React from 'react'

interface HeaderProps {
  showMenu: boolean
  setShowMenu: () => void
}

export default function Header(props: HeaderProps) {
  const { showMenu, setShowMenu } = props
  const { data: session } = useSession()

  return (
    <div className="h-20 flex flex-row items-center justify-between" data-testid="layout-header">
      <Link href={"/"}>
        
      <h2 className={' p-2 text-2xl mx-10  '}>
            Gig<span className="text-blue-600 font-semibold">Fix</span>
          </h2>
       
      </Link>
      {session 
      && <button onClick={() => setShowMenu()} data-testid="menu-icon-btn">
          {showMenu 
          ? <AiOutlineClose className='menu-icon' data-testid="close-menu-icon"/>
          : <AiOutlineMenu className='menu-icon' data-testid="menu-icon"/>} 
        </button>
      /* : <Link href={"/sign-in"}>
          <Button variant="outlined">Sign in</Button>
        </Link> */}
    </div>
  )
}