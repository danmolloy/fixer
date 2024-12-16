
export type SectionSelectProps = {
  selectedView: 'AVAILABILITY'|'BOOKING';
  setSelectedView: 
    (arg: 'AVAILABILITY'|'BOOKING') => void
  disabled: boolean
  availabilityCheckCount: number
}

export default function SectionViewSelect(props: SectionSelectProps) {
  const { selectedView, setSelectedView, disabled, availabilityCheckCount } = props;
  return (
    <div className="w-screen flex flex-row items-center justify-start text-sm  mb-2">
      <button 
        disabled={disabled}
        onClick={() => setSelectedView('BOOKING')} className={`${selectedView === 'BOOKING' ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Booking</p>
        <span className={`${selectedView !== "BOOKING" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
      <button 
        disabled={disabled}

        onClick={() => setSelectedView('AVAILABILITY')} className={`${selectedView === "AVAILABILITY" ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Availability ({availabilityCheckCount})</p>
        <span className={`${selectedView !== "AVAILABILITY" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
      
    </div>
  )
}