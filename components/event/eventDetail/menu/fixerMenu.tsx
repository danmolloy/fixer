import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { EventWithCalls } from "./calendarEventLink" 
import CalendarEventLink from "./calendarEventLink"
import { useEffect, useRef } from "react"

export type FixerMenuProps = {
  event: EventWithCalls
  setShowMenu: (arg: boolean) => void
}

export default function FixerMenu(props: FixerMenuProps) {
  const { event, setShowMenu } = props;
  const router = useRouter()
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  const messageAll = async () => {
    const fixerMessage = prompt(`What is your message to all booked musicians?`)
    const reqBody = {
      message: 
      `Dan Molloy sends the following message to all players of Event ${event.id}: 
      "${fixerMessage}"`,
      eventId: event.id
    }
    if (fixerMessage === null || fixerMessage.length === 0) {
      return;
    } else {
      return axios.post("/api/event/msgAllPlayers", reqBody);
    }
  }

  const cancelEvent = async () => {
    const fixerMessage = prompt(`What is your message to all booked musicians about the cancellation?`)
    const reqBody = {
      message: 
      `Dan Molloy has cancelled event ${event.id}. They send the following message to all players: 
      "${fixerMessage}"`,
      eventId: event.id
    }
    if (fixerMessage === null || fixerMessage.length === 0) {
      return;
    } else {
      return axios.post("/api/event/cancel", reqBody).then(() => router.push("/"));
    }
  }

  const exportToCSV = () => {
    let csvData = [];
    for (const property in event) {
      csvData = [...csvData, [property, event[property]]]
    }
    alert(JSON.stringify(csvData))
   //return csvData
  }
  

  return (
    <div ref={ref} onBlur={() => {setTimeout(() => setShowMenu(false), 150)}} tabIndex={-1}  className="border shadow absolute flex flex-col items-end bg-white mt-10 -mr-12" data-testid="fixer-menu">
      <Link className="w-full" data-testid="edit-event-link" href={`/event/edit/${event.id}`}>
        <div className="w-full hover:bg-slate-100 py-4 px-4 font-light" >
          Edit Event
        </div>
      </Link> 
      <button onClick={() => messageAll()} className="cursor-pointer w-full text-start" data-testid={"msg-all-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 px-4 font-light" >
          Message All
        </div>
      </button>
      <button onClick={() => exportToCSV()} className="cursor-pointer w-full text-start" data-testid={"export-event-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 px-4 font-light" >
          Export Event Details
        </div>
      </button>
      <button onClick={() => exportToCSV()} className="cursor-pointer w-full text-start" data-testid={"export-orchestra-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 px-4 font-light" >
          Export Orchestra List
        </div>
      </button>
      <CalendarEventLink data={event}/>
      <button onClick={() => cancelEvent()} className="cursor-pointer w-full text-start" data-testid={"cancel-event-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 px-4 font-light" >
          Cancel Event
        </div>
      </button>
    </div>
  )
}