import React, { useState } from "react"
import { EventWithCalls } from "./menu/calendarEventLink";
import FixerMenu from './menu/fixerMenu';
import PlayerMenu from './menu/playerMenu';
import EventInfo from "./eventInfo";
import DetailHeader from "./detailHeader";
import { Ensemble, Prisma } from "@prisma/client";

export type EventWithEnsemble = Prisma.EventGetPayload<{
  include: {
    ensemble: true
  }
}>

export type EventDetailProps = {
  event: EventWithCalls
  session: any
  ensemble: Ensemble
}


export default function EventDetail(props: EventDetailProps) {
  const { ensemble, event, session } = props
  const [showOptions, setShowOptions] = useState<boolean>(false)

  
  return (
    <div data-testid="event-detail" className={"w-full border shadow rounded-lg py-4 flex justify-center"}>
      {showOptions && 
        (session.user.id === event.fixerId 
        ? <FixerMenu setShowMenu={(arg) => setShowOptions(arg)} event={event} />
        : <PlayerMenu setShowMenu={(arg) => setShowOptions(arg)} event={event} />)
      }
      <table className="flex flex-col items-center w-[96vw] lg:w-1/2">
        <DetailHeader showMenu={showOptions} setShowMenu={(arg) => setShowOptions(arg)} eventTitle={event.eventTitle} />
        <EventInfo ensemble={ensemble} userId={session.user.id} event={event} />
      </table>
  </div>
  )
}

