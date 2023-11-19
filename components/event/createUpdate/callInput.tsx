import { ErrorMessage, Field } from "formik"
import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import TextInput from "./textInput"
import ComboBox from "./comboBox"

export const venueOptions = [
  {
    id: "0",
    textPrimary: "BBC Maida Vale Studios"
  },
  {
    id: "1",
    textPrimary: "LSO St Lukes"
  },
  {
    id: "2",
    textPrimary: "Barbican Concert Hall"
  },
  {
    id: "3",
    textPrimary: "Royal Festival Hall"
  }
]

interface CallInputProps {
  index: any
  id: any
  remove: (arg: any) => void
  propsValueVenue: string
  setVenue: (venue: string) => void
}


export default function CallInput(props: CallInputProps) {
  const { index, remove, propsValueVenue, setVenue } = props
  return (
    <div data-testid={`call-${index}-input-div`} className="flex flex-col">
      <div className='flex flex-row items-center justify-between'>
        <p className="text-slate-700">{`Call ${index + 1}`}</p>
        {index !== 0 && 
        <button data-testid={`calls-${index}-delete`} className='delete-btn text-xl p-1 m-1 rounded-full hover:bg-slate-100 text-slate-700' onClick={() => remove(index)}>
          <AiOutlineClose />
        </button>}
      </div>
      <div className="flex flex-col sm:flex-row">
      <div className='flex flex-col py-4 w-1/2'>
        <label className='text-slate-700' htmlFor={`calls.${index}.startTime`}>Start Time</label>
      <Field
          label="Start Time"
          className="border rounded p-2 my-1 shadow-sm w-48"
          name={`calls.${index}.startTime`}
          id={`calls.${index}.startTime`}
          type="datetime-local"
        />
        <ErrorMessage name={`calls.${index}.startTime`}>
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`calls-${index}-startTime-error`}>{msg}</div> }
        </ErrorMessage>
        </div>
        
        <div className='flex flex-col py-4 w-1/2'>
        <label className='text-slate-700' htmlFor={`calls.${index}.endTime`}>End Time</label>
        
      <Field
          label="End Time"
          className="border rounded p-2 my-1 shadow-sm w-48"
          id={`calls.${index}.endTime`}
          name={`calls.${index}.endTime`}
          htmlFor={`calls.${index}.endTime`}
          type="datetime-local"
        />
        <ErrorMessage name={`calls.${index}.endTime`}>
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`calls-${index}-endTime-error`}>{msg}</div> }
        </ErrorMessage>
        </div>
        </div>
         {/*  <TextInput */}
          <ComboBox
          optional={false}
          setValue={(venue) => setVenue(venue)}
          options={venueOptions}
          propsValue={propsValueVenue}
          label="Venue"
          className=""
          id={`calls.${index}.venue`}
          name={`calls.${index}.venue`}
          asHtml="input"
        /> 
        <TextInput
        optional={true} 
          label={`Call Information`}
          className=""
          id={`calls.${index}.info`}
          name={`calls.${index}.info`}
          asHtml="textarea"
        /> 
        </div>
  )
}