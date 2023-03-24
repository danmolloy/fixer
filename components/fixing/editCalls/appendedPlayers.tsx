import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Field, FieldArray } from "formik";
import moment from "moment";
import React, { useState } from "react";
import TableRowMenu from "./tableRowMenu";

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
  calls: {
    id: number
  }[]
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
  {
    text: "Remove Player",
    id: "3"
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
                <TableRow key={i.id} data-testid={`${i.id}-row`}>
                  <TableCell>{i.name}</TableCell>
                {eventCalls.map(j=> (
                  <TableCell key={j.id}>
                    <Field data-testid={`${i.id}-row-call-${j.id}`} type="checkbox" value={j.id} name={`appendedPlayers.${i}.calls`} />
                  </TableCell>
                ))}
                <TableCell>
                  <button className="text-xs mr-1 hover:bg-slate-100  rounded-full p-1 text-slate-800" onClick={(e) => {e.preventDefault(); setShowMenu(showMenu === index ? null : index)}} data-testid="player-menu-icon" >•••</button>
                </TableCell>
                {showMenu === index 
                && <TableCell className="w-36 border bg-white">
                    <TableRowMenu menuOptions={menuOptions} />
                  </TableCell>}
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

