import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useSession } from "next-auth/react"
import React from 'react'
import Menu from './menu'
import LandingHeader from '../landingPage/header'

interface HeaderProps {
  showMenu: boolean
  setShowMenu: (bool: boolean) => void
  session?: boolean
}

export const menuItems: {
  name: string
  link: string
  id: string
}[] = [
  {
    name: "Calendar",
    link: "/",
    id: "calendar-link"
  },
  {
    name: "Directory",
    link: "/directory",
    id: "directory-link"
  },
  {
    name: "Create Event",
    link: "/event/create",
    id: "create-event-link"
  },
  {
    name: "Notifications",
    link: "/",
    id: "notificatons-link"
  },
]

export default function Header(props: HeaderProps) {
  const { showMenu, setShowMenu, session } = props

  if (session === false) {
    return (
      <LandingHeader showMenu={showMenu} setShowMenu={() => setShowMenu(!showMenu)} />
    )
  }

  return (
    <div className={showMenu === true ? "blur h-20 flex flex-row items-center justify-between" : "h-20 flex flex-row items-center justify-between"} data-testid="layout-header">
      <Link href={"/"}>
      <h2 className={' p-2 text-2xl mx-2 md:mx-10  '}>
        Gig<span className="text-blue-600 font-semibold">Fix</span>
      </h2>
       
      </Link>

        <div className='w-full justify-end hidden md:flex flex-row mr-2' data-testid="nav-bar">
          {menuItems.map(i => (
            <Link href={i.link} key={i.id} data-testid={i.id} className='hover:bg-slate-100 p-1 mx-4 rounded text-slate-600 text-sm'>
              {i.name}
            </Link>
          ))}
        </div>
        <button onClick={() => setShowMenu(!showMenu)} data-testid="menu-icon-btn" className='md:hidden'>
          {showMenu 
          ? <AiOutlineClose className='menu-icon' data-testid="close-menu-icon"/>
          : <AiOutlineMenu className='menu-icon' data-testid="menu-icon"/>} 
          
        </button> 
    </div>
  )
}