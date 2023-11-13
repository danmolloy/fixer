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
}

export default function AccountInfo(props: AccountInfoProps) {
  const { user } = props;
  return (
    <div data-testid="account-info" className=" w-[96vw]">
      <InstrumentsList instrumentsList={user.instrumentsList} />
      <FixingEnsembles ensemblesList={user.fixingEnsembles} />
    </div>
  )
}