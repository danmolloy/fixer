import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineBell } from "react-icons/ai";
import { RiCalendar2Line } from 'react-icons/ri'
import { FiUserPlus } from 'react-icons/fi'
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { AdminWithEnsemble } from "../../users/settings/accountInfo/ensembleAdmin";
import { MdGroups } from "react-icons/md";



export const menuItems: {
  name: string
  link: string
  id: string,
  icon: React.ReactNode
}[] = [
  {
    name: "Calendar",
    link: "/",
    id: "calendar-link",
    icon: <RiCalendar2Line />
  },
  {
    name: "Directory",
    link: "/directory",
    id: "directory-link",
    icon: <FiUserPlus />
  },
  {
    name: "Create Event",
    link: "/event/create",
    id: "create-event-link",
    icon: <IoCreateOutline />

  },
  {
    name: "Your Account",
    link: "/account",
    id: "your-details-link",
    icon: <MdOutlineManageAccounts />

  },
  {
    name: "Notifications",
    link: "/notifications",
    id: "notificatons-link",
    icon: <AiOutlineBell />
  },
]

export type SessionMenuProps = {
  setShowMenu: (arg: boolean) => void
  ensembleAdminList: AdminWithEnsemble[]
}

export default function SessionMenu(props: SessionMenuProps) {
  const { setShowMenu, ensembleAdminList } = props;

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
    <div ref={ref} onBlur={() => {setTimeout(() => setShowMenu(false), 150)}} tabIndex={-1} className="duration-500 ease-in bg-white w-2/3 z-20 mt-0 right-0 flex flex-col h-screen fixed  border shadow overflow-hidden p-1" data-testid="session-menu">
        <div className="w-full h-16 flex flex-col items-center">
          <button onClick={() => setShowMenu(false)} className="hover:bg-slate-100 self-end m-1 p-2 rounded-full" data-testid={"close-btn"}>
            <AiOutlineClose />
          </button>
        </div>
        {ensembleAdminList.length > 0 
        && <div data-testid="ensembles-list">
          <div className="w-full  px-2 py-1 items-center flex flex-row">
            <MdGroups />
            <p className=" p-4 text-black">Your Ensembles</p>
          </div>
        {ensembleAdminList.map(i => (
          <Link className="w-full hover:bg-slate-100 hover:text-indigo-600 p-4 justify-center items-center flex flex-row"  key={i.id} href={`/ensembles/${i.ensembleId}`}>
            {i.ensemble.name}
          </Link>
        ))}
        </div>}
        {menuItems.map(i => (
          <Link data-testid={i.id} key={i.id} href={`${i.link}`}>
          <div className="w-full hover:bg-slate-100 hover:text-indigo-600 p-2 items-center flex flex-row" >
            <div data-testid={`${i.name}-icon`}>
              {i.icon}
            </div>
            <p className="p-4  text-black">{i.name}</p>
          </div>
        </Link> 
        ))}
        <button data-testid="sign-out-btn" onClick={() => signOutUser()} className="w-full text-start  hover:bg-slate-100 hover:text-indigo-600 p-2 flex flex-row justify-start items-center">
          <div>
            <IoMdExit />
          </div>
          <p className="p-3 text-black">Sign Out</p>
        </button>
    </div>
  )
}