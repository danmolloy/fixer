import { Call, PlayerCall, Prisma } from "@prisma/client";
import TableHead from "./tableHead";
import PlayerRow from "./playerRow";

export type PlayerCallsForTable = Prisma.PlayerCallGetPayload<{
  include: {
    calls: true,
    musician: true
  }
}>

export type FixingTableProps = {
  eventCalls: Call[]
  playerCalls: PlayerCallsForTable[]
  selectedTab: "Booking"|"Availability"
}

export default function FixingTable(props: FixingTableProps) {
  const { eventCalls, playerCalls, selectedTab } = props;

  if (playerCalls.filter(i => i.bookingOrAvailability === selectedTab).length === 0) {
    return (
    <div className="h-24 flex items-center justify-center border m-2 bg-slate-50">
      {selectedTab === "Booking" 
      ? <p className="font-bold ">No offers made</p> 
      : <p className="font-bold ">No availability checks made</p>}
    </div>)
  }

  return (
    <table data-testid="fixing-table" className="border m-2">
      <TableHead eventCalls={eventCalls} />
      <tbody>
      {playerCalls.filter(i => i.bookingOrAvailability === selectedTab).sort((a,b) => a.id - b.id).map(i => (
        <PlayerRow key={i.id} allEventCalls={eventCalls} playerCall={i} />
      ))}
      </tbody>
    </table>
  )
}