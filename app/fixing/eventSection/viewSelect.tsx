
export type SectionSelectProps = {
  selectedView: 'Availability'|'Booking';
  setSelectedView: 
    (arg: 'Availability'|'Booking') => void
  disabled: boolean
}

export default function SectionViewSelect(props: SectionSelectProps) {
  const { selectedView, setSelectedView, disabled } = props;
  return (
    <div className="w-screen flex flex-row items-center justify-start text-sm  mb-2">
      <button 
        disabled={disabled}
        onClick={() => setSelectedView('Booking')} className={`${selectedView === 'Booking' ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Booking</p>
        <span className={`${selectedView !== "Booking" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
      <button 
        disabled={disabled}

        onClick={() => setSelectedView('Availability')} className={`${selectedView === "Availability" ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Availability</p>
        <span className={`${selectedView !== "Availability" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
      
    </div>
  )
}