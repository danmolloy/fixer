import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment/moment";
import { TiTick, TiTimes } from "react-icons/ti";
import React, { useState } from "react";
import { BsThreeDots } from 'react-icons/bs'
import { GiSandsOfTime } from "react-icons/gi";
import BookingRowMenu from "./bookingRowMenu";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { EventInstrumentWithMusiciansWithMusician } from "./instrumentTile";
import { Call } from "@prisma/client";


export type BookingTableProps = {
  eventCalls: Call[]
  instrumentSection: EventInstrumentWithMusiciansWithMusician
  removePlayer: (callId: number) => Promise<void>
  preview?: boolean
  updatePlayer: (playerCallId: number, data: {}) => void
}


export const createTable = (eventCalls: any, instrumentSection: any): any => {
  let objArr: any = [{
    name: "Header",
    calls: eventCalls.map(i => ({
      id: i.id,
      startTime: i.startTime
    }))
  }]

  let sortedMusicians = instrumentSection.musicians.filter(i => i.bookingOrAvailability === "Booking").sort((a: any, b: any) => Number(a.id) - Number(b.id))

  for (let i = 0; i < sortedMusicians.length; i ++) {
    objArr = [...objArr, {
      status: sortedMusicians[i].status,
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


const pokePlayer = (musicianName: string, preview) => {
  const reqBody = {
    musicianName,
    message: `Hi ${musicianName}, Dan Molloy is reminding you to respond to their gig offer.`
  }
  if (preview) {
    return;
  }
  return axios.post("/api/fixing/messagePlayer", reqBody)
} 


const sendMessage = (musicianName, preview) => {
  if (preview ) {
    return;
  }
  const reqBody = {
    message: `Dan Molloy sends the following message: "${prompt(`What is your message to ${musicianName}?`)}"`
  }
  if (reqBody.message === null || reqBody.message.length === 0) {
    return;
  } else {
    return axios.post("/api/fixing/messagePlayer", reqBody);
  }
}


export default function BookingTable(props: BookingTableProps) {
  const { updatePlayer, eventCalls, instrumentSection, removePlayer, preview } = props;
  const [menuId, setMenuId] = useState(null)

  let filledTable = createTable(eventCalls, instrumentSection)


  return (
    <div data-testid="booking-table-div" className="flex flex-col mx-2">
      {menuId !== null
      && <BookingRowMenu 
      updatePlayer={(playerCallId, data) => updatePlayer(playerCallId, data)}
      preview={preview}
      musician={createTable(eventCalls, instrumentSection).find(i => i.id === menuId)}
      setShowMenu={() => setMenuId(null)}
      removePlayer={(callId) => {removePlayer(callId); setMenuId(null)}}
      sendMessage={(name) => sendMessage(name, preview)}
      pokePlayer={(name) => pokePlayer(name, preview)}/>}
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
                  {String(i.status) === "DEP OUT"
                  ? <div className="text-amber-600"><BiExit /></div>
                  : String(i.accepted).toLowerCase() === "true" 
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