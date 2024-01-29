import { useState } from "react";
import UpdateHeader from "./updateHeader";
import { EnsembleSection, EventSection, PlayerCall, User } from "@prisma/client";
import UpdateForm from "./updateForm";
import { EventWithCalls } from "../../../event/eventDetail/menu/calendarEventLink";
import { EnsembleSectionWithMusicians } from "../../fixing";
import TabSelect from "../tabSelect";
import FixingTable, { PlayerCallsForTable } from "./table";

export type UpdateIndexProps = {
  eventSection: EventSection
  ensembleSection: EnsembleSectionWithMusicians
  playerCalls: PlayerCallsForTable[]
  event: EventWithCalls
  refreshProps: () => void
}

export default function UpdateIndex(props: UpdateIndexProps) {
  const { refreshProps, event, eventSection, ensembleSection, playerCalls} = props;
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<"Booking"|"Availability">("Booking")

  return (
    <div data-testid={`${eventSection.id}-update-index`} className="w-[96vw] md:w-1/2 m-2 p-2 border rounded shadow-sm flex flex-col">
      <UpdateHeader 
        playerCalls={playerCalls}
        eventSection={eventSection}
        setShowEdit={(arg) => setShowEdit(arg)}
        showEdit={showEdit}
        sectionName={ensembleSection.name} />
      <TabSelect selectedTab={selectedTab} setSelectedTab={(arg) => setSelectedTab(arg)}/>
      <FixingTable selectedTab={selectedTab} playerCalls={playerCalls} eventCalls={event.calls}/>
      {showEdit && <UpdateForm
        eventSection={eventSection}
        refreshProps={refreshProps}
        playerCalls={playerCalls}
        setShowEdit={(arg) => setShowEdit(arg)}
        ensembleSection={ensembleSection} 
        bookingOrAvailability={selectedTab}
        eventCalls={event.calls}/>}
    </div>
  )
}