import { Call } from "@prisma/client";
import { DateTime } from "luxon";

export type TableHeadProps = {
  eventCalls: Call[]
}

export default function TableHead(props: TableHeadProps) {
  const { eventCalls } = props;

  return (
    <thead data-testid="table-head">
      <tr>
        <th data-testid="name-cell"></th>
        {eventCalls.map(i => (
          <th key={i.id}>
            {DateTime.fromJSDate(new Date(i.startTime)).toFormat("ccc f")}</th>
        ))}
        <th data-testid="action-cell"></th>
      </tr>
    </thead>
  )
}