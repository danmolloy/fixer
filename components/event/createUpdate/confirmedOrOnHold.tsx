import { ErrorMessage, Field } from "formik"
import React from "react"

export type CoohProps = {
  setConfirmedOrOnHold: (arg: string) => void
  confirmedOrOnHold: string
} 

export default function ConfirmedOrOnHold(props: CoohProps) {
  const {  confirmedOrOnHold } = props
  return (
    <div data-testid="confirmed-or-on-hold-div" className="py-4 w-1/2 sm:self-start ">
      <label htmlFor="confirmedOrOnHold" className="text-slate-700">Gig Status</label>

      <div className="flex flex-col py-1" role="group" aria-label="confirmedOrOnHold" data-testid={`confirm-or-hold-toggle-group`}>
        <label className="py-1">
        <Field 
          className="mr-2"
          type="radio"
          id="confirmedOrOnHold"
          name="confirmedOrOnHold"
          value="Confirmed"
          data-testid={`confirmed-toggle`} />
          Confirmed
        </label>
        <label className="py-1">
        <Field 
          className="mr-2"
            type="radio"
            id="confirmedOrOnHold"
            name="confirmedOrOnHold"
            value="On Hold"
            data-testid={`on-hold-toggle`}
           />
          On Hold
        </label>
        <ErrorMessage name={`confirmedOrOnHold`}>
            { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={"confirmedOrOnHold-error"}>{msg}</div> }
        </ErrorMessage>
      </div>
      </div>

  )
}