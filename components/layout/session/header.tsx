import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose, AiOutlineBell } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'

export type SessionHeaderProps = {
  showMenu: boolean
  setShowMenu: (bool: boolean) => void
  notifications: boolean
  setReducedHeader: (arg: boolean) => void
  reducedHeader: boolean
}

export const menuItems: {
  name: string
  link: string
  id: string
}[] = [
  {
    name: "Notifications",
    link: "/notifications",
    id: "notificatons-link"
  },
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
]

export default function SessionHeader(props: SessionHeaderProps) {
  const { showMenu, setShowMenu, notifications, reducedHeader, setReducedHeader } = props
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentPosition = window.scrollY;
      if (currentPosition > scrollPosition + 50) {
        setScrollPosition(currentPosition);
        setReducedHeader(true)
      } else if (currentPosition < scrollPosition - 5) {
        setScrollPosition(currentPosition);
        setReducedHeader(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className={` ${reducedHeader ? "h-12" : "h-16"} transition-all bg-white fixed top-0 w-screen shadow z-30 flex flex-row items-center justify-between`} data-testid="session-header">
      <Link data-testid="home-link" href="/" >
        <h2 className={`${reducedHeader ? "hidden" : "text-2xl"} p-2 mx-2 md:mx-10 font-nunito`}>
          Gig<span className="text-blue-600 font-semibold">Fix</span>
        </h2>
      </Link>
      <div className='w-full justify-end hidden md:flex flex-row mr-2' data-testid="nav-bar">
        {menuItems.map(i => (
          <Link href={i.link} key={i.id} data-testid={i.id} className='hover:bg-slate-100 p-1 mx-4 rounded text-slate-600 text-sm flex flex-row items-center'>
            {notifications && i.name === "Notifications"
              && <div  className='animate-ping w-2 h-2 rounded-full z-10 absolute bg-red-500 ml-20 mb-4'/>}
            {i.name}
          </Link>))}
        </div>
        <div className='md:hidden flex flex-row items-center'>
          <Link href="/notifications" className='flex items-center justify-center text-2xl p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full'>
          {notifications && <div data-testid="notifications-ping" className='animate-ping w-2 h-2 rounded-full z-10 absolute bg-red-500 -mr-4 -mt-4'/>}
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