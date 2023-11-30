import React from "react"
import { ErrorMessage, Field } from "formik"
import TextInput from "./textInput";
import { AdminWithEnsemble } from "../../users/settings/accountInfo/ensembleAdmin";
import Link from "next/link";

export type EnsembleRadioProps = {
  isSubmitting: boolean
  fixingEnsembles: string[]
  adminEnsembleList: AdminWithEnsemble[]
}

export default function EnsembleRadioGroup(props: EnsembleRadioProps) {
  const { adminEnsembleList,  fixingEnsembles, isSubmitting } = props
  return (
    <div data-testid="ensemble-radio" className="flex flex-col py-3 sm:w-1/2 sm:self-start ">
      <p id="ensembleId" className="font-medium">Ensemble</p>
      <div aria-labelledby="ensembleId" role="group" className="flex flex-col py-1">
        {adminEnsembleList.length === 0 
        ? <div data-testid="help-text">
          <h3>No ensembles listed.</h3>
          <p>To make an event, you first need to <Link data-testid="create-ensemble-link" href="/ensembles/edit">create an ensemble</Link>.</p>
        </div>
        : adminEnsembleList.map(i => (
          <label key={i.ensembleId} className="py-1">
          <Field
          className="mr-2"
          type="radio"
          name="ensembleId"
          value={i.ensembleId}
          disabled={isSubmitting}/>
          {i.ensemble.name}
        </label>
        ))}
        
      </div>
      <ErrorMessage name={`ensembleId`}>
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`ensembleId-error`}>{msg}</div> }
        </ErrorMessage>
    </div>
  )
}