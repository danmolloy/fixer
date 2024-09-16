import { TbMailExclamation } from 'react-icons/tb';
import { TbMailOpened } from 'react-icons/tb';
import { BsThreeDotsVertical } from 'react-icons/bs';

export type NotificationsDashProps = {
  setPlayerCallFilter: (filter: 'action' | 'past' | null) => void;
  ensembleArray: {
    name: string;
    id: string;
  }[];
  setEnsembleFilter: (ensemble: string) => void;
  ensembleFilter: string | null;
  playerCallFilter: string | null;
};

export default function NotificationsDashboard(props: NotificationsDashProps) {
  const {
    playerCallFilter,
    setPlayerCallFilter,
    ensembleArray,
    ensembleFilter,
    setEnsembleFilter,
  } = props;

  return (
    <div
      data-testid='notifications-dashboard'
      className='flex flex-row overflow-scroll border-r shadow-sm md:w-1/5 md:flex-col md:items-start md:py-4 md:shadow-none'
    >
      <button
        onClick={() => setPlayerCallFilter('action')}
        className={`${playerCallFilter === 'action' && 'text-indigo-600'} flex flex-row items-center justify-center px-2 py-1 hover:text-indigo-600`}
      >
        <TbMailExclamation />
        Action Required
      </button>
      <button
        onClick={() => setPlayerCallFilter('past')}
        className={`${playerCallFilter === 'past' && 'text-indigo-600'} flex flex-row items-center justify-center px-2 py-1 hover:text-indigo-600`}
      >
        <TbMailOpened />
        Past Offers
      </button>
      <div className=''>
        <div className='hidden flex-row items-center justify-start px-2 py-1 md:flex'>
          <BsThreeDotsVertical />
          Filter by ensemble
        </div>
        <div className='ml-2 flex flex-row items-center justify-center px-2 py-1 md:flex-col md:items-start'>
          {ensembleArray.length > 0 &&
            ensembleArray.map((i) => (
              <button
                className={`${ensembleFilter === i.id && 'text-indigo-600'} flex flex-row px-2 py-1 text-start text-xs hover:text-indigo-600 md:px-2`}
                key={i.id}
                onClick={() => setEnsembleFilter(i.id)}
              >
                {i.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
