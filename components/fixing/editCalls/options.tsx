import { FormControlLabel, Radio, TextField } from "@mui/material"
import { Field } from "formik"
import { RadioGroup } from "formik-mui"
import React from "react"

interface EditCallsOptionsProps {
  instrumentName: string
  isSubmitting: boolean
}

export default function EditCallsOptions(props: EditCallsOptionsProps) {
  const { instrumentName, isSubmitting, } = props
  return (
    <div data-testid="edit-calls-options">
      <div className="edit-div-sans-lists flex flex-col">
            <div className="my-2 w-full ">
            <TextField label="Num to Book" data-testid={`${instrumentName}-num-to-book`} id="numToBook" type="number" name="numToBook" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            <Field className="w-full" label={`Message to ${String(instrumentName).toLocaleLowerCase()} players`} data-testid={`instrument-msg-input`} id="instrumentMsgInput" type="text" name="instrumentMsgInput" rows={4}/>
            
            </div>
          <div className="form-div">
          <label htmlFor="callOrder" className="form-label">Call Order</label>
          <Field data-testid={`call-order-drop-down`} label="Call Order" component={RadioGroup} name="callOrder" >
                <FormControlLabel 
                value="Ordered"
                control={<Radio disabled={isSubmitting} />}
                label="Ordered"
                disabled={props.isSubmitting}/>
                <FormControlLabel 
                value="Random"
                control={<Radio disabled={isSubmitting} />}
                label="Random"
                disabled={props.isSubmitting}/>
                <FormControlLabel 
                value="Simultaneous"
                control={<Radio disabled={isSubmitting} />}
                label="Simultaneous"
                disabled={props.isSubmitting}/>
          </Field>
          </div>
    </div>
    </div>
  )
}