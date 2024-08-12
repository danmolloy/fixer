import { EnsembleAdmin, User } from "@prisma/client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export type AdminTileProps = {
  admin: EnsembleAdmin & {user: User}
}

export default function AdminTile(props: AdminTileProps) {
  const { admin } = props;
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  const handleDelete = async () => {
    const confText = `Are you sure you want to remove ${admin.user.firstName} ${admin.user.lastName} from this ensemble?`
    if (confirm(confText)) {
      return await axios.post("/ensembles/admin/api/delete", {adminId: admin.id}).then(() => {
        router.refresh();
      });
    }
  }
  
  return (
    <div data-testid={`${admin.id}-admin-tile`} className=" flex flex-row text-sm w-full justify-evenly">
      
      <div className={`w-8 h-8 rounded-full m-2 text-white bg-indigo-500 flex self-center items-center justify-center `}>
        {admin.user.firstName![0]}{admin.user.lastName![0]}
      </div>
      <div className="flex flex-col">
        <p>{`${admin.user.firstName} ${admin.user.lastName}`}</p>
        <p>{admin.positionTitle}</p>
        <p className="">{admin.accessType} access</p>

      </div>
      <div className="flex flex-col items-center">
        <p>
          {admin.user.mobileNumber}
        </p>
        <p>
          {admin.user.email}
        </p>
      </div>
      <div>
      <button onClick={() => {focus(); setShowMenu(!showMenu)}} onBlur={() => setTimeout(() => setShowMenu(false), 250)}>
        <BsThreeDotsVertical />
        <p className="hidden">Options</p>
      </button>
      {showMenu 
      && <div data-testid="options-menu" className="absolute flex flex-col bg-white border rounded -ml-10">
        <Link className="px-2 py-1 hover:bg-gray-50" href={`/ensembles/admin/update/${admin.id}`}>
          Edit
        </Link>
        <button className="px-2 py-1 hover:bg-gray-50" onClick={() => handleDelete()}>
          Delete
        </button>
      </div>}
      </div>
    </div>
  );
}