import { User, Call } from "@prisma/client"
import { FieldArray } from "formik"
import AppendedMusician from "./appendedMusician"

export type AppendedTableProps = {
  musicians: {
    user: User,
    addedMessage: string
    calls: Call[]
  }[]
  allEventCalls: Call[]
}

export default function AppendedTable(props: AppendedTableProps) {
  const { musicians, allEventCalls } = props

  return (
    <FieldArray name="appendedPlayers">
      {({ insert, remove, push }) => (
        <tbody data-testid="appended-player-table">
          {musicians.map((i, index) => (
            <AppendedMusician addedMessage={`values.appendedPlayers[${index}]playerMessage`} remove={() => remove(index)} index={index} allEventCalls={allEventCalls} key={i.user.id} musician={i}/>
          ))}
        </tbody>
      )}
    </FieldArray>
  )
}