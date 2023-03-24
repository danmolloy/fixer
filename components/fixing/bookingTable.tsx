import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment/moment";
import { TiMail, TiTick, TiTimes } from "react-icons/ti";
import {FiCoffee } from "react-icons/fi"
import React, { useState } from "react";
import { BsThreeDots } from 'react-icons/bs'
import TableRowMenu from "./editCalls/tableRowMenu";

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
}

interface tableObjHeader {
  name: string
  calls: {
    id: string
    startTime: string
  }[]
}

interface tableObjMusician {
  name: string
  calls: {
    id: string
    startTime: string
  }[]
  recieved: boolean
  accepted: boolean|null
}[]

const menuOptions = [
  {
    text: "Contact",
    id: "0"
  },
  {
    text: "Fix/Unfix Player",
    id: "1"
  },
  {
    text: "View Profile",
    id: "2"
  },
  {
    text: "Nudge Player",
    id: "3"
  },
]

export const createTable = (eventCalls: any, instrumentSection: any): any => {
  let objArr: any = [{
    name: "Header",
    calls: eventCalls.map(i => ({
      id: i.id,
      startTime: i.startTime
    }))
  }]

  let sortedMusicians = instrumentSection.musicians.sort((a: any, b: any) => Number(a.id) - Number(b.id))

  for (let i = 0; i < sortedMusicians.length; i ++) {
    objArr = [...objArr, {
      id: sortedMusicians[i].id,
      name: sortedMusicians[i].musician.name,
      calls: sortedMusicians[i].calls.map(i => (i.id)),
      recieved: sortedMusicians[i].recieved,
      accepted: sortedMusicians[i].accepted,
    }]
  }

  return objArr;
}


export default function BookingTable(props: BookingTableProps) {
  const {eventCalls, instrumentSection} = props;
  const [menuId, setMenuId] = useState(null)

  let filledTable = createTable(eventCalls, instrumentSection)

  return (
    <div data-testid="booking-table-div" className="">
      <TableContainer>
        <Table>
          <TableHead >
            <TableRow>
            <TableCell></TableCell>
            {filledTable.find((i: any) => i.name === "Header").calls.map(i => (
              <TableCell key={i.id}>{moment(new Date(i.startTime)).format("DD MMMM")}</TableCell>
            ))}
            <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {createTable(eventCalls, instrumentSection).filter(i => i.name !== "Header").map(i => (
            <TableRow key={i.id}>
              <TableCell className={String(i.accepted).toLowerCase() === "false" ? "text-slate-400" : ""}>{i.name}</TableCell>
              {i.calls.map(call => (
                <TableCell key={call}>
                  {String(i.accepted).toLowerCase() === "true" 
                  ? <div className="text-green-600"><TiTick /></div>
                  : String(i.accepted).toLowerCase() === "false"
                  ? <div className="text-slate-400"><TiTimes /></div>
                  : String(i.recieved).toLowerCase() === "true" 
                  ? <div><TiMail /></div>
                  : <div className="text-slate-400"><FiCoffee /></div>}
                  </TableCell>
              ))}
              <TableCell>
                <button onClick={() => setMenuId(menuId === i.id ? null : i.id)} className="rounded-full p-1 text-zinc-700 hover:text-blue-600 hover:bg-blue-100">
                  <BsThreeDots />
                </button>
              </TableCell>
              <TableCell>
              {menuId === i.id 
              && <TableRowMenu menuOptions={menuOptions} />}
              </TableCell>
            </TableRow>
            
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}