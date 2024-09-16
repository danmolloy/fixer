import { Call } from '@prisma/client';
import { Field } from 'formik';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

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
};

export default function AppendedContactRow(props: AppendedContactRowProps) {
  const { contact, eventCalls, remove, swap, numContacts, index } = props;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr className='text-center'>
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
      <td className='flex justify-center'>
        <button
          className='rounded-full p-1 hover:bg-gray-100'
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
          <div className='absolute -ml-12 flex flex-col border bg-white'>
            <button
              className='p-1 text-sm hover:bg-gray-50 disabled:opacity-40'
              disabled={index === 0}
              onClick={() => swap(index, index - 1)}
            >
              Move Up
            </button>
            <button
              className='p-1 text-sm hover:bg-gray-50 disabled:opacity-40'
              disabled={index === numContacts - 1}
              onClick={() => swap(index, index + 1)}
            >
              Move Down
            </button>
            <button
              className='p-1 text-sm hover:bg-gray-50'
              onClick={() => remove()}
            >
              Remove
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
