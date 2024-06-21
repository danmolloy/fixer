import { Call } from "@prisma/client";
import { Field } from "formik";

export type AppendedContactRowProps = {
  contact: {
    contactId: string;
    contactMessageId: number | undefined;
    name: string;
    playerMessage: string | null;
    calls: number[];
};
index: number;
  eventCalls: Call[]
  remove: () => void
  swap: (a: number, b: number) => void
  numContacts: number
}

export default function AppendedContactRow(props: AppendedContactRowProps) {
  const { contact, eventCalls, remove, swap, numContacts, index } = props;

  return (
    <tr>
      <td>
        {contact.name}
      </td>
      <td>
        <Field as="select" name={`contacts[${index}]position`}>
        <option value={"Principal"}>Principal</option>
        <option value={"Tutti"}>Tutti</option>

        </Field>
      </td>
      {eventCalls.map(i => (
        <td key={i.id}>
          <Field 
            checked={contact.calls.map(j => Number(j)).includes(Number(i.id)) ? true : false}
            type="checkbox" 
            value={Number(i.id)}
            name={`contacts[${index}]calls`} />
        </td>
      ))}
      <td>
        <button className="disabled:opacity-40" disabled={index === 0} onClick={() => swap(index, index - 1)}>Move Up</button>
        <button className="disabled:opacity-40" disabled={index === numContacts - 1} onClick={() => swap(index, index + 1)}>Move Down</button>
        <button onClick={() => remove()}>Remove</button>
      </td>
    </tr>
  )
}