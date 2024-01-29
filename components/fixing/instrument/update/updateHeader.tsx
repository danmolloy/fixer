import { EventSection, PlayerCall } from "@prisma/client";
import { BiUser } from "react-icons/bi";


export type UpdateHeaderProps = {
  sectionName: string;
  eventSection: EventSection;
  playerCalls: PlayerCall[];
  setShowEdit: (arg: boolean) => void
  showEdit: boolean
}

export default function UpdateHeader(props: UpdateHeaderProps) {
  const { sectionName, eventSection, playerCalls, setShowEdit, showEdit } = props;

  const numBooked: number = playerCalls.filter(i => i.bookingOrAvailability === "Booking" && i.accepted === true).length
  const numAvailable: number = playerCalls.filter(i => i.bookingOrAvailability === "Availability" && i.accepted === true).length
  const numDepping: number = playerCalls.filter(i => i.status === "DEP OUT" && i.accepted === true).length


  return (
    <div data-testid="update-header">
      <div className="flex flex-row justify-between">
        <h2>{sectionName}</h2>
        <button className="bg-indigo-600 text-white rounded px-2  shadow hover:bg-indigo-500" data-testid={`${sectionName}-edit-btn`} onClick={() => setShowEdit(!showEdit)}>
          Edit
        </button>
      </div>
      {(eventSection.numToBook > 0 || numBooked > 0) &&
      <div data-testid="booking-status" className="flex flex-row items-center text-sm text-slate-400">
        <BiUser />
        {(eventSection.numToBook > 0 || numBooked > 0) && (<p className="ml-1">{`${numBooked} of ${eventSection.numToBook} booked`}</p>)}
        {numAvailable > 0 && <p className="ml-1">{`${numAvailable} available`}</p>}
        {numDepping > 0 && <p className="ml-1">{`${numDepping} looking for dep`}</p>}
      </div>}
    </div>
  )
}