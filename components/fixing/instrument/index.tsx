import { Call, EventInstrument, User } from "@prisma/client";
import FixingTable, { PlayerCallsForTable } from "./table";
import InstrumentHeader from "./instrumentHeader";
import TabSelect from "./tabSelect";
import { useState } from "react";
import EditInstrument, { InstrumentFormProps } from "./edit";
import axios from "axios";

export type FixingInstrumentProps = {
  directoryMusicians: User[]
  eventCalls: Call[]
  eventInstrument: EventInstrument
  playerCalls: PlayerCallsForTable[]
  refreshProps: () => void

}

export default function FixingInstrument(props: FixingInstrumentProps) {
  const { refreshProps, eventCalls, playerCalls, eventInstrument, directoryMusicians } = props;
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<"Booking"|"Availability">("Booking")
  
  const handleSubmit = async (values: InstrumentFormProps): Promise<void> => {
    return axios.post("/api/fixing/editInstrument", values).then(() => {
      setShowEdit(false)
      refreshProps();
    })
  .catch(function (error) {
    console.log(error);
  });
  }
  
  return (
    <div data-testid="fixing-instrument" className="w-screen md:w-1/2 m-2 p-2 border rounded shadow-sm flex flex-col">
      <InstrumentHeader 
        showEdit={showEdit} 
        setShowEdit={setShowEdit} 
        eventInstrument={eventInstrument} 
        playerCalls={playerCalls}/>
      <TabSelect selectedTab={selectedTab} setSelectedTab={(arg) => setSelectedTab(arg)}/>
      <FixingTable eventCalls={eventCalls} playerCalls={playerCalls} selectedTab={selectedTab} />
      {showEdit 
      && <EditInstrument 
          eventMusicianIds={playerCalls.map((i): string => i.musician.id)}
          bookingOrAvailability={selectedTab}
          directoryMusicians={directoryMusicians}
          handleSubmit={(args) => handleSubmit(args)}
          eventInstrument={{...eventInstrument, musicians: playerCalls}} 
          allEventCalls={eventCalls}/>}
    </div>
  )
}