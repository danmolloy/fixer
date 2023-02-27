import { Button, FormControlLabel, Radio, TextField, ToggleButton } from "@mui/material";
import { Field, FieldArray, Formik, insert } from "formik";
import { RadioGroup, ToggleButtonGroup } from "formik-mui";
import { useState } from "react";
import React from "react";
import EditCallsOptions from "./options";
import AvailablePlayers from "./availablePlayers";
import AppendedPlayers from "./appendedPlayers";

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
  availablePlayers: Instrumentalist[],
  callOrder: "Ordered"|"Random"|"Simultaneous"
  checkBook: "book"
}

interface EditCallsProps {
  handleSubmit: (vals: HandleSubmitValues) => void
  instrumentName: string
  instrumentalists: Instrumentalist[]
}

export default function EditCalls(props: EditCallsProps) {
  const { handleSubmit, instrumentName, instrumentalists} = props
  const [checkBook, setCheckBook] = useState("book")

  return (
    <Formik
       initialValues={{ 
        numToBook: 1,
        appendedPlayers: [],
        availablePlayers: instrumentalists,
        callOrder: "Ordered",
        checkBook: "book"
      }}
       onSubmit={(values: HandleSubmitValues, actions): void => {
          handleSubmit(values)
          actions.setSubmitting(false);
       }}
     >
       {props => (
         <form className="edit-calls-form " onSubmit={props.handleSubmit} data-testid={`edit-calls-div`}>
          <AppendedPlayers appendedPlayers={props.values.appendedPlayers} />
          <AvailablePlayers 
            instrumentName={instrumentName} 
            availablePlayers={props.values.availablePlayers} 
            appendPlayer={(i) => props.values.appendedPlayers.push(i)} />
          <EditCallsOptions instrumentName={instrumentName} isSubmitting={props.isSubmitting}/>
          <Button data-testid="fix-btn" className="fix-btn" variant="outlined" type="submit">Fix</Button>
         </form>
       )}
     </Formik>
  )
}