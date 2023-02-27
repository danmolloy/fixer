import { ErrorMessage, Field } from "formik"
import { TextField } from "formik-mui"
import React from "react"
import { AiOutlineClose } from "react-icons/ai"

interface CallInputProps {
  index: any
  id: any
  remove: (arg: any) => void
}

export default function CallInput(props: CallInputProps) {
  const { index, remove } = props
  return (
    <div data-testid="call-input-div">
      <div className='flex flex-row items-center justify-between'>
        <p>{`Call ${index + 1}`}</p>
        {index !== 0 && 
        <button data-testid={`calls-${index}-delete`} className='delete-btn text-xl p-1 m-1 rounded-full hover:bg-slate-100 active:bg-white' onClick={() => remove(index)}>
          <AiOutlineClose />
        </button>}
      </div>
      <div className='datetime-div'>
        <label className='datetime-label' htmlFor={`calls.${index}.startTime`}>Start Time</label>
      <Field
          label="Start Time"
          className="datetime-input "
          name={`calls.${index}.startTime`}
          id={`calls.${index}.startTime`}
          type="datetime-local"
        />
        </div>
        <ErrorMessage name={`calls.${index}.startTime`}>
          { msg => <div className="form-error" data-testid={`calls-${index}-startTime-error`}>{msg}</div> }
        </ErrorMessage>
        <div className='datetime-div'>
        <label className='datetime-label' htmlFor={`calls.${index}.endTime`}>End Time</label>
        
      <Field
          label="End Time"
          className="datetime-input"
          id={`calls.${index}.endTime`}
          name={`calls.${index}.endTime`}
          htmlFor={`calls.${index}.endTime`}
          type="datetime-local"
        />
        <ErrorMessage name={`calls.${index}.endTime`}>
          { msg => <div className="form-error" data-testid={`calls-${index}-endTime-error`}>{msg}</div> }
        </ErrorMessage>
        </div>
        <div>
          <Field 
          component={TextField}
          label="Venue"
          className="input-box"
          id={`calls.${index}.venue`}
          name={`calls.${index}.venue`}
          type="text"
        /> 
        <Field 
          component={TextField}
          label="Call Info"
          className="input-box"
          id={`calls.${index}.info`}
          name={`calls.${index}.info`}
          type="text"
        /> 
        </div>
        </div>
  )
}