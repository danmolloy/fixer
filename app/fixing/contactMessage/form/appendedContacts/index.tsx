import { Call } from "@prisma/client";
import { FieldArray } from "formik";
import { DateTime } from "luxon";
import AppendedContactRow from "./contactRow";

export type AppendedContactsProps = {
  contacts: {
    contactId: string;
    contactMessageId: number | undefined;
    name: string;
    playerMessage: string | null;
    calls: number[];
}[];
  eventCalls: Call[]
}

export default function AppendedContacts(props: AppendedContactsProps) {
  const { contacts, eventCalls } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Position
          </th>
          {eventCalls.map(i => (
            <th key={i.id} className="text-xs flex flex-col">
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("HH:mm")}</p>
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("DD")}</p>
              
            </th>
          ))}
          <th>Options</th>
        </tr>
      </thead>
      <FieldArray name="contacts">
        {({remove, swap}) => (
        <tbody>
          {contacts.map((i, index) => (
          <AppendedContactRow
            numContacts={contacts.length}
            swap={(a, b) => swap(a, b)}
            remove={() => remove(index)}
            contact={i} 
            index={index}
            eventCalls={eventCalls} />
        ))}
        </tbody>
        )}
      </FieldArray>
    </table>
  )
}