import { Button } from "@mui/material"
import { useState } from "react"
import ActiveCalls from "./activeCalls"
import EditCalls from "./editCalls"

export default function BookingTab(props) {
  const { 
    eventCalls,
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
      <div className="w-full py-2">
          <Button data-testid={`${instrumentName}-edit-btn`} variant="outlined" className="edit-btn text-blue-500 border-blue-500 hover:bg-blue-100" onClick={() => setEditList(!editList)}>{editList ? "Close" : "Edit"}</Button>
        </div>
      {activeCalls.musicians.length > 0
        ? <ActiveCalls eventCalls={eventCalls} closeEdit={() => setEditList(false)} instrumentName={instrumentName} refreshProps={refreshProps} instrumentSection={activeCalls} editList={editList} instrumentFixed={instrumentFixed}/>
        : <p className="text-gray-500 -mt-2 pl-1">No calls out.</p>}
        {editList && <EditCalls handleSubmit={(values) => handleSubmit(values)} closeEdit={() => setEditList(false)} refreshProps={refreshProps} callsOutId={callsOutId} eventId={eventId} key={keyId} appendPlayer={i => appendPlayer(i)} instrumentName={instrumentName} instrumentalists={instrumentalistsList}/>}

    </div>
  )
}