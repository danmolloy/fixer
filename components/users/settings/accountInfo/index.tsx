import { Prisma } from "@prisma/client"
import { Field } from "formik"
import InstrumentsList from "./instrumentsList"
import FixingEnsembles from "./fixingEnsembles"

export type UserWithBlockedPlayers = Prisma.UserGetPayload<{
  include: {
    blockedUsers: true
  }
}>

export type AccountInfoProps = {
  user: UserWithBlockedPlayers
  instrumentsList: string[],
  ensemblesList: string[]
}

export default function AccountInfo(props: AccountInfoProps) {
  const { user, instrumentsList, ensemblesList } = props;
  return (
    <div data-testid="account-info">
      <InstrumentsList instrumentsList={instrumentsList} />
      <FixingEnsembles ensemblesList={ensemblesList} />
    </div>
  )
}