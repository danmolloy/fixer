import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FieldArray } from "formik";
import moment from "moment";
import React from "react";
import { createTable } from '../bookingTable'

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

export default function AppendedPlayers(props: AppendedPlayersProps) {
  const { appendedPlayers, eventCalls } = props



  return (
    <div data-testid="appended-players-div">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {eventCalls.map(i => (
              <TableCell key={i.id}>{moment(new Date(i.startTime)).format("H:mma DD[/]MM")}</TableCell>
            ))}
            </TableRow>
          </TableHead>
          
          <FieldArray name="appendedPlayers">
            {({ insert, remove, push}) => (
              <TableBody className="call-list-div appended-list">
              {appendedPlayers.map((i, index) => (
                <TableRow className="call-list-item" key={i.id}>
                <TableCell>{i.name}</TableCell>
                {eventCalls.map(j=> (
              <TableCell key={j.id}>
                <input type="checkbox" checked/>
              </TableCell>
            ))}
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