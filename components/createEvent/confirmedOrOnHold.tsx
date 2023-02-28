import { ErrorMessage, Field } from "formik"
import React from "react"

interface CoohProps {
  setConfirmedOrOnHold: (arg: string) => void
  confirmedOrOnHold: string
} 

export default function ConfirmedOrOnHold(props: CoohProps) {
  const {  confirmedOrOnHold } = props
  return (
    <div className="py-4 w-1/2 sm:self-start ">
      <label htmlFor="confirmedOrOnHold" className="text-slate-700">Gig Confirmed</label>

      <div className="flex flex-col py-1" role="group" aria-label="confirmedOrOnHold" data-testid={`confirm-or-hold-toggle-group`}>
        <label className="py-1">
        <Field 
          className="mr-2"
          type="radio"
          name="confirmedOrOnHold"
          value="confirmed"
          data-testid={`confirmed-toggle`} />
          Confirmed
        </label>
        <label className="py-1">
        <Field 
          className="mr-2"
            type="radio"
            name="confirmedOrOnHold"
            value="onHold"
            data-testid={`on-hold-toggle`}
           />
          On Hold
        </label>
        <ErrorMessage name={`confirmedOrOnHold`}>
            { msg => <div className="form-error" data-testid={`create-form-error-confirm-on-hold`}>{msg}</div> }
        </ErrorMessage>
      </div>
      </div>

  )
}