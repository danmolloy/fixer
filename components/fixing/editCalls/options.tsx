import { Field } from "formik"
import React from "react"
import TextInput from '../../createEvent/textInput'

export type EditCallsOptionsProps = {
  instrumentName: string
  isSubmitting: boolean
  bookingOrAvailability: "Booking"|"Availability"|string
}

export default function EditCallsOptions(props: EditCallsOptionsProps) {
  const { instrumentName, isSubmitting, bookingOrAvailability } = props
  return (
    <div data-testid="edit-calls-options">
      <div className="p-2 flex flex-col">
      {bookingOrAvailability === "Booking" 
      && <div className="my-2 w-full ">
              <TextInput 
                className=" w-24 h-8"
                name={"numToBook"} 
                id={"num-to-book-input"} 
                label={"Num to Book"} 
                type={"number"}
                asHtml={"input"}
                min={"1"}
                max={"50"}
                />
                <div className="flex flex-col">
            <label htmlFor="callOrder" className="text-slate-700">Call Order</label>
            <div className="flex flex-col py-1" role="group" aria-label="callOrder" data-testid={`call-order-drop-down`}>
              <label>
                <Field 
                  name="callOrder"
                  value="Ordered"
                  type="radio"
                  className="mr-2"/>
                  Ordered
              </label>
              <label>
                <Field 
                  name="callOrder"
                  value="Simultaneous"
                  type="radio"
                  className="mr-2"/>
                  Simultaneous
              </label>
              <label>
                <Field 
                  name="callOrder"
                  value="Random"
                  type="radio"
                  className="mr-2"/>
                  Random
              </label>
            </div>
          </div>
          </div>
}
              <TextInput
                optional={true}  
                label="Message to all"
                id="instrument-msg"
                name="messageToAll"
                asHtml="textarea"
                className=""/>
                {bookingOrAvailability === "Booking" 
      && <div>
      <TextInput                 
                optional={true} 
                className=" w-24 h-8"
                name={"offerExpiry"} 
                id={"offer-expiry-input"} 
                label={"Offer Expiry (hours)"} 
                type={"number"}
                asHtml={"input"}
                min={"1"}
                max={"72"}
                />
                <TextInput
                optional={true} 
                label="Fixer reminder"
                id="fixer-note-input"
                name="fixerNote"
                asHtml="textarea"
                className=""/>
                </div>}
    </div>
    </div>
  )
}