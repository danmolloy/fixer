import React, { useState } from "react"
import { EventWithCalls } from "./menu/calendarEventLink";
import FixerMenu from './menu/fixerMenu';
import PlayerMenu from './menu/playerMenu';
import EventInfo from "./eventInfo";
import DetailHeader from "./detailHeader";


export type EventDetailProps = {
  event: EventWithCalls
  session: any
}


export default function EventDetail(props: EventDetailProps) {
  const { event, session } = props
  const [showOptions, setShowOptions] = useState<boolean>(false)

  
  return (
    <div data-testid="event-detail" className={"w-full border shadow rounded-lg py-4"}>
      {showOptions && 
        (session.user.id === event.fixerId 
        ? <FixerMenu event={event} />
        : <PlayerMenu event={event} />)
      }
      <table>
        <DetailHeader showMenu={showOptions} setShowMenu={(arg) => setShowOptions(arg)} eventTitle={event.eventTitle} />
        <EventInfo event={event} />
      </table>
  </div>
  )
}

