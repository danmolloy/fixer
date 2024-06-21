import { EnsembleAdmin, User } from "@prisma/client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";

export type AdminTileProps = {
  admin: EnsembleAdmin & {user: User}
}

export default function AdminTile(props: AdminTileProps) {
  const { admin } = props;
  const router = useRouter()

  const handleDelete = async () => {
    const confText = `Are you sure you want to remove ${admin.user.firstName} ${admin.user.lastName} from this ensemble?`
    if (confirm(confText)) {
      return await axios.post("/ensembles/admin/api/delete", {adminId: admin.id}).then(() => {
        router.refresh();
      });
    }
  }
  
  return (
    <div data-testid={`${admin.id}-admin-tile`}>
      <Link href={`/ensembles/admin/update/${admin.id}`}>
        Edit
      </Link>
      <button onClick={() => handleDelete()}>
        Delete
      </button>
      <div className={`w-8 h-8 rounded-full m-2 text-white bg-indigo-500 flex items-center justify-center `}>
        {admin.user.firstName![0]} {admin.user.lastName![0]}
      </div>
      <div>
        <p>{`${admin.user.firstName} ${admin.user.lastName}`}</p>
        <p>{admin.positionTitle}</p>
        <p>{admin.accessType} access</p>

      </div>
      <div>
        <p>
          {admin.user.mobileNumber}
        </p>
        <p>
          {admin.user.email}
        </p>
      </div>
    </div>
  );
}