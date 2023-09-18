import React from "react"
import { ErrorMessage, Field } from "formik"
import TextInput from "./textInput";

export type EnsembleRadioProps = {
  isSubmitting: boolean
  ensemble: string
  ensembleName: string
  handleChange: any
  handleBlur: any
}

export default function EnsembleRadioGroup(props: EnsembleRadioProps) {
  const { ensembleName, handleChange, handleBlur, isSubmitting, ensemble } = props
  return (
    <div data-testid="ensemble-radio" className="flex flex-col py-3 sm:w-1/2 sm:self-start ">
      <label htmlFor="ensemble" className="text-slate-700">Ensemble</label>
      <div aria-labelledby="ensemble" role="group" data-testid="ensemble-radio-fieldset" className="flex flex-col py-1">
        <label className="py-1">
          <Field
          className="mr-2"
          type="radio"
          name="ensemble"
          value="BBC Symphony Orchestra"
          disabled={props.isSubmitting}/>
          BBC Symphony Orchestra
        </label>
        <label className="py-1">
          <Field
          className="mr-2"
          type="radio"
          name="ensemble"
          value="London Symphony Orchestra"
          disabled={props.isSubmitting}/>
          London Symphony Orchestra
        </label>
        <div className=''>
        <label className="py-1" >
          <Field
          data-testid="other-option"
          className="mr-2"
          type="radio"
          name="ensemble"
          value="Other"
          disabled={props.isSubmitting}/>
        Other
        </label> 
        {ensemble === "Other" 
        && <TextInput
          asHtml='input'
          label="Ensemble Name"
          id="other-ensemble"
          className='border shadow-sm p-2 rounded '
          name="ensembleName"
        /> }
        </div>
        
      </div>
      <ErrorMessage name={`ensemble`}>
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`create-form-error-ensemble`}>{msg}</div> }
        </ErrorMessage>
    </div>
  )
}