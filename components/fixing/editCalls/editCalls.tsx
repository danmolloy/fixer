import { Field, FieldArray, Formik, insert } from "formik";
import { useState } from "react";
import React from "react";
import EditCallsOptions from "./options";
import AvailablePlayers from "./availablePlayers";
import AppendedPlayers from "./appendedPlayers";
import ButtonPrimary from "../../index/buttonPrimary"

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

interface HandleSubmitValues {
  numToBook: number
  appendedPlayers: any[]
  availablePlayers: Instrumentalist[]
  callOrder: "Ordered"|"Random"|"Simultaneous"
  bookingOrAvailability: "Booking"|"Availability"
  messageToAll: string
  fixerNote: string
  bookingStatus: string
}

interface EditCallsProps {
  handleSubmit: (vals: HandleSubmitValues) => void
  instrumentName: string
  instrumentalists: Instrumentalist[]
  eventCalls: EventCall[]
}

export default function EditCalls(props: EditCallsProps) {
  const { handleSubmit, instrumentName, instrumentalists, eventCalls} = props
  const [checkBook, setCheckBook] = useState("book")

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
      }}
       onSubmit={(values: HandleSubmitValues, actions): void => {
          //handleSubmit(values)
          alert(JSON.stringify(values))
          actions.setSubmitting(false);
       }}
     >
       {props => (
         <form className="edit-calls-form " onSubmit={props.handleSubmit} data-testid={`edit-calls-div`}>
          <AppendedPlayers eventCalls={eventCalls} appendedPlayers={props.values.appendedPlayers} />
          <AvailablePlayers 
            instrumentName={instrumentName} 
            availablePlayers={props.values.availablePlayers} 
            appendPlayer={(i) => props.values.appendedPlayers.push({...i, calls: [...eventCalls.map(i => ({"id": i.id, "offered": false}))]})} />
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