export type ViewSelectProps = {
  selectedView: 'details' | 'fixing' | 'playerList' | 'fullRun';
  setSelectedView: (
    arg: 'details' | 'fixing' | 'playerList' | 'fullRun'
  ) => void;
};

export default function EventViewSelect(props: ViewSelectProps) {
  const { selectedView, setSelectedView } = props;
  return (
    <div className='mb-2 flex w-screen flex-row items-center justify-start text-sm'>
      <button
        onClick={() => setSelectedView('details')}
        className={`${selectedView === 'details' ? 'font-semibold text-black' : 'text-slate-400'} flex flex-col px-2 py-2`}
      >
        <p className='pb-1'>Details</p>
        <span
          className={`${selectedView !== 'details' && 'hidden'} h-[2px] w-full bg-gradient-to-l from-white via-blue-500 to-white`}
        />
      </button>
      <button
        onClick={() => setSelectedView('fixing')}
        className={`${selectedView === 'fixing' ? 'font-semibold text-black' : 'text-slate-400'} flex flex-col px-2 py-2`}
      >
        <p className='pb-1'>Fixing</p>
        <span
          className={`${selectedView !== 'fixing' && 'hidden'} h-[2px] w-full bg-gradient-to-l from-white via-blue-500 to-white`}
        />
      </button>
      <button
        onClick={() => setSelectedView('playerList')}
        className={`${selectedView === 'playerList' ? 'font-semibold text-black' : 'text-slate-400'} flex flex-col px-2 py-2`}
      >
        <p className='pb-1'>Orchestra List</p>
        <span
          className={`${selectedView !== 'playerList' && 'hidden'} h-[2px] w-full bg-gradient-to-l from-white via-blue-500 to-white`}
        />
      </button>
      <button
        onClick={() => setSelectedView('fullRun')}
        className={`${selectedView === 'fullRun' ? 'font-semibold text-black' : 'text-slate-400'} flex flex-col px-2 py-2`}
      >
        <p className='pb-1'>Full Run</p>
        <span
          className={`${selectedView !== 'fullRun' && 'hidden'} h-[2px] w-full bg-gradient-to-l from-white via-blue-500 to-white`}
        />
      </button>
    </div>
  );
}
