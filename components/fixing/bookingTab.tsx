import { Button } from "@mui/material"
import { useState } from "react"
import ActiveCalls from "./activeCalls"
import EditCalls from "./editCalls"
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

interface BookingTabProps {
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

export default function BookingTab(props: BookingTabProps) {
  const { 
    eventCalls,
    editList,
    setEditList,
    instrumentalistsList, 
    instrumentSection, 
    refreshProps, 
    instrumentFixed, 
    handleSubmit, 
     } = props
  
  return (
    <div data-testid="booking-tab">
      <div className="w-full py-2">
          <Button 
            data-testid={`booking-edit-btn`} 
            variant="outlined" 
            className="edit-btn text-blue-500 border-blue-500 hover:bg-blue-100" onClick={() => setEditList(!editList)}>
              {editList ? "Close" : "Edit"}
          </Button>
        </div>
      {instrumentSection.musicians.length > 0
        ? <ActiveCalls 
          eventCalls={eventCalls} 
          closeEdit={() => setEditList(false)} 
          instrumentName={instrumentSection.instrumentName} 
          refreshProps={refreshProps} 
          instrumentSection={instrumentSection} 
          editList={editList} 
          instrumentFixed={instrumentFixed}
          />
        : <p className="text-gray-500 -mt-2 pl-1">No calls out.</p>}
        {editList 
        && <EditCalls 
          handleSubmit={(values) => handleSubmit(values)} 
          key={instrumentSection.id} 
          instrumentName={instrumentSection.instrumentName} 
          instrumentalists={instrumentalistsList}
          />}
    </div>
  )
}