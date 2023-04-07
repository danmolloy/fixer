import ButtonPrimary from "../index/buttonPrimary"
import AvailabilityTable from "./availabilityTable"
import EditCalls from "./editCalls/editCalls"
import React from "react"

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
}

interface AvailabilityTabProps {
  editList: boolean
  setEditList: (arg: boolean) => void
  instrumentalistsList: {
    id: string
    name: string
    email: string
    emailVerified: boolean|null
    instrument: string
    profileInfo: null|string
    isFixer: null|boolean
  }[] 
  refreshProps: () => void
  handleSubmit: (val: any) => void 
  instrumentFixed: boolean
  eventId: number
  eventCalls: {
    id: number
    createdAt: string
    updatedAt: string
    startTime: string
    endTime: string
    venue: string
    eventId: number
    fixerEmail: string
  }[]  
  instrumentSection: {
    id: number
    createdAt: string
    updatedAt: string
    eventId: number
    instrumentName: string
    numToBook: number
    callOrder: string
    musicians: Musician[]
}}

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
    handleSubmit 
  } = props

  return (
    <div data-testid="availability-tab">
      
        <AvailabilityTable />
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
          />}
    </div>
  )
}