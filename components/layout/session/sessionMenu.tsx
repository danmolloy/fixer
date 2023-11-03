import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

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

export type SessionMenuProps = {
  setShowMenu: (arg: boolean) => void
}

export default function SessionMenu(props: SessionMenuProps) {
  const { setShowMenu} = props;

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
    <div ref={ref} onBlur={() => setTimeout(() => setShowMenu(false), 150)} tabIndex={-1} className="transition duration-500 ease-out bg-white z-20 mt-12 flex flex-col w-full sm:w-4/5 self-center fixed rounded-2xl border shadow overflow-hidden " data-testid="session-menu">
        <div className="w-full flex flex-col items-center">
          <button onClick={() => setShowMenu(false)} className="hover:bg-slate-100 self-end m-1 p-2 rounded-full" data-testid={"close-btn"}>
            <AiOutlineClose />
          </button>
        </div>
        {menuItems.map(i => (
          <Link data-testid={i.id} key={i.id} href={`${i.link}`}>
          <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
            {i.name}
          </div>
        </Link> 
        ))}
        <button data-testid="sign-out-btn" onClick={() => signOutUser()} className="w-full text-start hover:bg-slate-100 py-4 pl-4 font-light">
          Sign Out
        </button>
    </div>
  )
}