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
    <div>
      {selectedTab === "Booking" 
      ? <p>No offers made</p> 
      : <p>No availability checks made</p>}
    </div>)
  }

  return (
    <table data-testid="fixing-table">
      <TableHead eventCalls={eventCalls} />
      <tbody>
      {playerCalls.filter(i => i.bookingOrAvailability === selectedTab).map(i => (
        <PlayerRow key={i.id} allEventCalls={eventCalls} playerCall={i} />
      ))}
      </tbody>
    </table>
  )
}