import { Button } from "@mui/material"
import { useState } from "react"
import ActiveCalls from "./activeCalls"
import AvailabilityTable from "./availabilityTable"
import EditCalls from "./editCalls/editCalls"
import React from "react"

interface AvailabilityTabProps {
  editList: boolean
  setEditList: (arg: boolean) => void
  instrumentalistsList: {
    id: string
    name: string
    email: string
    emailVerified: boolean|null
    instrument: string
    profileInfo: null|string
    isFixer: null|boolean
  }[] 
  //appendPlayer: (player: any) => void 
  eventId: number 
  keyId: number 
  instrumentName: string 
  refreshProps: () => void
  handleSubmit: (val: any) => void 
  callsOutId: number
}

export default function AvailabilityTab(props: AvailabilityTabProps) {
  const { 
    editList,
    setEditList,
    instrumentalistsList, 
    //appendPlayer, 
    eventId, 
    keyId, 
    instrumentName, 
    refreshProps, 
    handleSubmit, 
    callsOutId } = props

  return (
    <div data-testid="availability-tab">
      <div>
          <button data-testid={`availability-edit-btn`} className="edit-btn text-blue-500 border-blue-500 hover:bg-blue-100" onClick={() => setEditList(!editList)}>{editList === true ? "Close" : "Edit"}</button>
        </div>
        <AvailabilityTable />
        {editList && <EditCalls handleSubmit={(values: any) => handleSubmit(values)} key={keyId} instrumentName={instrumentName} instrumentalists={instrumentalistsList}/>}
    </div>
  )
}