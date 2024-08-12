import { EnsembleAdmin, User } from "@prisma/client"
import AdminTile from "./adminTile";
import Link from "next/link";
import { buttonPrimary } from "../dashboard";

export type EnsembleManagementProps = {
  admins: (EnsembleAdmin & {user: User})[]
  ensembleId: string
}

export default function EnsembleManagement(props: EnsembleManagementProps) {
  const{ admins, ensembleId } = props;
  return (
    <div data-testid="ensemble-management " className="p-1 rounded flex flex-col items-start py-4">
      <div className="w-full flex justify-between">
      <h2>Management</h2>
      <Link className={buttonPrimary} href={`/ensembles/${ensembleId}/admin/invite`}>
        Invite Admin
      </Link>
      </div>
      <div className="flex flex-col w-full my-2">
        {admins.map(i => (
          <AdminTile key={i.id} admin={i} />
        ))}
      </div>
      
    </div>
  )
}