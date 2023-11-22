import React from "react"
import { ErrorMessage, Field } from "formik"
import TextInput from "./textInput";

export type EnsembleRadioProps = {
  isSubmitting: boolean
  ensemble: string
  fixingEnsembles: string[]
}

export default function EnsembleRadioGroup(props: EnsembleRadioProps) {
  const { fixingEnsembles, ensemble, isSubmitting } = props
  return (
    <div data-testid="ensemble-radio" className="flex flex-col py-3 sm:w-1/2 sm:self-start ">
      <p id="ensemble" className="font-medium">Ensemble</p>
      <div aria-labelledby="ensemble" role="group" className="flex flex-col py-1">
        {fixingEnsembles.map(i => (
          <label key={i} className="py-1">
          <Field
          className="mr-2"
          type="radio"
          name="ensemble"
          value={i}
          disabled={isSubmitting}/>
          {i}
        </label>
        ))}
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
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`ensemble-error`}>{msg}</div> }
        </ErrorMessage>
    </div>
  )
}