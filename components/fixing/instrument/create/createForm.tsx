import { ErrorMessage, Formik } from "formik"
import { EnsembleSectionWithMusicians } from "../../fixing"
import TextInput from "../../../event/createUpdate/textInput";
import AppendedTable from "../players/appendedMusicians/appendedTable";
import { Call } from "@prisma/client";
import EnsembleMembers from "../players/ensembleMembers";
import ExtraPlayers from "../players/extraPlayers";
import ButtonPrimary from "../../../layout/components/buttonPrimary";
import axios from "axios";
import * as Yup from "yup";
import TabSelect from "../tabSelect";
import { CreateEnsembleSectionProps } from "../../../../pages/api/fixing/bookingFunctions/prismaFunctions";

export type CreateInstrumentFormProps = {
  section: EnsembleSectionWithMusicians
  eventCalls: Call[]
  eventId: number
  refreshProps: () => void
}

export default function CreateInstrumentForm(props: CreateInstrumentFormProps) {
  const { refreshProps, eventId, eventCalls, section } = props;

  const handleSubmit = async (values: CreateEnsembleSectionProps) => {
    await axios.post("/api/event/section/create", values)
    refreshProps()
  };

  const CreateInstrumentSchema = Yup.object().shape({
    eventId: Yup.number().required("event ID required"),
    //ensembleId: Yup.string().required("ensemble ID required"),
    ensembleSectionId: Yup.string().required("ensemble section ID required"),
    bookingOrAvailability: Yup.string().required("booking or availability required"),
    musicians: Yup.array().of(Yup.object({
      calls: Yup.array().of(Yup.string()).required().min(1),
      addedMessage: Yup.string(),
      musicianId: Yup.string().required(),
      positionTitle: Yup.string().required("player position title required"),
    })).min(1, "Not enough players on call list. Must have enough players to complete booking"),
    numToBook: Yup.number().required().when("bookingOrAvailability", {
      is: "Booking",
      then: Yup.number().required().min(1, "Must book at least 1 player")
    })
  })

  return (
    <Formik 
      initialValues={{
        eventId: eventId,
        //ensembleId: section.ensembleId,
        ensembleSectionId: section.id,
        musicians: [],
        numToBook: 0,
        bookingOrAvailability: "Booking"
      }} 
      validationSchema={CreateInstrumentSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values).then(() => {
          actions.setSubmitting(false);
        })
      }}>
      {(props) => (
        <form className="flex flex-col" data-testid="create-form" onSubmit={props.handleSubmit}>
          <TabSelect selectedTab={props.values.bookingOrAvailability} setSelectedTab={arg => props.setFieldValue("bookingOrAvailability", arg)} />
          {props.values.musicians.length > 0 
              && <AppendedTable  setMessage={(field, msg) => props.setFieldValue(field, msg)} allEventCalls={eventCalls} musicians={props.values.musicians} />}
          <ErrorMessage name="musicians">
            {(err) => <p>{err}</p>}
          </ErrorMessage>
          <EnsembleMembers appendedPlayerIds={[...props.values.musicians].map(i => i.musicianId)} appendedPlayers={props.values.musicians} eventCalls={eventCalls} setSelectMember={() => {}} members={section.members} />
          <ExtraPlayers appendedPlayerIds={[...props.values.musicians].map(i => i.musicianId)} appendedPlayers={props.values.musicians} eventCalls={eventCalls} setSelectExtra={() => {}} extras={section.extras} />
           {props.values.bookingOrAvailability === "Booking" 
           && <TextInput 
                className=" w-24 h-8"
                name={"numToBook"} 
                id={"num-to-book"} 
                label={"Num to Book"} 
                type={"number"}
                asHtml={"input"}
                min={"0"}
                max={"50"}
                />}
                <ButtonPrimary
              isSubmitting={props.isSubmitting}
              type="submit" 
              handleClick={() => {}} 
              id="submit-btn" 
              text={props.values.bookingOrAvailability === "Availability" ? "Check availability" : "Fix"} 
              className={`${props.values.bookingOrAvailability === "Availability" ? "w-40": "w-24"} self-end m-2  text-white bg-emerald-500 border-emerald-500 hover:bg-emerald-400`} />
          <ErrorMessage name="eventId">
            {(err) => <p>{err}</p>}
          </ErrorMessage>
          <ErrorMessage name="ensembleId">
            {(err) => <p>{err}</p>}
          </ErrorMessage>
        </form>)}
    </Formik>
  )
}