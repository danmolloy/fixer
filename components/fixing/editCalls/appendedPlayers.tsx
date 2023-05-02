import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Field, FieldArray } from "formik";
import moment from "moment";
import React, { useState } from "react";
import TableRowMenu from "./tableRowMenu";
import MenuShell from "../../index/menuShell";
import MenuItem from "../../index/menuItem";
import { AiOutlineMail } from "react-icons/ai";
import PulsingDiv from "../../layout/pulsingDiv";

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

export type Instrumentalist = {
  id: string
  name: string
  email: string
  emailVerified: boolean|null
  instrument: string
  profileInfo: null|string
  isFixer?: null|boolean
  calls: string[]
  playerMessage?: string
}

interface AppendedPlayersProps {
  appendedPlayers: Instrumentalist[]
  eventCalls: EventCall[]
  makeAvailable: any
}


export default function AppendedPlayers(props: AppendedPlayersProps) {
  const { appendedPlayers, eventCalls, makeAvailable } = props
  const [menuIndex, setMenuIndex] = useState<number|null>(null)
  const [addMessage, setAddMessage] = useState<number|null>(null)


  return (
    <div data-testid="appended-players-div" className="flex flex-col mb-8 border rounded shadow-sm mx-2">
      {menuIndex !== null
      && <TableRowMenu makeAvailable={(arg) => makeAvailable(arg)} setShowMenu={() => setMenuIndex(null)} menuIndex={menuIndex} appendedPlayers={appendedPlayers} />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="">
              <TableCell>
                Name
              </TableCell>
              {eventCalls.map(i => (
              <TableCell key={i.id}>{moment(new Date(i.startTime)).format("DD[/]MM")}</TableCell>
            ))}
            <TableCell>
            </TableCell>
            </TableRow>
          </TableHead>
          
          <FieldArray name="appendedPlayers">
            {({ insert, remove, push}) => (
              <TableBody className="">
              {appendedPlayers.length === 0
              ? <TableRow>
                <TableCell>
                  <div className="h-4 w-16"/>
                </TableCell>
                <TableCell>
                <div className="h-4 w-4"/>
                </TableCell>
                <TableCell>
                <div className="h-4 w-4"/>
                </TableCell>
              </TableRow>
              : appendedPlayers.map((i, index) => (
                <TableRow className="flex" key={i.id} data-testid={`${i.id}-row`} role="group" aria-labelledby="checkbox-group">
                  <TableCell>
                    <p >{i.name}</p>
                    </TableCell>

                {eventCalls.map(j=> (
                  <TableCell key={j.id}>
                    <Field 
                      data-testid={`${i.id}-row-call-${j.id}`} 
                      type="checkbox" 
                      value={`${j.id}`} 
                      name={`appendedPlayers[${index}]calls`} />
                  </TableCell>
                ))}
                <TableCell className="flex flex-row">
                  <div className="flex flex-row">
                    <button className="text-xs hover:bg-slate-100  rounded-full p-1 text-slate-800" onClick={(e) => {e.preventDefault(); setMenuIndex(menuIndex === index ? null : index)}} data-testid="player-menu-icon" >•••</button>
                    {appendedPlayers[index].playerMessage 
                    && <div title={appendedPlayers[index].playerMessage} className="absolute mt-1 ml-6 text-amber-600">
                        <AiOutlineMail />
                      </div>}

                  </div>
                </TableCell>
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

