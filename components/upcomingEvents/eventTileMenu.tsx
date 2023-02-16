import Link from "next/link"
import React from "react"
import { AiOutlineClose } from "react-icons/ai"

const menuLinks: {
  id: string
  name: string
  link: string
}[] = [
  {
    id: "gig-link",
    name: "View Gig",
    link: ""
  },
  {
    id: "fixer-link",
    name: "Fixer Details",
    link: ""
  },
  {
    id: "parts-link",
    name: "Request Parts",
    link: ""
  },
  /* {
    id: "maps-link",
    name: "Google Maps",
    link: ""
  } */
]

interface EventTileMenu {
  setShowMenu: () => void
}

export default function EventTileMenu(props: EventTileMenu) {
  const { setShowMenu } = props
  return (
    <div data-testid="event-tile-menu" className="opacity-100 rounded-lg border shadow flex flex-col w-72 items-center bg-white z-10 self-center absolute">
      <div className="w-full flex flex-row justify-end p-1">
        <button className="hover:bg-slate-100 p-1 rounded-full" data-testid="close-menu-btn" onClick={() => setShowMenu()}>
          <AiOutlineClose />
        </button>
      </div>
      {menuLinks.map(i => (
        <Link className="p-1 hover:bg-slate-100 w-full" href={i.link} key={i.id} data-testid={i.id}>
          {i.name}
        </Link>
      ))}
    </div>
  )
}