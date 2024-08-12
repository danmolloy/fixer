import { Call, ContactMessage, EnsembleContact } from "@prisma/client"
import { DateTime } from "luxon";
import CurrentContactRow from "./contact";

export type CurrentContactMessagesProps = {
  eventCalls: Call[]
  contacts: (ContactMessage & {
    contact: EnsembleContact
    calls: Call[]
    })[]
    bookingOrAvailability: string

}

export default function CurrentContactMessages(props: CurrentContactMessagesProps) {
  const { contacts, eventCalls, bookingOrAvailability } = props;

  if (contacts.filter(i => i.bookingOrAvailability === bookingOrAvailability).length === 0) {
    return (
      <div className="my-4 flex flex-col w-full items-center">
        <p className="font-medium">No {bookingOrAvailability.toLowerCase() === 'availability' ? "availability checks": "booking calls"} made.</p>
        <p className="text-sm">Click Edit Contacts to get started.</p>
      </div>
    )
    
  }
  return (
    <table>
      <thead>
        <tr>
        <th>
          Call Number
        </th>
        <th>
          Name
        </th>
        {eventCalls.map(i => (
          <th key={i.id} className="text-xs flex flex-col">
            <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("HH:mm")}</p>
            <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("DD")}</p>
          </th>
          ))}
        <th>
          Status
        </th>
        <th>
          Message
        </th>
        <th>
          Options
        </th>
        </tr>
      </thead>
      <tbody>
        {contacts.filter(i => i.bookingOrAvailability === bookingOrAvailability).map((i, index) => (
          <CurrentContactRow numContacts={contacts.length} index={index + 1} key={i.id} eventCalls={eventCalls} contact={i}/>
        ))}
      </tbody>
    </table>
  )
}