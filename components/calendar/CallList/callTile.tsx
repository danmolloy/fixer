import { useState } from "react"
import { CallWithEvent } from "../../upcomingEvents/upcomingEvents"
import { BsThreeDotsVertical } from "react-icons/bs"
import { DateTime } from "luxon"

export type CallTileProps = {
  eventCall: CallWithEvent
}

export default function CallTile(props: CallTileProps) {
  const { eventCall } = props
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div data-testid={`${eventCall.id}-call-tile`}>
      <button data-testid="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <BsThreeDotsVertical />
      </button>
      <h3>{eventCall.event.ensembleName}</h3>
      <div>
        <p>{DateTime.fromJSDate(new Date(eventCall.startTime)).toFormat("hh:mm a")}</p>
      </div>
      <div>
        <p>{eventCall.venue}</p>
      </div>
    </div>
  )
}