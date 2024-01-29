import { Call, User } from "@prisma/client"
import MemberTile, { EnsembleMemberWithUser } from "./memberTile"
import { FieldArray } from "formik"

export type ExtraPlayersProps = {
  extras: EnsembleMemberWithUser[]
  setSelectExtra: (i: EnsembleMemberWithUser) => void
  eventCalls: Call[]
  appendedPlayers: {
    user: User;
    addedMessage: string;
    calls: Call[]
  }[]
  appendedPlayerIds: string[]
}

export default function ExtraPlayers(props: ExtraPlayersProps) {
  const {appendedPlayerIds, eventCalls, appendedPlayers, extras, } = props;

  return (
    <div data-testid="extra-players">
      <h3>Extra Players</h3>
      {extras.length === 0 
      ? <div>
          <p>No extra players on your list.</p>
          <p>Add them via Ensemble Page or find players in the directory.</p>
        </div>
      : <FieldArray name="musicians">
        {({ push}) => (
        extras.map((i:EnsembleMemberWithUser) => (
          <MemberTile 
          disabled={appendedPlayerIds.includes(i.user.id)}
          key={i.id} 
            member={i} 
            setSelectMember={() => push({
              calls: eventCalls.map(i => String(i.id)),
              addedMessage: "",
              musicianId: i.user.id,
              positionTitle: "tutti",
              user: i.user,
            })} />
        ))
        )}
      </FieldArray>
    } 
    </div>
  )
}