import Link from "next/link"
import React from "react"
import { AiOutlineClose } from "react-icons/ai" 
import MenuShell from "../index/menuShell"
import MenuItem from "../index/menuItem"

interface EventTileMenu {
  setShowMenu: () => void
  eventId: number
  eventTitle: string
}

export default function EventTileMenu(props: EventTileMenu) {
  const { setShowMenu, eventId, eventTitle } = props
  return (
    <MenuShell title={eventTitle} setShowMenu={() => setShowMenu()}>
      <MenuItem>
        <Link className="w-full " href={`/event/${eventId}`} data-testid={"gig-link"}>
          <p className=" w-full">
          View Gig
          </p>
        </Link>
      </MenuItem>
      <MenuItem>
        <button className="w-full "  data-testid="fixer-link">
          Fixer Details
        </button>
      </MenuItem>
      <MenuItem>
        <button className="w-full " data-testid="parts-link">
          Request Parts
        </button>
      </MenuItem>
    </MenuShell>
    
  )
}

{/* <div data-testid="event-tile-menu" className=" w-full flex flex-row justify-evenly">
      <Link className="border rounded shadow-sm border-blue-500 text-blue-500 hover:bg-blue-50 w-full h-full flex flex-row justify-center items-center" href={`/event/${eventId}`} data-testid={"gig-link"}>
        View Gig
      </Link>
      <button className="border rounded mx-1 shadow-sm border-green-500 text-green-500 hover:bg-green-50 w-full h-full flex flex-row justify-center items-center" data-testid="fixer-link">
        Fixer Details
      </button>
      <button className="border rounded shadow-sm border-amber-500 text-amber-500 hover:bg-amber-50 w-full h-full flex flex-row justify-center items-center" data-testid="parts-link">
        Request Parts
      </button>
    </div> */}