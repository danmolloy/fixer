import { useState } from "react";
import axios from "axios";
import BookingTab from "./bookingTab";
import AvailabilityTab from "./availabilityTab";
import React from "react";
import TileHeader from "./tileHeader";
import TileTabBar from "./tileTabBar";
import { RequestValues } from "./editCalls/editCalls";

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
  instrumentalists: {
    id: string
    name: string
    email: string
    emailVerified: boolean|null
    instrument: string
    profileInfo: null|string
    isFixer: null|boolean
  }[]
  instrumentSection: InstrumentSection
  refreshProps: () => void
}



export default function InstrumentTile(props: InstrumentTileProps) {
  const { eventCalls,  eventId, instrumentalists, instrumentSection, refreshProps } = props
   const [editList, setEditList] = useState(false)
   const [selectedTab, setSelectedTab] = useState("Booking")

  let instrumentFixed = instrumentSection.musicians.filter(i => i.accepted === true).length === instrumentSection.numToBook

  let instrumentalistsList = instrumentSection !== null ? instrumentalists.filter(i => !instrumentSection.musicians.map(i => i.musicianEmail).includes(i.email)) : instrumentalists
  
  const handleSubmit = (vals: RequestValues) => {
    /* let obj = {
      eventId: eventId, 
      instrumentName: instrumentSection.instrumentName,
      musicians: String(vals.callOrder).toLowerCase() === "random"
        ? [...vals.appendedPlayers].sort(() => Math.random() - 0.5).map(i => ({musicianEmail: i.email})) 
        : [...vals.appendedPlayers].map(i => ({
          musicianEmail: i.email,
          callsOffered: [...eventCalls.map(i => (i.id))]
        })),
      callsOutId: instrumentSection.id,
      callOrder: vals.callOrder,
      numToBook: vals.numToBook,
      bookingOrAvailability: 'Availability'
    } */
    
    axios.post('/api/fixing/offer', vals).then(() => {
      setEditList(false)
      refreshProps();
    })
  .catch(function (error) {
    console.log(error);
  }); 
  }

  return (
    <div data-testid={`instrument-tile`} className={instrumentFixed /* && !editList */ ? "border-green-500 " : "w-full h-full"} key={instrumentSection.id}>

      <TileHeader instrumentFixed={instrumentFixed} instrumentName={instrumentSection.instrumentName} numToBook={instrumentSection.numToBook} />
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

        :<AvailabilityTab 
          eventCalls={eventCalls}
          instrumentalistsList={instrumentalistsList}
          //appendPlayer={i => appendPlayer(i)}
          setEditList={i => setEditList(i)}
          eventId={eventId}
          keyId={instrumentSection.id}
          editList={editList}
          refreshProps={refreshProps}
          /* instrumentFixed={instrumentFixed} */
          handleSubmit={(values) => handleSubmit(values)}
          callsOutId={instrumentSection.id}
          instrumentName={instrumentSection.instrumentName} />}

  </div>
  )
}