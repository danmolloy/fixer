import { useEffect, useState } from 'react'
import { GiEnvelope, GiConfirmed, GiCancel } from 'react-icons/gi'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import axios from "axios"
import { List, ListItem, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment/moment'
import BookingTable from './bookingTable'
import React from 'react'
import AvailabilityTable from './availabilityTable'

interface Musician {
  id: number
  createdAt: string
  updatedAt: string
  recieved: boolean
  accepted: boolean | null
  musicianEmail: string
  eventInstrumentId: number
  bookingOrAvailability: "Booking"|"Availability"
  musician: {
    name: string
  }
  calls: {
    id: number
  }[]
  status: string
}

interface InstrumentSection {
  id: number
  createdAt: string
  updatedAt: string
  eventId: number
  instrumentName: string
  numToBook: number
  callOrder: string
  musicians: Musician[]
}

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

interface ActiveCallsProps {
  eventCalls: EventCall[]
  instrumentName: string
  instrumentSection: InstrumentSection
  editList: boolean
  instrumentFixed: boolean
  refreshProps: () => void
  closeEdit: Function
  bookingOrAvailability: "Booking"|"Availability"
  setSelectedTab?: (i: string) => void
}

export default function ActiveCalls(props: ActiveCallsProps) {
  const {eventCalls, instrumentSection, editList, refreshProps, closeEdit, bookingOrAvailability, setSelectedTab} = props
  const [callList, setCallList] = useState<any>([])

  useEffect(() => {
    setCallList([...instrumentSection.musicians.sort((a, b) => Number(a.id) - Number(b.id))])
  }, [editList])

  const removePlayer = async(callId: number): Promise<void> => {
    const reqBody = {
      playerCallId: callId
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
        removePlayer={(callId) => removePlayer(callId)} 
        fixOrUnfixPlayer={(fixOrUnfix, callId, musicianEmail) => fixOrUnfixPlayer(fixOrUnfix, callId, musicianEmail)}
        eventCalls={eventCalls} 
        instrumentSection={instrumentSection}/>
      : <AvailabilityTable 
        removePlayer={(callId) => removePlayer(callId)} 
        offerOrDecline={(offerOrDeclineBool, callId, musicianEmail) => offerOrDecline(offerOrDeclineBool, callId, musicianEmail)}
        eventCalls={eventCalls} 
        instrumentSection={instrumentSection}/>}
    </div>
  )
}