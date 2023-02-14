import { useState } from "react";
import axios from "axios";
import { Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import BookingTab from "./bookingTab";
import AvailabilityTab from "./availabilityTab";
import React from "react";

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
   const [tabIndex, setTabIndex] = useState("0")

  let instrumentFixed = instrumentSection.musicians.filter(i => i.accepted === true).length === instrumentSection.numToBook

  let instrumentalistsList = instrumentSection !== null ? instrumentalists.filter(i => !instrumentSection.musicians.map(i => i.musicianEmail).includes(i.email)) : instrumentalists
  
  const handleSubmit = (vals) => {
    let obj = {
      eventId: eventId, 
      instrumentName: instrumentSection.instrumentName,
      musicians: String(vals.callOrder).toLowerCase() === "random"
        ? [...vals.appendedPlayers].sort(() => Math.random() - 0.5).map(i => ({musicianEmail: i.email})) //callsOffered for this too!
        : [...vals.appendedPlayers].map(i => ({
          musicianEmail: i.email,
          callsOffered: [...eventCalls.map(i => (i.id))]
        })),
      callsOutId: instrumentSection.id,
      callOrder: vals.callOrder,
      numToBook: vals.numToBook,
      bookingOrAvailability: 'Availability'
    }
    axios.post('/api/fixing/offer', obj).then(() => {
      setEditList(false)
      refreshProps();
    })
  .catch(function (error) {
    console.log(error);
  });
  }

  return (
    <div data-testid={`instrument-tile`} className={instrumentFixed /* && !editList */ ? "border-green-500 " : "w-full h-full"} key={instrumentSection.id}>

      <div className="instrument-tile-header">
        <h2 className={instrumentFixed ? "text-green-500" : "p-1"}>{instrumentSection.instrumentName}</h2>
       {/*  <p>Booking {numToBook} player(s)</p> */}
      </div>
      <TabContext value={tabIndex}>
      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Booking" value={"0"} data-testid="booking-tab-toggle"/>
        <Tab label="Availability" value={"1"} data-testid="availability-tab-toggle"/>
      </Tabs>
      
      <TabPanel value={"0"} >
      <BookingTab 
        instrumentalistsList={instrumentalistsList}
        setEditList={i => setEditList(i)}
        eventCalls={eventCalls}
        editList={editList}
        instrumentSection={instrumentSection}
        refreshProps={refreshProps}
        instrumentFixed={instrumentFixed}
        handleSubmit={(values) => handleSubmit(values)} />
      </TabPanel>
      <TabPanel value={"1"}>
        <AvailabilityTab 
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
          instrumentName={instrumentSection.instrumentName} />
      </TabPanel>
      </TabContext>
  </div>
  )
}