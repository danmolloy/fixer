import { Call, EventSection, Orchestration } from "@prisma/client"
import { getDateRange } from "../contactMessage/api/create/functions";
import { DateTime } from "luxon";

export type OrchestrationSummaryProps = {
  orchestration: Orchestration[];
  eventCalls: Call[]
}

export default function OrchestrationSummary(props: OrchestrationSummaryProps) {
  const { orchestration, eventCalls } = props;



  return (
    <div data-testid="orchestration-summary">
      {eventCalls.map( i => (
        <p key={i.id} className="text-sm">{DateTime.fromJSDate(new Date(i.startTime)).toFormat("HH:mm dd LLL")}: Booking {orchestration.find(j => j.callId === i.id) ? orchestration.find(j => j.callId === i.id)!.numRequired : 0} player(s)</p>
      ))}
    </div>
  )
}