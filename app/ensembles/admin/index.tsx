import { EnsembleAdmin, User } from '@prisma/client';
import AdminTile from './adminTile';
import Link from 'next/link';
import { buttonPrimary } from '../dashboard';

export type EnsembleManagementProps = {
  admins: (EnsembleAdmin & { user: User })[];
  ensembleId: string;
};

export default function EnsembleManagement(props: EnsembleManagementProps) {
  const { admins, ensembleId } = props;
  return (
    <div
      data-testid='ensemble-management '
      className='my-4 flex flex-col items-start rounded bg-slate-100 px-4 py-4'
    >
      <div className='flex w-full justify-between'>
        <h2>Management</h2>
      </div>
      <div className='my-2 flex w-full flex-col'>
        {admins.map((i) => (
          <AdminTile key={i.id} admin={i} />
        ))}
      </div>
    </div>
  );
}
