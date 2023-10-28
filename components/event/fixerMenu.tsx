import axios from "axios"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { CSVLink } from "react-csv";
import { EventWithCalls } from "./calendarEventLink" 
import CalendarEventLink from "./calendarEventLink"


export type FixerMenuProps = {
  eventId: number
  data: EventWithCalls
}


export default function FixerMenu(props: FixerMenuProps) {
  const { eventId, data } = props;
  const router = useRouter()

  const messageAll = async () => {
    const fixerMessage = prompt(`What is your message to all booked musicians?`)
    const reqBody = {
      message: 
      `Dan Molloy sends the following message to all players of Event ${eventId}: 
      "${fixerMessage}"`,
      eventId: eventId
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
      `Dan Molloy has cancelled event ${eventId}. They send the following message to all players: 
      "${fixerMessage}"`,
      eventId: eventId
    }
    if (fixerMessage === null || fixerMessage.length === 0) {
      return;
    } else {
      return axios.post("/api/event/cancel", reqBody).then(() => router.push("/"));
    }
  }

  const exportToCSV = () => {
    let csvData = [];
    for (const property in data) {
      csvData = [...csvData, [property, data[property]]]
    }
    alert(JSON.stringify(csvData))
   //return csvData
  }
    

  return (
    <div className="" data-testid="menu-div">
      <Link href={`/event/edit/${eventId}`}>
        <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" data-testid={"edit-event-link"}>
          Edit Event
        </div>
      </Link> 
      <button onClick={() => messageAll()} className="cursor-pointer w-full text-start" data-testid={"msg-all-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Message All
        </div>
      </button>
     {/* <CSVLink data={() => exportToCSV()} className="cursor-pointer w-full text-start" data-testid={"msg-all-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Export to CSV
        </div>
      </CSVLink> */}
      <button onClick={() => exportToCSV()} className="cursor-pointer w-full text-start" data-testid={"msg-all-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Export to CSV
        </div>
      </button>
      <CalendarEventLink data={data}/>
      <button onClick={() => cancelEvent()} className="cursor-pointer w-full text-start" data-testid={"msg-all-btn"}>
        <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Cancel Event
        </div>
      </button>
    </div>
  )
}