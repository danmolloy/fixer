import { EnsembleAdmin, User } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export type AdminTileProps = {
  admin: EnsembleAdmin & { user: User };
};

export default function AdminTile(props: AdminTileProps) {
  const { admin } = props;
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = async () => {
    const confText = `Are you sure you want to remove ${admin.user.firstName} ${admin.user.lastName} from this ensemble?`;
    if (confirm(confText)) {
      return await axios
        .post('/ensembles/admin/api/delete', { adminId: admin.id })
        .then(() => {
          router.refresh();
        });
    }
  };

  return (
    <div
      data-testid={`${admin.id}-admin-tile`}
      className='w-full flex-row justify-evenly overflow-scroll rounded bg-white p-2 text-sm shadow sm:w-1/3 lg:w-1/4'
    >
      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center'>
            <p className='text-base'>{`${admin.user.firstName} ${admin.user.lastName}`}</p>
          </div>

          <div>
            <button
              onClick={() => {
                focus();
                setShowMenu(!showMenu);
              }}
              onBlur={() => setTimeout(() => setShowMenu(false), 250)}
            >
              <BsThreeDotsVertical />
              <p className='hidden'>Options</p>
            </button>
            {showMenu && (
              <div
                data-testid='options-menu'
                className='absolute -ml-10 flex flex-col rounded border bg-white'
              >
                <Link
                  className='px-2 py-1 hover:bg-gray-50'
                  href={`/ensembles/admin/update/${admin.id}`}
                >
                  Edit
                </Link>
                <button
                  className='px-2 py-1 hover:bg-gray-50'
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-row items-center'>
          <p className='text-gray-500'>{admin.positionTitle}</p>
          <div className='m-1 w-24 rounded-full border border-green-200 bg-green-50 text-center'>
            <p className='text-sm text-green-700'>
              {admin.accessType.slice(0, 1).toLocaleUpperCase()}
              {admin.accessType.slice(1).toLocaleLowerCase()} access
            </p>
          </div>
        </div>
      </div>

      <div className='my-2 flex flex-col'>
        <p>M: {admin.user.mobileNumber}</p>
        <p className=''>E: {admin.user.email}</p>
      </div>
    </div>
  );
}
