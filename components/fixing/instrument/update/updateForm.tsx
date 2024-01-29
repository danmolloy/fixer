
import { Call, EventSection, PlayerCall, User } from "@prisma/client";
import { Formik } from "formik";
import { EnsembleSectionWithMusicians, FixingSection } from "../../fixing"; 
import ButtonPrimary from "../../../layout/components/buttonPrimary";
import AppendedTable from "../players/appendedMusicians/appendedTable";
import EditOptions from "../edit/editOptions";
import ExtraPlayers from "../players/extraPlayers";
import EnsembleMembers from "../players/ensembleMembers";
import { UpdateEventSectionProps } from "../../../../pages/api/fixing/bookingFunctions/prismaFunctions";
import axios from "axios";

export type UpdateFormProps = {
  eventSection: EventSection
  ensembleSection: EnsembleSectionWithMusicians
  bookingOrAvailability: "Booking"|"Availability"
  //handleSubmit: (vals: UpdateEventSectionProps) => void
  eventCalls: Call[]
  playerCalls: PlayerCall[]
  setShowEdit: (arg: boolean) => void
  refreshProps: () => void
}

export default function UpdateForm(props: UpdateFormProps) {
  const { refreshProps, setShowEdit, eventSection, ensembleSection, bookingOrAvailability, playerCalls, eventCalls } = props;

  const initialVals = {
    numToBook: eventSection.numToBook,
    eventSectionId: eventSection.id,
    //messageToAll: "",
    musicians: []
  }

  const handleSubmit = (vals: UpdateEventSectionProps) => {
    axios.post("/api/event/section/update", vals).then(() => {
      setShowEdit(false)
      refreshProps();
    })
  .catch(function (error) {
    console.log(error);
  });
  }

  return (
    <Formik 
    initialValues={initialVals} 
    onSubmit={(values, actions) => {
      handleSubmit({
        ensembleSectionId: ensembleSection.id,
        bookingOrAvailability: bookingOrAvailability,
        eventSectionData: {
          numToBook: values.numToBook,
        },
        addedMusicians: values.musicians,
        eventSectionId: eventSection.id
      })
      actions.setSubmitting(false);
    }}>
      {props => (
        <form data-testid="update-form" onSubmit={props.handleSubmit} className="flex flex-col">
          {props.values.musicians.length > 0 
            && <AppendedTable  setMessage={(field, msg) => props.setFieldValue(field, msg)} allEventCalls={eventCalls} musicians={props.values.musicians} />}
          <EnsembleMembers appendedPlayerIds={[...playerCalls, ...props.values.musicians].map(i => i.musicianId)} appendedPlayers={props.values.musicians} eventCalls={eventCalls} setSelectMember={() => {}} members={ensembleSection.members} />
          <ExtraPlayers appendedPlayerIds={[...props.values.musicians].map(i => i.musicianId)} appendedPlayers={props.values.musicians} eventCalls={eventCalls} setSelectExtra={() => {}} extras={ensembleSection.extras} />
           <EditOptions bookingOrAvailability={bookingOrAvailability} />
           <ButtonPrimary
            isSubmitting={props.isSubmitting}
            type="submit" 
            handleClick={() => {}} 
            id="fix-btn" 
            text={bookingOrAvailability === "Availability" ? "Check availability" : "Fix"} 
            className={`${bookingOrAvailability === "Availability" ? "w-40": "w-24"} self-end m-2  text-white bg-emerald-500 border-emerald-500 hover:bg-emerald-400`} />
        </form> 
      )}
  </Formik>
  )
}
