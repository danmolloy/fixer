import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FieldArray } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { createTable } from '../bookingTable'
import PlayerRow from "./playerRow";

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

interface Instrumentalist {
  id: string
  name: string
  email: string
  emailVerified: boolean|null
  instrument: string
  profileInfo: null|string
  isFixer: null|boolean
}

interface AppendedPlayersProps {
  appendedPlayers: Instrumentalist[]
  eventCalls: EventCall[]
}

const menuOptions = [
  {
    text: "Add Message",
    id: "0"
  },
  {
    text: "Fix Player",
    id: "1"
  },
  {
    text: "View Profile",
    id: "2"
  },
]

export default function AppendedPlayers(props: AppendedPlayersProps) {
  const { appendedPlayers, eventCalls } = props
  const [showMenu, setShowMenu] = useState<number|null>(null)


  return (
    <div data-testid="appended-players-div">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              {eventCalls.map(i => (
              <TableCell key={i.id}>{moment(new Date(i.startTime)).format("H:mma DD[/]MM")}</TableCell>
            ))}
            <TableCell>
              
            </TableCell>
            </TableRow>
          </TableHead>
          
          <FieldArray name="appendedPlayers">
            {({ insert, remove, push}) => (
              <TableBody className="">
              {appendedPlayers.map((i, index) => (
                <TableRow key={i.id} >
                  <TableCell>{i.name}</TableCell>
                {eventCalls.map(j=> (
                  <TableCell key={j.id}>
                    <input data-testid={`call-${j.id}`} type="checkbox" defaultChecked />
                  </TableCell>
                ))}
                <TableCell>
                  <button className="text-xs mr-1 hover:bg-slate-100  rounded-full p-1 text-slate-800" onClick={(e) => {e.preventDefault(); setShowMenu(showMenu === index ? null : index)}} data-testid="player-menu-icon" >•••</button>
                </TableCell>
                {showMenu === index 
                && <div className="absolute -ml-24 w-36 border bg-white">
                    {menuOptions.map(i => (
                      <div key={i.id} className="p-1 hover:bg-zinc-50">
                        {i.text}
                      </div>
                    ))}
                  </div>}
                </TableRow>
                
              ))}
            </TableBody>
            )}
          </FieldArray>
        </Table>
      </TableContainer>
    </div>
  )
}


/* 
<FieldArray name="appendedPlayers">
        {({ insert, remove, push}) => (
          <div className="call-list-div appended-list">
          {appendedPlayers.map((i, index) => (
            <div className="call-list-item" key={i.id}>
            <p>{i.name}</p>
            </div>
          ))}
        </div>
        )}
      </FieldArray>
*/