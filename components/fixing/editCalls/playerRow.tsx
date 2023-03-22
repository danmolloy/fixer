import { TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

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

interface PlayerRowProps {
  eventCalls: EventCall[]
  appendedPlayer: Instrumentalist
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

export default function PlayerRow(props: PlayerRowProps) {
  const { eventCalls, appendedPlayer } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <TableRow className="" key={appendedPlayer.id} data-testid="player-row">
      <TableCell>{appendedPlayer.name}</TableCell>
      {eventCalls.map(j=> (
        <TableCell key={j.id}>
          <input data-testid={`call-${j.id}`} type="checkbox" defaultChecked />
        </TableCell>
      ))}
      <TableCell>
        <button className="text-xs mr-1 hover:bg-slate-100  rounded-full p-1 text-slate-800" onClick={() => setShowMenu(!showMenu)} data-testid="player-menu-icon" >•••</button>
      </TableCell>
    </TableRow>
  )
}