import { Field } from "formik";
import TextInput from "../../../event/createUpdate/textInput";

export type EditOptionsProps = {
  bookingOrAvailability: "Booking"|"Availability"
}

export default function EditOptions(props: EditOptionsProps) {
  const { bookingOrAvailability } = props

  return (
    <div data-testid="edit-options" className="m-2">
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
        </div>}
    </div>
    </div>
  )
}