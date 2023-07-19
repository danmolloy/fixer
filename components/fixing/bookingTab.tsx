import ActiveCalls from "./activeCalls"
import EditCalls from "./editCalls/editCalls"
import React from "react"
import ButtonPrimary from "../index/buttonPrimary"
//import { User } from "./fixing"
import { Call, User } from "@prisma/client"
import { EventInstrumentWithMusiciansWithMusician } from "./instrumentTile"

interface Musician {
  id: number
  createdAt: string
  updatedAt: string
  recieved: boolean
  accepted: boolean | null
  musicianEmail: string
  eventInstrumentId: number
  bookingOrAvailability: "Booking"|"Availability"
  musician: {
    name: string
  }
  calls: {
    id: number
  }[]
  status: string
}

interface BookingTabProps {
  editList: boolean
  setEditList: (arg: boolean) => void
  instrumentalistsList: User[] 
  instrumentalists: User[]
  refreshProps: () => void
  handleSubmit: (val: any) => void 
  instrumentFixed: boolean
  eventId: number
  eventCalls: Call[]  
  instrumentSection: EventInstrumentWithMusiciansWithMusician
  preview?: boolean
}

export default function BookingTab(props: BookingTabProps) {
  const { 
    eventCalls,
    eventId,
    editList,
    setEditList,
    instrumentalists,
    instrumentalistsList, 
    instrumentSection, 
    refreshProps, 
    instrumentFixed, 
    handleSubmit, 
    preview,
     } = props
  
  return (
    <div data-testid="booking-tab" className="">
      
      {instrumentSection.musicians.filter(i => i.bookingOrAvailability === "Booking").length > 0
        ? <ActiveCalls
        preview={preview}
          bookingOrAvailability="Booking" 
          eventCalls={eventCalls} 
          closeEdit={() => setEditList(false)} 
          instrumentName={instrumentSection.instrumentName} 
          refreshProps={refreshProps} 
          instrumentSection={instrumentSection} 
          editList={editList} 
          instrumentFixed={instrumentFixed}
          />
        : 
        <div className="text-zinc-500 text-center py-16">
          <p className="">No calls out.</p>
        </div>}
        <div className="w-full flex flex-row justify-end">
            <ButtonPrimary
              id={`booking-edit-btn`} 
              className=" m-4 px-4 text-blue-500 border-blue-500 hover:bg-blue-100" 
              handleClick={() => setEditList(!editList)}
              text={editList ? "Close" : "Edit"} />
          </div>
        {editList 
        && <EditCalls
          bookingOrAvailability={"Booking"}
          eventInstrumentId={instrumentSection.id}
          eventId={eventId}
          eventCalls={eventCalls}
          handleSubmit={(values) => handleSubmit(values)} 
          key={instrumentSection.id} 
          instrumentName={instrumentSection.instrumentName} 
          instrumentalists={instrumentalists}
          contactedPlayers={instrumentSection.musicians.map(i => i.musicianId)}
          />}
    </div>
  )
}