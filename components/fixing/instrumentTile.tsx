import { useState } from "react";
import axios from "axios";
import BookingTab from "./bookingTab";
import AvailabilityTab from "./availabilityTab";
import React from "react";
import TileHeader from "./tileHeader";
import TileTabBar from "./tileTabBar";
import { AvailabilityRequestValues, RequestValues } from "./editCalls/editCalls";
import { User } from "./fixing";

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

interface InstrumentTileProps {
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
  eventId: number
  instrumentalists: User[]
  instrumentSection: InstrumentSection
  refreshProps: () => void
  isLoading: boolean
}



export default function InstrumentTile(props: InstrumentTileProps) {
  const { eventCalls,  eventId, instrumentalists, instrumentSection, refreshProps, isLoading } = props
   const [editList, setEditList] = useState(false)
   const [selectedTab, setSelectedTab] = useState("Booking")

  let instrumentFixed = instrumentSection.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length === instrumentSection.numToBook
  let numAvailablityConfirmed = instrumentSection.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Availability").length
  let availablityChecksOut = instrumentSection.musicians.filter(i => i.bookingOrAvailability === "Availability").length > 0 ? true : false
  let instrumentalistsList = instrumentSection !== null ? instrumentalists.filter(i => !instrumentSection.musicians.map(i => i.musicianEmail).includes(i.email)) : instrumentalists
  
  const handleSubmit = (vals: RequestValues|AvailabilityRequestValues) => {
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