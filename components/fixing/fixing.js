import useSwr from 'swr'
import InstrumentTile from './instrumentTile'

const fetcher = (url) => fetch(url).then((res) => res.json())
export const instrumentArr = ["Violin", "Viola", "Cello", "Double Bass", "Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Harp", "Timpani", "Percussion"]


export default function Fixing(props) {
  const { eventCalls, instrumentSections, eventId, refreshProps } = props
  const { data, error } = useSwr('/api/user/findAll', fetcher)

  if (error) return <p data-testid="error-msg">Error</p>
  if (!data) return <p data-testid="loading-msg">Loading..</p>

  const instrumentsNotUsed = instrumentArr.filter(i => !props.instrumentSections.map(i => i.instrumentName).includes(i))

  return (
    <div className="w-screen flex flex-col justify-center" data-testid="event-fixing">
      <div className="flex flex-row items-center justify-between border-t border-slate-400 px-8 py-4 mt-4">
        <h1>Personnel</h1>
        <button onClick={() => refreshProps()} className="secondary-btn">Refresh</button>
      </div>
      <div className="w-screen flex flex-row flex-wrap items-start justify-center">
        {instrumentSections.map(i => (
          <div key={i.id} className="instrument-tile">
          <InstrumentTile eventCalls={eventCalls} keyId={i.id} refreshProps={refreshProps} callsOutId={i.id} eventId={eventId} activeCalls={i} instrumentName={i.instrumentName} instrumentalists={data.filter(j => j.instrument === i.instrumentName)}/>
          </div>
          )) }
      </div>
    </div>
  )
}