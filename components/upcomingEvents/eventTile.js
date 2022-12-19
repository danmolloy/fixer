import Link from "next/link"

export default function EventTile(props) {
  const { call, sessionEmail, fixerEmail } = props
  
  
  const formatDate = (e) => {
    return new Date(e).toString().slice(0, 21)
  }
  

  return (
    <div className="event-tile-div">
      {sessionEmail === fixerEmail && <p className="text-center m-2 font-bold text-sm">You are the fixer of this event.</p>}
      <h1>{call.event.ensembleName}</h1>
      <div className=" p-2">
        <h2>{formatDate(call.startTime)}</h2>
        <h3>to {formatDate(call.endTime)}</h3>
      </div>
      <p className="px-2 py-1">{call.event.concertProgram}</p>
      <div className="flex flex-row items-center">
        <p className="px-2 py-1">{call.venue}</p> 
        <Link href={`https://google.co.uk/maps/search/${call.venue}`} target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline">(Google Maps)</Link>
      </div>
      <div className="call-tile-btns">
        <button className="secondary-btn">Fixer Details</button>
        <Link href={`/event/${call.event.id}`}>
          <div className="primary-btn">View Event</div>
        </Link>
      </div>
    </div>
  )
}