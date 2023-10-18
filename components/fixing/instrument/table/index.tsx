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
}

export default function FixingTable(props: FixingTableProps) {
  const { eventCalls, playerCalls } = props;

  if (playerCalls.length === 0) {
    return (<div><p>No calls made</p></div>)
  }

  return (
    <table data-testid="fixing-table">
      <TableHead eventCalls={eventCalls} />
      <tbody>
      {playerCalls.map(i => (
        <PlayerRow key={i.id} allEventCalls={eventCalls} playerCall={i} />
      ))}
      </tbody>
    </table>
  )
}