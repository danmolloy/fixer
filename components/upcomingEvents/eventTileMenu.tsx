import Link from "next/link"
import React from "react"
import { AiOutlineClose } from "react-icons/ai"

interface EventTileMenu {
  setShowMenu: () => void
  eventId: number
}

export default function EventTileMenu(props: EventTileMenu) {
  const { setShowMenu, eventId } = props
  return (
    <div data-testid="event-tile-menu" className=" w-full flex flex-row justify-evenly">
      <Link className="hover:bg-slate-100 w-full h-full flex flex-row justify-center items-center" href={`/event/${eventId}`} data-testid={"gig-link"}>
        View Gig
      </Link>
      <button className="hover:bg-slate-100 w-full h-full flex flex-row justify-center items-center" data-testid="fixer-link">
        Fixer Details
      </button>
      <button className="hover:bg-slate-100 w-full h-full flex flex-row justify-center items-center" data-testid="parts-link">
        Request Parts
      </button>
    </div>
  )
}