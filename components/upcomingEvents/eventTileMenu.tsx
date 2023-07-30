import Link from "next/link"
import React from "react"
import { AiOutlineClose } from "react-icons/ai" 
import MenuShell from "../index/menuShell"
import MenuItem from "../index/menuItem"

export type EventTileMenuProps = {
  setShowMenu: () => void
  eventId: number
  eventTitle: string
}

export default function EventTileMenu(props: EventTileMenuProps) {
  const { setShowMenu, eventId, eventTitle } = props
  return (
    <MenuShell testId="event-tile-menu" title={eventTitle} setShowMenu={() => setShowMenu()}>
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