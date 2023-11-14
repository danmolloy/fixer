import { Field } from "formik";
import TextInput from "../../../event/createUpdate/textInput";

export type EditOptionsProps = {
  bookingOrAvailability: "Booking"|"Availability"
}

export default function EditOptions(props: EditOptionsProps) {
  const { bookingOrAvailability } = props

  return (
    <div data-testid="edit-calls-options" className="m-2">
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
              {bookingOrAvailability === "Availability"
              && <label className="flex flex-row p-2">
                <input data-testid="strictly-tied-toggle" type="checkbox" className="mx-2"/>
                Calls are strictly tied
                </label>

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
{/*       <TextInput                 
                optional={true} 
                className=" w-24 h-8"
                name={"offerExpiry"} 
                id={"offer-expiry-input"} 
                label={"Offer Expiry (hours)"} 
                type={"number"}
                asHtml={"input"}
                min={"1"}
                max={"72"}
                /> */}
                </div>}
    </div>
    </div>
  )
}