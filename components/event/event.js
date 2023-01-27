import { Button } from "@mui/material";
import moment from "moment";
import Link from "next/link";

export default function EventInfo(props) {

  const formatDate = (e) => {
    return new Date(e).toString().slice(0, 21)
  }
  
  return (
    <div>
      <h2 className="text-center">{String(props.confirmed).toUpperCase()}</h2>
      <h1 data-testid="event-header">{props.ensembleName}</h1>
      <p data-testid="event-program">{props.concertProgram}</p>
      <p>Dress: <span data-testid="event-dress">{props.dressCode}</span></p>
      <p>Fee: <span data-testid="event-fee">{props.fee}</span></p>
      <p>Additional Info: <span data-testid="event-additional-info">{props.additionalInfo}</span></p>
      <p>Fixer: <span data-testid="event-fixer-email">{props.fixerEmail}</span></p>
      <div className="my-2 p-4 border rounded" data-testid="event-calls-list">
        <h3><span data-testid="event-calls-count">{props.calls.length}</span> Call(s):</h3>
        {props.calls.sort((a, b) => moment(a.startTime) - moment(b.startTime)).map(i => (
        <div key={i.id} className="m-2">
          <h3>{formatDate(i.startTime)}</h3>
          <p>to {formatDate(i.endTime)}</p>
          <p>{i.venue}</p>
        </div>
      ))}
      </div>
      <p className="font-thin" data-testid="created-datetime">{`Event created on ${formatDate(props.createdAt)}`}</p>
      <p className="font-thin" data-testid="updated-datetime">{`Last updated on ${formatDate(props.updatedAt)}`}</p>
      {props.session && props.session.user.email === props.fixerEmail &&
      <div className="flex flex-col justify-center items-center" data-testid="fixer-btns-div">
        {/* <CSVLink className="call-tile-btn border w-28 m-2 border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-white" data={parse(exportObj)}>Export Calls</CSVLink> */}
        <Button variant="outlined">Request Parts</Button>
        
        <Link href={`/event/edit/${props.id}`}>
          <Button variant="" className="" >Edit Event</Button>
        </Link>
      </div>}
    </div>
  )
}