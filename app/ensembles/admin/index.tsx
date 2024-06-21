import { EnsembleAdmin, User } from "@prisma/client"
import AdminTile from "./adminTile";

export type EnsembleManagementProps = {
  admins: (EnsembleAdmin & {user: User})[]
}

export default function EnsembleManagement(props: EnsembleManagementProps) {
  const{ admins } = props;
  return (
    <div data-testid="ensemble-management " className="outline">
      {admins.map(i => (
        <AdminTile key={i.id} admin={i} />
      ))}
    </div>
  )
}