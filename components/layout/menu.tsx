import Link from "next/link"
import React, { useEffect } from "react"
import { menuItems } from "./header"


export default function Menu(props) {
  const { setShowMenu } = props

  return (
    <div className="bg-white z-20 mt-24 flex flex-col w-4/5 self-center absolute rounded-2xl border shadow overflow-hidden" data-testid="menu-div">
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