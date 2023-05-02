import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose, AiOutlineBell } from 'react-icons/ai'
import React from 'react'
import LandingHeader from '../landingPage/header'
import useSWR from "swr";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

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
    name: "Your Account",
    link: "/settings",
    id: "your-details-link"
  },
  
  {
    name: "Notifications",
    link: "/notifications",
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
            <Link href={i.link} key={i.id} data-testid={i.id} className='hover:bg-slate-100 p-1 mx-4 rounded text-slate-600 text-sm flex flex-row items-center'>
              {/* notifications && i.name === "Notifications"
                && <div  className='animate-ping w-2 h-2 rounded-full z-10 absolute bg-red-500 ml-20 mb-4'/> */}
              {i.name}
            </Link>
          ))}
        </div>
        <div className='md:hidden flex flex-row items-center'>
        <Link href="/notifications" className='flex items-center justify-center text-2xl p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full'>
         {/* notifications && <div  className='animate-ping w-2 h-2 rounded-full z-10 absolute bg-red-500 -mr-4 -mt-4'/> */}
          <AiOutlineBell />
        </Link>
        <button onClick={() => setShowMenu(!showMenu)} data-testid="menu-icon-btn" >
          {showMenu 
          ? <AiOutlineClose className='p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full' data-testid="close-menu-icon"/>
          : <AiOutlineMenu className='p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full' data-testid="menu-icon"/>} 
        </button> 
        </div>
    </div>
  )
}