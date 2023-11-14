import { signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import FixerMenu from "../event/eventDetail/menu/fixerMenu"
import { EventWithCalls } from "../event/eventDetail/menu/calendarEventLink" 


export type MenuItems = {
  name: string
  link?: string
  id: string
}[]

export type MenuProps = {
  setShowMenu: () => void
  menuItems?: MenuItems
  signedIn: boolean
  signInBtn?: boolean
  fixerMenu?: boolean
  eventId?: number
  data?: EventWithCalls
}

export default function Menu(props: MenuProps) {
  const { setShowMenu, menuItems, signedIn, signInBtn, fixerMenu, eventId, data } = props;
  const router = useRouter();
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  const signOutUser = () => {
    signOut();
    router.push("/")
  }

  return (
    <div ref={ref} onBlur={() => setTimeout(() => setShowMenu(), 150)} tabIndex={-1} className="transition duration-500 ease-out bg-white z-20 mt-12 flex flex-col w-full sm:w-4/5 self-center fixed rounded-2xl border shadow overflow-hidden " data-testid="menu-div">
        <div className="w-full flex flex-col items-center">
          <button onClick={() => setShowMenu()} className="hover:bg-slate-100 self-end m-1 p-2 rounded-full" data-testid={"close-btn"}>
            <AiOutlineClose />
          </button>
        </div>
      {fixerMenu 
      ? <FixerMenu data={data} eventId={eventId} />
      : menuItems.map(i => (
        i.link 
        ? <Link key={i.id} href={`${i.link}`}>
          <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" data-testid={i.id}>
            {i.name}
          </div>
        </Link> 
        : <button key={i.id} className="cursor-pointer w-full text-start">
            <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" data-testid={i.id}>
              {i.name}
            </div>
          </button>
      ))}
      {signInBtn === false
        ? null
        : signedIn
        ? <button onClick={() => signOutUser()} className="w-full text-start hover:bg-slate-100 py-4 pl-4 font-light">
            Sign Out
          </button>
        : <button onClick={() => signIn("github")} className="w-full text-start hover:bg-slate-100 py-4 pl-4 font-light">
            Sign In
          </button>
      }
      
    </div>
  )
}