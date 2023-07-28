import ButtonPrimary from "../index/buttonPrimary"
import AvailabilityTable from "./availabilityTable"
import EditCalls from "./editCalls/editCalls"
import React from "react"
import ActiveCalls from "./activeCalls"
import { Call, User } from "@prisma/client"
import { EventInstrumentWithMusiciansWithMusician } from "./instrumentTile"


export type AvailabilityTabProps = {
  setSelectedTab: (i: string) => void
  editList: boolean
  setEditList: (arg: boolean) => void
  instrumentalistsList: User[] 
  refreshProps: () => void
  handleSubmit: (val: any) => void 
  instrumentFixed: boolean
  eventId: number
  eventCalls: Call[]  
  instrumentSection: EventInstrumentWithMusiciansWithMusician
  preview?: boolean
}

export default function AvailabilityTab(props: AvailabilityTabProps) {
  const { 
    eventCalls,
    eventId,
    editList,
    setEditList,
    instrumentalistsList, 
    instrumentSection, 
    refreshProps, 
    instrumentFixed, 
    handleSubmit,
    setSelectedTab,
    preview
  } = props

  return (
    <div data-testid="availability-tab">
        {instrumentSection.musicians.filter(i => i.bookingOrAvailability === "Availability").length > 0
        ? <ActiveCalls 
          preview={preview}
          setSelectedTab={i => setSelectedTab(i)}
          bookingOrAvailability={"Availability"}
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
          <p className="">No availability checks have been made.</p>
        </div>}
        <div className="w-full flex flex-row justify-end">
            <ButtonPrimary
              id={`availability-edit-btn`} 
              className=" m-4 px-4 text-blue-500 border-blue-500 hover:bg-blue-100" 
              handleClick={() => setEditList(!editList)}
              text={editList ? "Close" : "Edit"} />
          </div>
          {editList 
        && <EditCalls
          bookingOrAvailability={"Availability"}
          eventInstrumentId={instrumentSection.id}
          eventId={eventId}
          eventCalls={eventCalls}
          handleSubmit={(values) => handleSubmit(values)} 
          key={instrumentSection.id} 
          instrumentName={instrumentSection.instrumentName} 
          instrumentalists={instrumentalistsList}
          contactedPlayers={instrumentSection.musicians.map(i => i.musicianId)}
          />}
    </div>
  )
}