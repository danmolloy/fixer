import { Button } from "@mui/material"
import { useState } from "react"
import ActiveCalls from "./activeCalls"
import AvailabilityTable from "./availabilityTable"
import EditCalls from "./editCalls"

export default function AvailabilityTab(props) {
  const { 
    editList,
    setEditList,
    instrumentalistsList, 
    appendPlayer, 
    eventId, 
    keyId, 
    instrumentName, 
    activeCalls, 
    refreshProps, 
    instrumentFixed, 
    handleSubmit, 
    callsOutId } = props

  return (
    <div>
      <div>
          <Button data-testid={`${instrumentName}-availability-edit-btn`} variant="outlined" className="edit-btn text-blue-500 border-blue-500 hover:bg-blue-100" onClick={() => setEditList(!editList)}>{editList ? "Close" : "Edit"}</Button>
        </div>
        <AvailabilityTable />
        {editList && <EditCalls handleSubmit={(values) => handleSubmit(values)} closeEdit={() => setEditList(false)} refreshProps={refreshProps} callsOutId={callsOutId} eventId={eventId} key={keyId} appendPlayer={i => appendPlayer(i)} instrumentName={instrumentName} instrumentalists={instrumentalistsList}/>}

    </div>
  )
}