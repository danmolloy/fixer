import { Call } from "@prisma/client";
import { DateTime } from "luxon";

export type TableHeadProps = {
  eventCalls: Call[]
}

export default function TableHead(props: TableHeadProps) {
  const { eventCalls } = props;

  return (
    <div data-testid="table-head">
      <div data-testid="name-cell"></div>
      {eventCalls.map(i => (
        <div key={i.id}>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("ccc f")}</div>
      ))}
      <div data-testid="action-cell"></div>
    </div>
  )
}