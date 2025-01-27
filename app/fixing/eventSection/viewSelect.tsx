export type SectionSelectProps = {
  selectedView: 'AVAILABILITY' | 'BOOKING';
  setSelectedView: (arg: 'AVAILABILITY' | 'BOOKING') => void;
  disabled: boolean;
  availabilityCheckCount: number;
};

export default function SectionViewSelect(props: SectionSelectProps) {
  const { selectedView, setSelectedView, disabled, availabilityCheckCount } =
    props;
  return (
    <div className='mb-2 flex w-screen flex-row items-center justify-start text-sm'>
      <button
        disabled={disabled}
        onClick={() => setSelectedView('BOOKING')}
        className={`${selectedView === 'BOOKING' ? 'font-semibold text-black' : 'text-slate-400'} flex flex-col px-2 py-2`}
      >
        <p className='pb-1'>Booking</p>
        <span
          className={`${selectedView !== 'BOOKING' && 'hidden'} h-[2px] w-full bg-gradient-to-l from-white via-blue-500 to-white`}
        />
      </button>
      <button
        disabled={disabled}
        onClick={() => setSelectedView('AVAILABILITY')}
        className={`${selectedView === 'AVAILABILITY' ? 'font-semibold text-black' : 'text-slate-400'} flex flex-col px-2 py-2`}
      >
        <p className='pb-1'>Availability ({availabilityCheckCount})</p>
        <span
          className={`${selectedView !== 'AVAILABILITY' && 'hidden'} h-[2px] w-full bg-gradient-to-l from-white via-blue-500 to-white`}
        />
      </button>
    </div>
  );
}
