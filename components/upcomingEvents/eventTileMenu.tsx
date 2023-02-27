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
    <div data-testid="event-tile-menu" className="opacity-100 rounded-lg border shadow flex flex-col md:ml-60 lg:ml-96 right-6 md:right-auto w-36 items-center bg-white z-10 absolute">
      <div className="w-full flex flex-row justify-end p-1">
        <button className="hover:bg-slate-100 rounded-full" data-testid="close-menu-btn" onClick={() => setShowMenu()}>
          <AiOutlineClose />
        </button>
      </div>
      <Link className="p-1 text-center hover:bg-slate-100 w-full" href={`/event/${eventId}`} data-testid={"gig-link"}>
        View Gig
      </Link>
      <button className=" p-1 hover:bg-slate-100 w-full" data-testid="fixer-link">
        Fixer Details
      </button>
      <button className="p-1 hover:bg-slate-100 w-full" data-testid="parts-link">
        Request Parts
      </button>
    </div>
  )
}