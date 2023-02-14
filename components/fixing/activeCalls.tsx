import { useEffect, useState } from 'react'
import { GiEnvelope, GiConfirmed, GiCancel } from 'react-icons/gi'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import axios from "axios"
import { List, ListItem, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment/moment'
import BookingTable from './bookingTable'
import React from 'react'

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
  refreshProps: Function
  closeEdit: Function
}

export default function ActiveCalls(props: ActiveCallsProps) {
  const {eventCalls, instrumentSection, editList, refreshProps, closeEdit} = props
  const [callList, setCallList] = useState<any>([])

  useEffect(() => {
    setCallList([...instrumentSection.musicians.sort((a, b) => Number(a.id) - Number(b.id))])
  }, [editList])

  const removePlayer = e => {
    let obj = {
      playerCallId: e.id,
      musicianEmail: e.musicianEmail
    };

    axios.post('/api/fixing/unfixPlayer', obj)
    .then(() => {
        closeEdit();
        refreshProps();
      })
    .catch(function (error) {
      console.log(error);
    });
  }

  const acceptPlayer = e => {
    let obj = {
      playerCallId: e.id,
      musicianEmail: e.musicianEmail
    };

    axios.post('/api/fixing/fixPlayer', obj)
    .then(() => {
        closeEdit();
        refreshProps();
      })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="active-calls-div" data-testid={`active-calls-div`}>
      <BookingTable eventCalls={eventCalls} instrumentSection={instrumentSection}/>
    </div>
  )
}