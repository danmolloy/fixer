import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment/moment";
import { TiMail, TiTick, TiTimes } from "react-icons/ti";
import {FiCoffee } from "react-icons/fi"
import React, { useState } from "react";
import { BsThreeDots } from 'react-icons/bs'
import TableRowMenu from "./editCalls/tableRowMenu";
import { GiSandsOfTime } from "react-icons/gi";
import BookingRowMenu from "./bookingRowMenu";
import axios from "axios";
import AvailabilityRowMenu from "./availabilityRowMenu";

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
interface InstrumentSection {
  id: number
  createdAt: string
  updatedAt: string
  eventId: number
  instrumentName: string
  numToBook: number
  callOrder: string
  musicians: Musician[]
}

interface EventCall {
  id: number
  createdAt: string
  updatedAt: string
  startTime: string
  endTime: string
  venue: string
  eventId: number
  fixerEmail: string
}

interface BookingTableProps {
  eventCalls: EventCall[]
  instrumentSection: InstrumentSection
  removePlayer: (callId: number) => Promise<void>
  offerOrDecline: (offerOrDecline: boolean, callId: number, musicianEmail: string) => Promise<void>
}

interface tableObjHeader {
  name: string
  calls: {
    id: string
    startTime: string
  }[]
}

interface tableObjMusician {
  email: string
  name: string
  calls: {
    id: string
    startTime: string
  }[]
  recieved: boolean
  accepted: boolean|null
}[]

export const createTable = (eventCalls: any, instrumentSection: any): any => {
  let objArr: any = [{
    name: "Header",
    calls: eventCalls.map(i => ({
      id: i.id,
      startTime: i.startTime
    }))
  }]

  let sortedMusicians = instrumentSection.musicians.filter(i => i.bookingOrAvailability === "Availability").sort((a: any, b: any) => Number(a.id) - Number(b.id))

  for (let i = 0; i < sortedMusicians.length; i ++) {
    objArr = [...objArr, {
      id: sortedMusicians[i].id,
      name: sortedMusicians[i].musician.name,
      calls: sortedMusicians[i].calls.map(i => (i.id)),
      recieved: sortedMusicians[i].recieved,
      accepted: sortedMusicians[i].accepted,
      email: sortedMusicians[i].musicianEmail
    }]
  }

  return objArr;
}


const pokePlayer = (musicianName: string) => {
  const reqBody = {
    musicianName,
    message: `Hi ${musicianName}, Dan Molloy is reminding you to respond to their gig offer.`
  }
  return axios.post("/api/fixing/messagePlayer", reqBody)
} 


const sendMessage = (musicianName) => {
  const reqBody = {
    message: `Dan Molloy sends the following message: "${prompt(`What is your message to ${musicianName}?`)}"`
  }
  if (reqBody.message === null || reqBody.message.length === 0) {
    return;
  } else {
    return axios.post("/api/fixing/messagePlayer", reqBody);
  }
}


export default function AvailabilityTable(props: BookingTableProps) {
  const {eventCalls, instrumentSection, removePlayer, offerOrDecline } = props;
  const [menuId, setMenuId] = useState(null)

  let filledTable = createTable(eventCalls, instrumentSection)

  return (
    <div data-testid="booking-table-div" className="flex flex-col mx-2">
      {menuId !== null
      && <AvailabilityRowMenu 
      musician={createTable(eventCalls, instrumentSection).find(i => i.id === menuId)}
      setShowMenu={() => setMenuId(null)}
      removePlayer={(callId) => {removePlayer(callId); setMenuId(null)}}
      sendMessage={(name) => sendMessage(name)}
      pokePlayer={(name) => pokePlayer(name)}
      offerOrDecline={(offerOrDeclineBool, callId, musicianEmail) => {offerOrDecline(offerOrDeclineBool, callId, musicianEmail); setMenuId(null)}}/>}
      <TableContainer>
        <Table>
          <TableHead >
            <TableRow>
            <TableCell>Name</TableCell>
            {filledTable.find((i: any) => i.name === "Header").calls.map(i => (
              <TableCell key={i.id} title={moment(new Date(i.startTime)).format("DD MMMM")}>{moment(new Date(i.startTime)).format("DD/MM")}</TableCell>
            ))}
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {createTable(eventCalls, instrumentSection).filter(i => i.name !== "Header").map(i => (
            <TableRow key={i.id}>
              <TableCell className={""}>
                <p className={i.recieved === false || i.accepted === false ? "text-zinc-300 ": ""}>{i.name}</p>
              </TableCell>
              {i.calls.map(call => (
                <TableCell key={call}>
                  {String(i.accepted).toLowerCase() === "true" 
                  ? <div className="text-green-600"><TiTick /></div>
                  : String(i.accepted).toLowerCase() === "false"
                  ? <div className="text-slate-400"><TiTimes /></div>
                  : String(i.recieved) === "true" 
                  ? <div><GiSandsOfTime /></div>
                  : <div>{}</div>}
                  </TableCell>
              ))}
              <TableCell>
                <button onClick={() => setMenuId(menuId === i.id ? null : i.id)} className="rounded-full p-1 text-zinc-700 hover:text-blue-600 hover:bg-blue-100">
                  <BsThreeDots />
                </button>
                
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}