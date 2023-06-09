import { Formik } from "formik";
import React from "react";
import EditCallsOptions from "./options";
import AvailablePlayers from "./availablePlayers";
import AppendedPlayers from "./appendedPlayers";
import ButtonPrimary from "../../index/buttonPrimary";
import { User } from "../fixing";

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
  isFixer?: null|boolean
}

interface AppendedInstrumentalist extends User {
  calls: string[]
  playerMessage?: string
}

export type HandleSubmitValues = {
  numToBook: number
  appendedPlayers: AppendedInstrumentalist[]
  availablePlayers: User[]
  callOrder: "Ordered"|"Random"|"Simultaneous"
  bookingOrAvailability: "Booking"|"Availability"
  messageToAll: string
  fixerNote: string
  bookingStatus: string
  offerExpiry?: string
}

export type RequestValues = {
  eventId: number
  musicians: {
    musicianId: string
    musicianEmail: string
    callsOffered: {
      id: number
    }[]
    eventInstrumentId: number
    playerMessage?: string
    offerExpiry?: number
  }[]
  eventInstrumentId: number
  numToBook: number
  callOrder: "Ordered"|"Random"|"Simultaneous"
  bookingOrAvailability: "Booking"|"Availability"
  messageToAll: string
  fixerNote: string
  bookingStatus: string
}

export type AvailabilityRequestValues = {
  eventId: number
  musicians: {
    musicianId: string
    musicianEmail: string
    callsOffered: {
      id: number
    }[]
    eventInstrumentId: number
    playerMessage?: string
    offerExpiry?: number
  }[]
  eventInstrumentId: number
  bookingOrAvailability: "Booking"|"Availability"
  messageToAll: string
  bookingStatus: string
}

interface EditCallsProps {
  eventId: number
  handleSubmit: (vals: RequestValues|AvailabilityRequestValues) => void
  instrumentName: string
  instrumentalists: User[]
  eventCalls: EventCall[]
  eventInstrumentId: number
  bookingOrAvailability: "Booking"|"Availability"
  contactedPlayers: string[]
}

export default function EditCalls(props: EditCallsProps) {
  const {contactedPlayers, handleSubmit, instrumentName, instrumentalists, eventCalls, eventId, eventInstrumentId, bookingOrAvailability } = props

  return (
    <Formik
       initialValues={{ 
        numToBook: 1,
        appendedPlayers: [],
        availablePlayers: instrumentalists,
        callOrder: "Ordered",
        bookingOrAvailability: bookingOrAvailability,
        messageToAll: "",
        fixerNote: "",
        bookingStatus: "",
        offerExpiry: "",
      }}
       onSubmit={(values: HandleSubmitValues, actions) => {
          let requestObj: RequestValues|AvailabilityRequestValues; 
          if (bookingOrAvailability === "Booking") {
            requestObj = {
              eventId: eventId,
              musicians: values.appendedPlayers.filter(i => i.calls.length > 0).map(i => ({
                musicianId: i.id,
                musicianEmail: i.email,
                callsOffered: [...i.calls.map(i => ({id: Number(i)}))],
                playerMessage: i.playerMessage,
                eventInstrumentId: eventInstrumentId,
                offerExpiry: Number(values.offerExpiry)
              })),
              eventInstrumentId: eventInstrumentId,
              numToBook: values.numToBook, 
              callOrder: values.callOrder, 
              bookingOrAvailability: bookingOrAvailability, 
              messageToAll: values.messageToAll,
              fixerNote: values.fixerNote, 
              bookingStatus: values.bookingStatus
            }
          } else {
            requestObj = {
              eventId: eventId,
              musicians: values.appendedPlayers.filter(i => i.calls.length > 0).map(i => ({
                musicianId: i.id,
                musicianEmail: i.email,
                callsOffered: [...i.calls.map(i => ({id: Number(i)}))],
                playerMessage: i.playerMessage,
                eventInstrumentId: eventInstrumentId,
                offerExpiry: Number(values.offerExpiry)
              })),
              eventInstrumentId: eventInstrumentId,
              bookingOrAvailability: bookingOrAvailability, 
              messageToAll: values.messageToAll,
              bookingStatus: values.bookingStatus
            }
          }
          handleSubmit(requestObj)
          actions.setSubmitting(false);
       }}
     >
       {props => (
         <form className="edit-calls-form " onSubmit={props.handleSubmit} data-testid={`edit-calls-div`}>
          <div className="border m-2 rounded shadow-sm py-4">
          <label htmlFor="appendedPlayers" className="m-4 p-2 text-lg">Add Players</label>
          <AppendedPlayers makeAvailable={(i: User) => props.values.availablePlayers.push(i)} eventCalls={eventCalls} appendedPlayers={props.values.appendedPlayers} />
          <AvailablePlayers 
            contactedPlayers={contactedPlayers}
            instrumentName={instrumentName} 
            availablePlayers={props.values.availablePlayers} 
            appendPlayer={(i) => props.values.appendedPlayers.push({...i, calls: [...eventCalls.map(i => String(i.id))]})} />
          </div>
          <EditCallsOptions bookingOrAvailability={bookingOrAvailability} instrumentName={instrumentName} isSubmitting={props.isSubmitting}/>
          <div className="w-full p-4 flex flex-row justify-between">
            <ButtonPrimary 
              id="pause-btn" 
              handleClick={() => {}} 
              text={bookingOrAvailability === "Availability" ? "Pause checks" : "Pause fixing"} 
              className="px-5 text-white bg-red-600 border-red-600 hover:bg-red-500"/>
            <ButtonPrimary
              isSubmitting={props.isSubmitting}
              type="submit" 
              handleClick={() => {}} 
              id="fix-btn" 
              text={bookingOrAvailability === "Availability" ? "Check availability" : "Fix"} 
              className="px-5 text-white bg-emerald-500 border-emerald-500 hover:bg-emerald-400" />

          </div>
        </form>
       )}
     </Formik>
  )
}