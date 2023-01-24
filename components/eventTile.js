import Link from "next/link"

export default function EventTile(props) {
  const { call } = props
  
  const formatDate = (e) => {
    return new Date(e).toString().slice(0, 21)
  }
  

  return (
    <div className="event-tile-div">
       <h2>{formatDate(call.startTime)}</h2>
      <h3>to {formatDate(call.endTime)}</h3>
      <p>{call.event.ensembleName}</p>
      <p>{call.venue}</p> 
      <p>{call.event.concertProgram}</p>
      <div className="call-tile-btns">
        <button className="call-tile-btn bg-orange-600">Contact Fixer</button>
        <Link href={`/event/${call.event.id}`}>
          <div className="call-tile-btn bg-green-500">View Event</div>
        </Link>
      </div>
    </div>
  )
}