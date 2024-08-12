import { Call } from "@prisma/client";
import { Field } from "formik";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

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
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr className="text-center">
      <td className="">
        {contact.name}
      </td>
      <td className="">
        <Field as="select" name={`contacts[${index}]position`}>
        <option value={"Principal"}>Principal</option>
        <option value={"Tutti"}>Tutti</option>

        </Field>
      </td>
      {eventCalls.map(i => (
        <td className=" text-center" key={i.id}>
          <Field 
            checked={contact.calls.map(j => Number(j)).includes(Number(i.id)) ? true : false}
            type="checkbox" 
            value={Number(i.id)}
            name={`contacts[${index}]calls`} />
        </td>
      ))}
      <td className="flex justify-center">
        <button 
          className="hover:bg-gray-100 p-1 rounded-full"
          onBlur={() => setTimeout(() => setShowMenu(false), 250)} 
          onClick={(e) => {
            e.preventDefault(); 
            focus(); 
            setShowMenu(!showMenu)
          }}>
          <BsThreeDotsVertical />
        </button>
        {showMenu 
        && <div className="flex flex-col bg-white border absolute -ml-12">
          <button className="disabled:opacity-40 p-1 text-sm hover:bg-gray-50" disabled={index === 0} onClick={() => swap(index, index - 1)}>Move Up</button>
          <button className="disabled:opacity-40 p-1 text-sm hover:bg-gray-50" disabled={index === numContacts - 1} onClick={() => swap(index, index + 1)}>Move Down</button>
          <button className="p-1 text-sm hover:bg-gray-50" onClick={() => remove()}>Remove</button>
        </div>}
      </td>
    </tr>
  )
}