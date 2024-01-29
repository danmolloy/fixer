import { FieldArray } from "formik";
import MemberTile, { EnsembleMemberWithUser } from "./memberTile";
import { Call, User } from "@prisma/client";

export type EnsembleMembersProps = {
  members: EnsembleMemberWithUser[]
  setSelectMember: (i: EnsembleMemberWithUser) => void
  eventCalls: Call[]
  appendedPlayers: {
    user: User;
    addedMessage: string;
    calls: Call[]
  }[]
  appendedPlayerIds: string[]
}

export default function EnsembleMembers(props: EnsembleMembersProps) {
  const { appendedPlayerIds, appendedPlayers, eventCalls, members, setSelectMember } = props;

  return (
    <div data-testid="ensemble-members">
      <h3>Ensemble Members</h3>
      {members.length === 0 
      ? <div>
        <p>No ensemble members on your list.</p>
        <p>Add them via Ensemble Page or find players in the directory or extra list.</p>
      </div> 
      : 
      <FieldArray name="musicians">
        {({ push }) => (
          members.map((i: EnsembleMemberWithUser) => (
            <MemberTile 
              disabled={appendedPlayerIds.includes(i.user.id)}
              member={i} 
              setSelectMember={() => push({
                calls: eventCalls.map(i => String(i.id)),
                addedMessage: "",
                musicianId: i.user.id,
                positionTitle: "tutti",
                user: i.user,
              })} 
              key={i.id} />
          ))
        )}
      </FieldArray>}
    </div>
  )
}