import { Call, User } from "@prisma/client";
import { Formik } from "formik";
import { EventInstrumentWithMusiciansWithMusician } from "../../instrumentTile";
import ButtonPrimary from "../../../index/buttonPrimary";
import AppendedTable from "./appendedMusicians/appendedTable";
import EditOptions from "./editOptions";
import DirectoryMusicians from "./directoryMusicians";

export type InstrumentFormProps = {
  numToBook: number,
  musicians: {
    user: User,
    addedMessage: string
    calls: Call[]
  }[],
  eventInstrumentId: number,
  callOrder: string
  bookingOrAvailability: "Booking"|"Availability"
  messageToAll: string
  bookingStatus: string
}

export type EditInstrumentProps = {
  eventInstrument: EventInstrumentWithMusiciansWithMusician
  bookingOrAvailability: "Booking"|"Availability"
  handleSubmit: (vals: InstrumentFormProps) => void
  directoryMusicians: User[]
  allEventCalls: Call[]
}

export default function EditInstrument(props: EditInstrumentProps) {
  const { allEventCalls, eventInstrument, bookingOrAvailability, handleSubmit, directoryMusicians } = props;

  const initialVals: InstrumentFormProps = {
    numToBook: eventInstrument.numToBook,
    musicians: [],
    eventInstrumentId: eventInstrument.id,
    callOrder: eventInstrument.callOrder,
    bookingOrAvailability: bookingOrAvailability,
    messageToAll: eventInstrument.messageToAll,
    bookingStatus: eventInstrument.bookingStatus
  }

  return (
    <Formik 
      initialValues={initialVals} 
      onSubmit={(values: InstrumentFormProps, actions) => {
        handleSubmit(values)
        actions.setSubmitting(false);
      }}>
        {props => (
          <form data-testid="edit-instrument-form" onSubmit={props.handleSubmit}>
             {props.values.musicians.length > 0 
             && <AppendedTable allEventCalls={allEventCalls} musicians={props.values.musicians} />}
             <DirectoryMusicians musicians={directoryMusicians} allEventCalls={allEventCalls}/>
             <EditOptions bookingOrAvailability={bookingOrAvailability} />
             <ButtonPrimary
              isSubmitting={props.isSubmitting}
              type="submit" 
              handleClick={() => {}} 
              id="fix-btn" 
              text={bookingOrAvailability === "Availability" ? "Check availability" : "Fix"} 
              className="px-5 text-white bg-emerald-500 border-emerald-500 hover:bg-emerald-400" />
          </form> 
        )}
    </Formik>
  )
}