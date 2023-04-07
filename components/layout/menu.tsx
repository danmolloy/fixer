import Link from "next/link"
import React, { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"

export type MenuItems = {
  name: string
  link: string
  id: string
}[]

interface MenuProps {
  setShowMenu: () => void
  menuItems: MenuItems
}

export default function Menu(props: MenuProps) {
  const { setShowMenu, menuItems } = props

  return (
    <div className="bg-white z-20 mt-24 flex flex-col w-4/5 self-center fixed rounded-2xl border shadow overflow-hidden" data-testid="menu-div">
        <div className="w-full flex flex-col items-center">
          <button onClick={() => setShowMenu()} className="hover:bg-slate-100 self-end m-1 p-2 rounded-full" data-testid={"close-btn"}>
            <AiOutlineClose />
          </button>
        </div>
      {menuItems.map(i => (
        <Link key={i.id} href={`${i.link}`}>
          <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" data-testid={i.id}>
            {i.name}
          </div>
        </Link>
      ))}
    </div>
  )
}