import { Call } from "@prisma/client";
import FixingTable, { PlayerCallsForTable } from "./table";
import InstrumentHeader from "./instrumentHeader";

export type FixingInstrumentProps = {
  eventCalls: Call[]
  playerCalls: PlayerCallsForTable[]
}

export default function FixingInstrument(props: FixingInstrumentProps) {
  const { eventCalls, playerCalls } = props;

  return (
    <div data-testid="fixing-instrument">
      <InstrumentHeader />
      <FixingTable eventCalls={eventCalls} playerCalls={playerCalls} />
    </div>
  )
}