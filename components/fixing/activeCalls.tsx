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

  const fixOrUnfixPlayer = (fixOrUnfix: boolean, callId: number, musicianEmail: string): Promise<void> => {
    const reqBody = {
      playerCallId: callId,
      musicianEmail: musicianEmail,
      remove: false,
      fixOrUnfix: fixOrUnfix
    }
    if (preview === true) {
      return;
    }
    if (fixOrUnfix === true) {
      return axios.post("/api/fixing/fixPlayer", reqBody).then(() => {
        refreshProps();
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
        return axios.post("/api/fixing/unfixPlayer", reqBody).then(() => {
          refreshProps();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const offerOrDecline = (offerOrDecline: boolean, callId: number, musicianEmail: string): Promise<void> => {
    const reqBody = {
      playerCallId: callId,
    }
    if (preview === true) {
      return;
    }
    if (offerOrDecline === true) {
      return axios.post("/api/fixing/offer", reqBody).then(() => {
        refreshProps();
        setSelectedTab("Booking")
      })
      .catch(function (error) {
        console.log(error);
      });
    } /* else {
        return axios.post("/api/fixing/declinePlayer", reqBody).then(() => {
          refreshProps();
        })
        .catch(function (error) {
          console.log(error);
        }); 
    } */
  }


  return (
    <div className="active-calls-div" data-testid={`active-calls-div`}>
      {bookingOrAvailability === "Booking" 
      ? <BookingTable 
        preview={preview}
        removePlayer={(callId) => removePlayer(callId)} 
        fixOrUnfixPlayer={(fixOrUnfix, callId, musicianEmail) => fixOrUnfixPlayer(fixOrUnfix, callId, musicianEmail)}
        eventCalls={eventCalls} 
        instrumentSection={instrumentSection}/>
      : <AvailabilityTable
      preview={preview} 
        removePlayer={(callId) => removePlayer(callId)} 
        offerOrDecline={(offerOrDeclineBool, callId, musicianEmail) => offerOrDecline(offerOrDeclineBool, callId, musicianEmail)}
        eventCalls={eventCalls} 
        instrumentSection={instrumentSection}/>}
    </div>
  )
}