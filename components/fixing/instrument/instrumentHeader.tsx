import { EventInstrument, PlayerCall } from "@prisma/client";
import { BiUser, BiUserCheck } from "react-icons/bi";

export type InstrumentHeaderProps = {
  eventInstrument: EventInstrument,
  playerCalls: PlayerCall[],
  setShowEdit: (arg: boolean) => void
  showEdit: boolean
}

export default function InstrumentHeader(props: InstrumentHeaderProps) {
  const { eventInstrument, playerCalls, setShowEdit, showEdit } = props;

  const numBooked: number = playerCalls.filter(i => i.bookingOrAvailability === "Booking" && i.accepted === true).length
  const numAvailable: number = playerCalls.filter(i => i.bookingOrAvailability === "Availability" && i.accepted === true).length
  const numDepping: number = playerCalls.filter(i => i.status === "DEP OUT" && i.accepted === true).length
  
  return (
    <div data-testid="instrument-header">
      <div className="flex flex-row justify-between">
        <h2>{eventInstrument.instrumentName}</h2>
        <button className="bg-indigo-600 text-white rounded px-2  shadow hover:bg-indigo-500" data-testid={`${eventInstrument.instrumentName}-edit-btn`} onClick={() => setShowEdit(!showEdit)}>
          Edit
        </button>
      </div>
      {(eventInstrument.numToBook > 0 || numBooked > 0) &&
      <div className="flex flex-row items-center text-sm text-slate-400">
        <BiUser />
        {(eventInstrument.numToBook > 0 || numBooked > 0) && (<p className="ml-1">{`${numBooked} of ${eventInstrument.numToBook} booked`}</p>)}
        {numAvailable > 0 && <p className="ml-1">{`${numAvailable} available`}</p>}
        {numDepping > 0 && <p className="ml-1">{`${numDepping} looking for dep`}</p>}
      </div>}
    </div>
  )
}