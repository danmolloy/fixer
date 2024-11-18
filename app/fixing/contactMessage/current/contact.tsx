import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import CurrentContactsOptions from './options';
import { useState } from 'react';
import { TiMail, TiTick, TiTimes } from 'react-icons/ti';
import { SlOptions } from 'react-icons/sl';

export type CurrentContactRowProps = {
  eventCalls: Call[];
  contact: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  };
  index: number;
  numContacts: number;
};

export default function CurrentContactRow(props: CurrentContactRowProps) {
  const { eventCalls, contact, index, numContacts } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const showMessage = () => {
    return alert(
      `Your message to ${contact.contact.firstName}: \n\n${contact.playerMessage}`
    );
  };

  return (
    <tr className={`text-sm ${contact.accepted === false && 'text-gray-300'}`}>
      <td className='text-center'>{contact.bookingOrAvailability === "Booking" ? contact.indexNumber : "N/A"}</td>
      <td className='text-center'>
        <p>{`${contact.contact.firstName} ${contact.contact.lastName}`}</p>
      </td>
      <td className='text-center'>
        <p>{contact.position}</p>
      </td>
      {eventCalls.map((i) => (
        <td className='' key={i.id}>
          {contact.bookingOrAvailability.toLocaleLowerCase() ===
          'availability' && contact.accepted === null
          ? <div className='m-2 flex items-center justify-center'>
              {contact.calls.map((j) => j.id).includes(i.id) ? <TiTick /> : <TiTimes />}
            </div>
          : contact.bookingOrAvailability.toLocaleLowerCase() ===
          'availability' ? (
            <div className='m-2 flex items-center justify-center'>
              {contact.availableFor.includes(i.id) ? <TiTick /> : <TiTimes />}
            </div>
          ) : (
            <div className='m-2 flex items-center justify-center'>
              {contact.calls.map((j) => j.id).includes(i.id) ? (
                <TiTick />
              ) : (
                <TiTimes />
              )}
            </div>
          )}
        </td>
      ))}
      {contact.bookingOrAvailability.toLocaleLowerCase() === 'availability' &&
      contact.accepted === true &&
      contact.availableFor.length === contact.calls.length ? (
        <td className='bg-green-500 text-center text-white'>
          <p className=''>Available</p>
        </td>
      ) : contact.bookingOrAvailability.toLocaleLowerCase() ===
          'availability' &&
        contact.accepted === true &&
        contact.availableFor.length > 0 ? (
        <td className='bg-amber-500 text-center text-white'>
          <p className=''>Mixed</p>
        </td>
      ) : contact.bookingOrAvailability.toLocaleLowerCase() ===
          'availability' 
          && contact.accepted === false 
          && contact.availableFor.length === 0 ? (
        <td className='bg-red-500 text-center text-white'>
          <p className=''>Declined</p>
        </td>
      ) : contact.accepted === true &&
        contact.status.toLocaleLowerCase() === 'dep out' ? (
        <td className='bg-amber-500 text-center text-white'>
          <p className=''>Finding Dep</p>
        </td>
      ) : contact.accepted === true ? (
        <td className='bg-green-500 text-center text-white'>
          <p className=''>Accepted</p>
        </td>
      ) : contact.accepted === false ? (
        <td className='bg-red-300 text-center'>
          <p className='text-white'>Declined</p>
        </td>
      ) : contact.received ? (
        <td className='bg-amber-500 text-center'>
          <p className='text-white'>Awaiting Reply</p>
        </td>
      ) : (
        <td className='text-center'>
          <p className=''>Not Contacted</p>
        </td>
      )}

      <td className='flex items-center justify-center text-black'>
        <button
          className='rounded p-2 hover:bg-gray-100'
          //onBlur={() => setTimeout(() => setShowOptions(false), 250)}

          onClick={(e) => {
            e.preventDefault();
            setShowOptions(!showOptions);
          }}
        >
          <SlOptions size={16} />
        </button>
        {showOptions && (
          <CurrentContactsOptions
            setCloseMenu={() => setShowOptions(false)}
            eventCalls={eventCalls}
            index={index}
            numContacts={numContacts}
            contact={contact}
          />
        )}
        {contact.playerMessage && (
          <button
            className='m-1 p-1 hover:bg-gray-50'
            onClick={(e) => {
              e.preventDefault();
              showMessage();
            }}
          >
            <TiMail size={24} />
          </button>
        )}
      </td>
    </tr>
  );
}
