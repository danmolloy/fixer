import { User, Call } from "@prisma/client"
import { FieldArray } from "formik"
import AppendedMusician from "./appendedMusician"
import { DateTime } from "luxon"

export type AppendedTableProps = {
  musicians: {
    positionTitle: string,
    user: User,
    addedMessage: string
    calls: String[]
  }[]
  allEventCalls: Call[]
  setMessage: (field: string, msg: string) => void
}

export default function AppendedTable(props: AppendedTableProps) {
  const { musicians, allEventCalls, setMessage } = props

  return (
    <table data-testid="appended-table" className="border my-4 w-full">
       <thead data-testid="table-head" className="border-b bg-slate-50">
      <tr>
        <th data-testid="name-cell">
          
        </th>
        {allEventCalls.map(i => (
          <th key={i.id}>
            <p className="text-sm">
            {DateTime.fromJSDate(new Date(i.startTime)).toFormat("hh:mm a")}
            </p>
            <p className="text-sm">
            {DateTime.fromJSDate(new Date(i.startTime)).toFormat("dd LLL")}

            </p>
            </th>
        ))}
        <th data-testid="action-cell"></th>
      </tr>
    </thead>
    <FieldArray name="musicians">
      {({ insert, remove, move, swap }) => (
        <tbody className="w-full " data-testid="appended-player-table">
          {musicians.map((i, index) => (
            <AppendedMusician listLength={musicians.length} move={(index1, index2) => move(index1, index2)} remove={() => remove(index)} setMessage={(msg) => setMessage(`musicians[${index}].addedMessage`, msg)} addedMessage={musicians[index].addedMessage} index={index} allEventCalls={allEventCalls} key={i.user.id} musician={i}/>
          ))}
        </tbody>
      )}
    </FieldArray>
    </table>
  )
}