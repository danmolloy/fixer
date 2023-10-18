import { EventInstrument, PlayerCall } from "@prisma/client";

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
      <div>
        <h2>{eventInstrument.instrumentName}</h2>
        <button data-testid="edit-btn" onClick={() => setShowEdit(!showEdit)}>
          Edit
        </button>
      </div>
      <div>
        {(eventInstrument.numToBook > 0 || numBooked > 0) && (<p>{`${numBooked} of ${eventInstrument.numToBook} booked`}</p>)}
        {numAvailable > 0 && <p>{`${numAvailable} available`}</p>}
        {numDepping > 0 && <p>{`${numDepping} looking for dep`}</p>}
      </div>
    </div>
  )
}