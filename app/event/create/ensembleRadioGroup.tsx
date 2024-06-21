import React from "react"
import { ErrorMessage, Field } from "formik"
import Link from "next/link";
import { Prisma } from "@prisma/client";

export type AdminWithEnsemble = Prisma.EnsembleAdminGetPayload<{
  include: {
    ensemble: true
  }
}>

export type EnsembleRadioProps = {
  isSubmitting: boolean
  adminEnsembleList: AdminWithEnsemble[]
}

export default function EnsembleRadioGroup(props: EnsembleRadioProps) {
  const { adminEnsembleList, isSubmitting } = props;

  return (
    <div data-testid="ensemble-radio" className="flex flex-col py-3 sm:w-1/2 sm:self-start ">
      <p id="ensembleId" className="font-medium">Ensemble</p>
      <div aria-labelledby="ensembleId" role="group" className="flex flex-col py-1" >
        {adminEnsembleList.length === 0 
        ? <div data-testid="help-text">
          <h3>No ensembles listed.</h3>
          <p>To make an event, you first need to <Link data-testid="create-ensemble-link" href="/ensembles/edit">create an ensemble</Link>.</p>
        </div>
        : adminEnsembleList.map(i => (
          i.ensemble.ensembleNames.map(j => (
            <label key={j} className="py-1">
            <Field
            className="mr-2"
            type="radio"
            name="ensembleName"
            value={i.ensembleId}
            disabled={isSubmitting}/>
            {j}
          </label>
          ))
        ))}
        
      </div>
      <ErrorMessage name={`ensembleId`}>
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`ensembleId-error`}>{msg}</div> }
        </ErrorMessage>
    </div>
  )
}