import Layout from "../layout/layout";
import React from "react";
import AboutSection from "./aboutSection";
import EventIndex, { EventIndexProps } from "../event";
import PlayerDirectory, { PlayerDirectoryProps } from "../directory/playerDirectory";
//import InstrumentTile, { InstrumentTileProps } from "../fixing/instrumentTile";
import EventsIndex, { EventWithCalls, EventsIndexProps } from "../upcomingEvents/eventsIndex";
import { string } from "yup";
import EventTile, { EventTileProps } from "../upcomingEvents/eventTile";
import moment from "moment";


const eventIndexProps: EventIndexProps = {
  event:{
    eventTitle: "Finnish Fantasy",
    confirmedOrOnHold: "confirmed",
  ensembleName: "London Symphony Orchestra",
  concertProgram: "Sibelius Symphony 2",
  dressCode: "Tails/Long Black",
  fee: "MU/ABO 1",
  additionalInfo: "Bring a stand",
  fixerId: "12",
  fixerName: "Roy Dereks",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
  calls: [{
    id: 1,
    createdAt: new Date("10:30 17 July 2023"),
    updatedAt: new Date("10:30 17 July 2023"),
    startTime: new Date("10:30 17 July 2023"),
    endTime: new Date(),
    venue: "St Lukes",
    fixerId: "12",
    eventId: 1,
  },
  {
    id: 2,
    createdAt: new Date("10:30 17 July 2023"),
    updatedAt: new Date("10:30 17 July 2023"),
    startTime: new Date(),
    endTime: new Date(),
    venue: "Barbican Hall",
    fixerId: "12",
    eventId: 1
  }]},
  session: {
    userData: {
      id:"12"
    }
  },
  preview: true
}

const directoryProps: PlayerDirectoryProps = {
  data: [{
    id: "123",
    name: "Carlos Beatrice",
    email: "roydereks@email.com",
    profileInfo: "Lorem Ipsum",
    emailVerified: new Date(),
    image: "",
    firstName: "Carlos",
    lastName: "Beatrice",
    instrument: "Viola",
    mobileNumber: "07111222333",
  },
  {
    id: "124",
    name: "Frank Zappa",
    email: "frankzappa@email.com",
    profileInfo: "Lorem Ipsum",
    emailVerified: new Date(),
    image: "",
    firstName: "Frank",
    lastName: "Zappa",
    instrument: "Viola",
    mobileNumber: "07111222333",
  },],
  setPageTitle: () => {},
  preview: true
}

const instrumentTileProps: any = {
  eventCalls: [...eventIndexProps.event.calls],
  eventId: eventIndexProps.event.id,
  instrumentalists: [...directoryProps.data],
  instrumentSection: {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    eventId: eventIndexProps.event.id,
    instrumentName: "Viola",
    numToBook: 1,
    callOrder: "Ordered",
    musicians: [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        recieved: true,
        accepted: false,
        musicianId: directoryProps.data[0].id,
        eventInstrumentId: 1,
        bookingOrAvailability: "Booking",
        musician: {...directoryProps.data[0]},
        calls: [...eventIndexProps.event.calls],
        playerMessage: "",
        offerExpiry: 0,
        status: ""
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        recieved: true,
        accepted: true,
        musicianId: directoryProps.data[1].id,
        eventInstrumentId: 1,
        bookingOrAvailability: "Booking",
        musician: {...directoryProps.data[1]},
        calls: [...eventIndexProps.event.calls],
        playerMessage: "",
        offerExpiry: 0,
        status: ""
      },
    ],
    fixerNote: "", 
    messageToAll: "", 
    bookingStatus: ""
  },
  refreshProps: () => {},
  isLoading: false,
  preview: true
}

const eventTilesProps: EventTileProps[] = [...eventIndexProps.event.calls].map(i => ({
  call: {
    ...i,
    event: {
      eventTitle: "Finnish Fantasy",
      confirmedOrOnHold: "confirmed",
      ensembleName: "London Symphony Orchestra",
      concertProgram: "Sibelius Symphony 2",
      dressCode: "Tails/Long Black",
      fee: "MU/ABO 1",
      additionalInfo: "Bring a stand",
      fixerId: "12",
      fixerName: "Roy Dereks",
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1,
    }
  },
  sessionEmail: "email@email.com",
  preview: true
}))

const aboutSectionsArr: {
  key: number
  title: string
  blurb: string
  children: React.ReactNode
}[] = [
  {
    key: 1,
    title: "Player Directory",
    blurb: "Find players in our modern directory.",
    children: <PlayerDirectory {...directoryProps} />
  },
   {
    key: 2, 
    title: "Gig Interface",
    blurb: "Create an event with our intuitive form. All players and admin view the same information, so no one misses any details.",
    children: <EventIndex {...eventIndexProps} />
  },
  {
    key: 3,
    title: "Automated Fixing",
    blurb: "We handle the bookings and availability checks with our flexible fixing features.",
    children: <div></div>
  },
  {
    key: 4,
    title: "Personal Calendar",
    blurb: "Once accepted, the dates are added to your player's calendars.",
    children: 
    (<div className="w-full border my-2 px-2 py-3 shadow-sm">
    <h3 className="text-md text-slate-700">
      {moment(new Date(eventTilesProps[0].call.startTime)).format("dddd Do MMMM YYYY")}
    </h3>
      {eventTilesProps.map(i => (
        <div key={i.call.id}>
          <EventTile {...i} />
        </div>
      ))}
    </div>) 
  }
]


export default function About() {
  return (
    <div className="w-screen " data-testid="about-div">
      <div className="p-6 mt-12 pt-12">
        <h1 className="text-4xl ">How it works</h1>
      </div>
      {aboutSectionsArr.map(i => (
        <div key={i.key} >
        <AboutSection {...i} />
        </div>
      ))}
    </div>
  )
}