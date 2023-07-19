import { useState } from "react";
import axios from "axios";
import BookingTab from "./bookingTab";
import AvailabilityTab from "./availabilityTab";
import React from "react";
import TileHeader from "./tileHeader";
import TileTabBar from "./tileTabBar";
import { AvailabilityRequestValues, RequestValues } from "./editCalls/editCalls";
import { Call, EventInstrument, Prisma, User } from "@prisma/client";

export type EventInstrumentWithMusiciansWithMusician = Prisma.EventInstrumentGetPayload<{
  include: {
    musicians: {
      include: {
        musician: true,
        calls: true
      }
    }
  }
}>

interface Musicians {
  id: number
  createdAt: string
  updatedAt: string
  recieved: boolean
  accepted: boolean|null
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

interface InstrumentSection {
  id: number
  createdAt: string
  updatedAt: string
  eventId: number
  instrumentName: string
  numToBook: number
  callOrder: string
  musicians: Musicians[]
  fixerNote?: string
}

export interface InstrumentTileProps {
  eventCalls: Call[]
  eventId: number
  instrumentalists: User[]
  instrumentSection: EventInstrumentWithMusiciansWithMusician
  refreshProps: () => void
  isLoading: boolean
  preview?: boolean
}



export default function InstrumentTile(props: InstrumentTileProps) {
  const { eventCalls,  eventId, instrumentalists, instrumentSection, refreshProps, isLoading, preview } = props
   const [editList, setEditList] = useState(false)
   const [selectedTab, setSelectedTab] = useState("Booking")

  let instrumentFixed = instrumentSection.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length === instrumentSection.numToBook
  let numAvailablityConfirmed = instrumentSection.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Availability").length
  let availablityChecksOut = instrumentSection.musicians.filter(i => i.bookingOrAvailability === "Availability").length > 0 ? true : false
  let instrumentalistsList = instrumentSection !== null ? instrumentalists.filter(i => !instrumentSection.musicians.map(i => i.musicianId).includes(i.id)) : instrumentalists
  
  const handleSubmit = (vals: RequestValues|AvailabilityRequestValues) => {
    if (preview === true) {
      return;
    }
    console.log("Hello from handleSubmit")
    let apiRoute: string; 
    if (vals.bookingOrAvailability === "Booking") {
      apiRoute = "/api/fixing/sendOffers"
    } else {
      apiRoute = "/api/fixing/availabilityCheck"
    }
    axios.post(apiRoute, vals).then(() => {
      setEditList(false)
      refreshProps();
    })
  .catch(function (error) {
    console.log(error);
  }); 
  }

  return (
    <div data-testid={`instrument-tile`} className={"w-full h-full"} key={instrumentSection.id}>
      <TileHeader availablityChecksOut={availablityChecksOut} numAvailablityConfirmed={numAvailablityConfirmed} isLoading={isLoading} fixerNote={instrumentSection.fixerNote} instrumentFixed={instrumentFixed} instrumentName={instrumentSection.instrumentName} numToBook={instrumentSection.numToBook} />
      <TileTabBar selectedTab={selectedTab} setSelectedTab={arg => setSelectedTab(arg)} />
      {selectedTab === "Booking"
      ? <BookingTab 
        preview={preview}
        instrumentalists={instrumentalists}
        eventId={eventId}
        instrumentalistsList={instrumentalistsList}
        setEditList={i => setEditList(i)}
        eventCalls={eventCalls}
        editList={editList}
        instrumentSection={instrumentSection}
        refreshProps={refreshProps}
        instrumentFixed={instrumentFixed}
        handleSubmit={(values) => handleSubmit(values)} />
        : <AvailabilityTab 
        preview={preview}
        setSelectedTab={i => setSelectedTab(i)}
        eventId={eventId}
        instrumentalistsList={instrumentalistsList}
        setEditList={i => setEditList(i)}
        eventCalls={eventCalls}
        editList={editList}
        instrumentSection={instrumentSection}
        refreshProps={refreshProps}
        instrumentFixed={instrumentFixed}
        handleSubmit={(values) => handleSubmit(values)} />}
  </div>
  )
}