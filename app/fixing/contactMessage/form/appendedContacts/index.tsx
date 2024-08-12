import { Call } from "@prisma/client";
import { FieldArray } from "formik";
import { DateTime } from "luxon";
import AppendedContactRow from "./contactRow";
import HelpMessage from "../../../../layout/helpMessage";

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
    <table className="w-full my-4 border">
      <thead className="text-sm font-medium border-b">
        <tr>
          <th>
            Name
          </th>
          <th className="">
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
        <tbody className="">
          {contacts.length === 0 
          ? <tr >
            <td colSpan={3 + eventCalls.length} className=" h-2 ">
              <div className="flex items-center justify-center my-4">
                <HelpMessage 
                  head="No appended contacts." 
                  additional="Select from your diary contacts below."/>
                </div>
            </td>
          </tr>
          : contacts.map((i, index) => (
          <AppendedContactRow
            key={i.contactId}
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