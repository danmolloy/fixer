import { EventCall, InstrumentSection, User } from "./fixing"
import InstrumentTile from "./instrumentTile"

type MobileFixingProps = {
  instrumentSections: InstrumentSection[]
  selectedInstrument: string
  setSelectedInstrument: (instrument: string) => void
  eventCalls: EventCall[]
  refreshProps: () => void
  eventId: number
  users: User[]
}

export default function MobileFixing(props: MobileFixingProps) {
  const {instrumentSections, selectedInstrument, setSelectedInstrument, eventCalls, refreshProps, eventId, users } = props;



  return (
    <div className="sm:hidden flex flex-col items-center w-full">
      <div className="flex flex-col w-full items-center">
         <select onChange={e => setSelectedInstrument(e.target.value)} className="border shadow-sm p-1 rounded w-1/2 sm:w-1/3">
          <option value={""}>Select instrument</option>
          {instrumentSections.map(i => (
            <option value={i.instrumentName} key={i.id} className="outline">
              <p>{i.instrumentName} {i.numToBook > 0 && `(${i.musicians.filter(i => i.accepted === true).length} of ${i.numToBook} booked)`}
              </p>
            </option>
          ))}
        </select>
      </div>
      <div>
          {selectedInstrument === ""
          ? <div className="h-80 w-screen mb-20 mt-2 text-center">
              <h3 className="p-16 text-slate-700">Please select an instrument.</h3>
            </div>
          : instrumentSections.filter(i => i.instrumentName === selectedInstrument).map(i => (
            <div key={i.id} className="border sm:border-slate-400 flex flex-col w-screen rounded m-2 ">
              <InstrumentTile 
                eventCalls={eventCalls} 
                refreshProps={() => refreshProps()} 
                eventId={eventId} 
                instrumentSection={i} 
                instrumentalists={users.filter(j => j.instrument === i.instrumentName)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}