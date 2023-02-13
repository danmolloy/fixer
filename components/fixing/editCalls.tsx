import { Button, FormControlLabel, Radio, TextField, ToggleButton } from "@mui/material";
import { Field, FieldArray, Formik, insert } from "formik";
import { RadioGroup, ToggleButtonGroup } from "formik-mui";
import { useState } from "react";
import React from "react";

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
         <form className="edit-calls-form " onSubmit={props.handleSubmit} data-testid={`${instrumentName}-edit`}>
          <FieldArray name="appendedPlayers">
            {({ insert, remove, push}) => (
              <div className="call-list-div appended-list">
              {props.values.appendedPlayers.map((i, index) => (
                <div className="call-list-item" key={i.id}>
                <p>{i.name}</p>
                </div>
              ))}
            </div>
            )}
          </FieldArray>
          

          <FieldArray  name="availablePlayers" data-testid={`${instrumentName}-not-called`}>
            {({ insert, remove, push}) => (
              <div className="call-list-div available-players-list">
            <h3 className="text-sm pl-4">Select players</h3>
                {props.values.availablePlayers.length > 0 
                ? props.values.availablePlayers.map((i, index) => (
                  <button className="call-list-item edit-calls-item" onClick={() => {
                    props.values.appendedPlayers.push(i);
                    remove(index)
                    }} key={i.id} >
                  <p>{i.name}</p>
                  </button>
                ))
                : <p className="no-players">No players to select</p>}
              </div>
    
            )}
          </FieldArray>
          <div className="edit-div-sans-lists flex flex-col">
            <div className="my-2 w-full ">
            <TextField label="Num to Book" data-testid={`${instrumentName}-num-to-book`} id="numToBook" type="number" name="numToBook" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            <TextField className="w-full" label={`Message to ${String(instrumentName).toLocaleLowerCase()} players`} data-testid={`instrument-msg-input`} id="instrumentMsgInput" type="text" name="instrumentMsgInput" multiline rows={4}/>
            
            </div>
          <div className="form-div">
          <label htmlFor="callOrder" className="form-label">Call Order</label>
          <Field data-testid={`call-order-drop-down`} label="Call Order" component={RadioGroup} name="callOrder" >
                <FormControlLabel 
                value="Ordered"
                control={<Radio disabled={props.isSubmitting} />}
                label="Ordered"
                disabled={props.isSubmitting}/>
                <FormControlLabel 
                value="Random"
                control={<Radio disabled={props.isSubmitting} />}
                label="Random"
                disabled={props.isSubmitting}/>
                <FormControlLabel 
                value="Simultaneous"
                control={<Radio disabled={props.isSubmitting} />}
                label="Simultaneous"
                disabled={props.isSubmitting}/>
          </Field>
          </div>
          <Button className="fix-btn" variant="outlined" type="submit">Fix</Button>
          </div>
         </form>
       )}
     </Formik>
  )
}