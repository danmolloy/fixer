import { Call } from "@prisma/client";
import { DateTime } from "luxon";

export type TableHeadProps = {
  eventCalls: Call[]
}

export default function TableHead(props: TableHeadProps) {
  const { eventCalls } = props;

  return (
    <thead data-testid="table-head" className="border-b bg-slate-50">
      <tr>
        <th data-testid="name-cell"></th>
        {eventCalls.map(i => (
          <th key={i.id}>
            <p className="text-sm"> 
            {DateTime.fromJSDate(new Date(i.startTime)).toFormat("hh:mm a")}
            </p>
            <p className="text-sm">
            {DateTime.fromJSDate(new Date(i.startTime)).toFormat("dd LLL")}

            </p></th>
        ))}
        <th data-testid="action-cell"></th>
      </tr>
    </thead>
  )
}

