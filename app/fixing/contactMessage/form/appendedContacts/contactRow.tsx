import { Call } from '@prisma/client';
import { Field } from 'formik';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TiMail } from "react-icons/ti";


export type AppendedContactRowProps = {
  contact: {
    contactId: string;
    contactMessageId: number | undefined;
    name: string;
    playerMessage: string | null;
    calls: number[];
  };
  index: number;
  eventCalls: Call[];
  remove: () => void;
  swap: (a: number, b: number) => void;
  numContacts: number;
  bookingOrAvailability: string;
  addPlayerMessage: (index: number, message: string) => void;
  currentCallCount: number;
};

export default function AppendedContactRow(props: AppendedContactRowProps) {
  const { addPlayerMessage, bookingOrAvailability, contact, eventCalls, remove, swap, numContacts, index, currentCallCount } = props;
  const [showMenu, setShowMenu] = useState(false);

  const handleAddMessage = () => {
    const msg = prompt("What message would you like to add to this player?");
    if (msg) {
      addPlayerMessage(index, msg);
    } else {
      return;
    }
  }

  const showMessage = () => {
    return alert(`Your message to ${contact.name}: \n\n${contact.playerMessage}`);
  }

  return (
    <tr className='text-center text-sm  h-10'>
      <td className='px-1'>{bookingOrAvailability.toLocaleLowerCase() === "booking" && currentCallCount + index + 1}</td>
      <td className=''>{contact.name}</td>
      <td className=''>
        <Field as='select' name={`contacts[${index}]position`}>
          <option value={'Principal'}>Principal</option>
          <option value={'Tutti'}>Tutti</option>
        </Field>
      </td>
      {eventCalls.map((i) => (
        <td className='text-center' key={i.id}>
          <Field
            checked={
              contact.calls.map((j) => Number(j)).includes(Number(i.id))
                ? true
                : false
            }
            type='checkbox'
            value={Number(i.id)}
            name={`contacts[${index}]calls`}
          />
        </td>
      ))}
      <td className='flex flex-row items-center justify-center'>
        <button
          className='rounded-full self-center p-1 m-1 hover:bg-gray-100'
         onBlur={() => setTimeout(() => setShowMenu(false), 250)}
          onClick={(e) => {
            e.preventDefault();
            focus();
            setShowMenu(!showMenu);
          }}
        >
          <BsThreeDotsVertical />
          
        </button>
        {showMenu && (
          <div className='absolute -mb-36 -ml-40 flex flex-col border bg-white'>
            <button
              className='p-2 text-start text-sm hover:bg-slate-100 disabled:opacity-40'
              disabled={index === 0}
              onClick={() => swap(index, index - 1)}
            >
              Move Up
            </button>
            <button
              className='p-2 text-start text-sm hover:bg-slate-100 disabled:opacity-40'
              disabled={index === numContacts - 1}
              onClick={() => swap(index, index + 1)}
            >
              Move Down
            </button>
            <button
              className='p-2 text-start text-sm hover:bg-slate-100 disabled:opacity-40'
              onClick={(e) => {
                e.preventDefault();
                handleAddMessage()}}
            >
              Add Message
            </button>
            <button
              className='p-2 text-start text-sm hover:bg-slate-100'
              onClick={() => remove()}
            >
              Remove
            </button>
          </div>
        )}
        <button className='m-1 p-1 hover:bg-gray-50 ' onClick={(e) => {e.preventDefault(); showMessage();}}>
          {contact.playerMessage 
            && <TiMail size={24} />}
        </button>
      </td>
    </tr>
  );
}
