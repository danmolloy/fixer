import { useEffect, useState } from 'react'
import axios from "axios"
import BookingTable from './bookingTable'
import React from 'react'
import AvailabilityTable from './availabilityTable'
import { Call } from '@prisma/client'
import { EventInstrumentWithMusiciansWithMusician } from './instrumentTile'

export type ActiveCallsProps = {
  eventCalls: Call[]
  instrumentName: string
  instrumentSection: EventInstrumentWithMusiciansWithMusician
  editList: boolean
  instrumentFixed: boolean
  refreshProps: () => void
  closeEdit: Function
  bookingOrAvailability: "Booking"|"Availability"
  setSelectedTab?: (i: string) => void
  preview?: boolean
}

export default function ActiveCalls(props: ActiveCallsProps) {
  const {eventCalls, instrumentSection, editList, refreshProps, closeEdit, bookingOrAvailability, setSelectedTab, preview} = props
  const [callList, setCallList] = useState<any>([])

  useEffect(() => {
    setCallList([...instrumentSection.musicians.sort((a, b) => Number(a.id) - Number(b.id))])
  }, [editList])

  const removePlayer = async(callId: number): Promise<void> => {
    const reqBody = {
      playerCallId: callId
    }
    if (preview === true) {
      return;
    }
    return axios.post("/api/fixing/removePlayer", reqBody).then(() => {
      refreshProps();
    })
  .catch(function (error) {
    console.log(error);
  });
  }


  const updatePlayer = async (playerCallId: number, data: {}): Promise<void> => {
    const reqBody = {playerCallId: playerCallId, data: data}
    return await axios.post("/api/fixing/updatePlayerCall", reqBody).then(() => {
      refreshProps();
    }).catch(function (error) {
      console.log(error);
    });
  }

  


  return (
    <div className="active-calls-div" data-testid={`active-calls-div`}>
      {bookingOrAvailability === "Booking" 
      ? <BookingTable 
        updatePlayer={(playerCallId, data) => updatePlayer(playerCallId, data)}
        preview={preview}
        removePlayer={(callId) => removePlayer(callId)} 
        eventCalls={eventCalls} 
        instrumentSection={instrumentSection}/>
      : <AvailabilityTable
        updatePlayer={(playerCallId, data) => updatePlayer(playerCallId, data)}
        preview={preview} 
        removePlayer={(callId) => removePlayer(callId)} 
        eventCalls={eventCalls} 
        instrumentSection={instrumentSection}/>}
    </div>
  )
}