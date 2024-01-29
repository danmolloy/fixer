import { useState } from "react";
import { EnsembleSectionWithMusicians } from "../../fixing"
import CreateInstrumentForm from "./createForm";
import CreateHeader from "./createHeader";
import { Call } from "@prisma/client";

export type CreateInstrumentProps = {
  section: EnsembleSectionWithMusicians
  eventCalls: Call[]
  eventId: number
  refreshProps: () => void
}

export default function CreateInstrumentIndex(props: CreateInstrumentProps) {
  const { refreshProps, eventId, eventCalls, section } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <div data-testid={`create-instrument-${section.id}`} className="w-[96vw] md:w-1/2 m-2 p-2 border rounded shadow-sm flex flex-col">
      <CreateHeader setShowOptions={() => setShowOptions(!showOptions)} section={section} />
      {showOptions && <CreateInstrumentForm refreshProps={() => refreshProps()} eventId={eventId}  eventCalls={eventCalls} section={section} />}
    </div>
  )
}