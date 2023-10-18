import { Call, EventInstrument } from "@prisma/client";
import FixingTable, { PlayerCallsForTable } from "./table";
import InstrumentHeader from "./instrumentHeader";
import TabSelect from "./tabSelect";
import { useState } from "react";

export type FixingInstrumentProps = {
  eventCalls: Call[]
  eventInstrument: EventInstrument
  playerCalls: PlayerCallsForTable[]
}

export default function FixingInstrument(props: FixingInstrumentProps) {
  const { eventCalls, playerCalls, eventInstrument } = props;
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<"Booking"|"Availability">("Booking")
  return (
    <div data-testid="fixing-instrument">
      <InstrumentHeader 
        showEdit={showEdit} 
        setShowEdit={setShowEdit} 
        eventInstrument={eventInstrument} 
        playerCalls={playerCalls}/>
      <TabSelect selectedTab={selectedTab} setSelectedTab={(arg) => setSelectedTab(arg)}/>
      <FixingTable eventCalls={eventCalls} playerCalls={playerCalls} selectedTab={selectedTab} />
    </div>
  )
}