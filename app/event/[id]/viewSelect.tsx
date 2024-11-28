
export type ViewSelectProps = {
  selectedView: 'details'|'fixing' | 'playerList' | 'fullRun';
  setSelectedView: 
    (arg: 'details'|'fixing' | 'playerList' | 'fullRun') => void
}

export default function EventViewSelect(props: ViewSelectProps) {
  const { selectedView, setSelectedView } = props;
  return (
    <div className="w-screen flex flex-row items-center justify-start text-sm  mb-2">
      <button 
        onClick={() => setSelectedView('details')} className={`${selectedView === 'details' ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Details</p>
        <span className={`${selectedView !== "details" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
      <button 
        onClick={() => setSelectedView('fixing')} className={`${selectedView === "fixing" ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Fixing</p>
        <span className={`${selectedView !== "fixing" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
      <button 
        onClick={() => setSelectedView('playerList')} className={`${selectedView === "playerList" ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Orchestra List</p>
        <span className={`${selectedView !== "playerList" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
      <button 
        onClick={() => setSelectedView('fullRun')} className={`${selectedView === "fullRun" ? 'text-black font-semibold' : 'text-slate-400'} flex flex-col py-2 px-2`}>
        <p className="pb-1">Full Run</p>
        <span className={`${selectedView !== "fullRun" && 'hidden'} h-[2px] bg-gradient-to-l from-white to-white via-blue-500  w-full`} />
      </button>
    </div>
  )
}