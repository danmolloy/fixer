import { Formik } from "formik";
import React from "react";
import EditCallsOptions from "./options";
import AvailablePlayers from "./availablePlayers";
import AppendedPlayers from "./appendedPlayers";
import ButtonPrimary from "../../index/buttonPrimary";

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

interface AppendedInstrumentalist {
  id: string
  name: string
  email: string
  emailVerified: boolean|null
  instrument: string
  profileInfo: null|string
  isFixer: null|boolean
  calls: string[]
  playerMessage?: string
}

export type HandleSubmitValues = {
  numToBook: number
  appendedPlayers: AppendedInstrumentalist[]
  availablePlayers: Instrumentalist[]
  callOrder: "Ordered"|"Random"|"Simultaneous"
  bookingOrAvailability: string/* "Booking"|"Availability" */
  messageToAll: string
  fixerNote: string
  bookingStatus: string
  offerExpiry?: string
}

export type RequestValues = {
  eventId: number
  musicians: {
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
  bookingOrAvailability: string /* "Booking"|"Availability" */
  messageToAll: string
  fixerNote: string
  bookingStatus: string
}

interface EditCallsProps {
  eventId: number
  handleSubmit: (vals: HandleSubmitValues) => void
  instrumentName: string
  instrumentalists: Instrumentalist[]
  eventCalls: EventCall[]
  eventInstrumentId: number
  bookingOrAvailability: string /* "Booking"|"Availability"  */

}

export default function EditCalls(props: EditCallsProps) {
  const { handleSubmit, instrumentName, instrumentalists, eventCalls, eventId, eventInstrumentId, bookingOrAvailability } = props

  return (
    <Formik
       initialValues={{ 
        numToBook: 1,
        appendedPlayers: [],
        availablePlayers: instrumentalists,
        callOrder: "Ordered",
        bookingOrAvailability: "Booking",
        messageToAll: "",
        fixerNote: "",
        bookingStatus: "",
        offerExpiry: "",
      }}
       onSubmit={(values: HandleSubmitValues, actions): void => {
          
          let requestObj: RequestValues = {
            eventId: eventId,
            musicians: values.appendedPlayers.filter(i => i.calls.length > 0).map(i => ({
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
          handleSubmit(requestObj)
          actions.setSubmitting(false);
       }}
     >
       {props => (
         <form className="edit-calls-form " onSubmit={props.handleSubmit} data-testid={`edit-calls-div`}>
          <AppendedPlayers makeAvailable={(i: Instrumentalist) => props.values.availablePlayers.push(i)} eventCalls={eventCalls} appendedPlayers={props.values.appendedPlayers} />
          <AvailablePlayers 
            instrumentName={instrumentName} 
            availablePlayers={props.values.availablePlayers} 
            appendPlayer={(i) => props.values.appendedPlayers.push({...i, calls: [...eventCalls.map(i => String(i.id))]})} />
          <EditCallsOptions instrumentName={instrumentName} isSubmitting={props.isSubmitting}/>
          <div className="w-full p-4 flex flex-row justify-between">
            <ButtonPrimary 
              id="pause-btn" 
              handleClick={() => {}} 
              text="Pause fixing" 
              className="px-5 text-white bg-red-600 border-red-600 hover:bg-red-500"/>
            <ButtonPrimary
              type="submit" 
              handleClick={() => {}} 
              id="fix-btn" 
              text="Fix" 
              className="px-5 text-white bg-emerald-500 border-emerald-500 hover:bg-emerald-400" />

          </div>
        </form>
       )}
     </Formik>
  )
}