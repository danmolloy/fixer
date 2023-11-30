import { Ensemble, Prisma } from "@prisma/client"
import { Field } from "formik"
import InstrumentsList from "./instrumentsList"
import FixingEnsembles from "./fixingEnsembles"
import EnsembleAdmin, { AdminWithEnsemble } from "./ensembleAdmin"

export type UserWithBlockedPlayers = Prisma.UserGetPayload<{
  include: {
    blockedUsers: true
  }
}>

export type AccountInfoProps = {
  user: UserWithBlockedPlayers
  instrumentsList: string[]
  ensembleAdminList: AdminWithEnsemble[]
}

export default function AccountInfo(props: AccountInfoProps) {
  const { user, instrumentsList, ensembleAdminList } = props;
  return (
    <div data-testid="account-info" className="p-1 my-8 flex flex-col items-center w-full">
      <InstrumentsList instrumentsList={instrumentsList} />
      <EnsembleAdmin ensembleAdminList={ensembleAdminList} />
    </div>
  )
}