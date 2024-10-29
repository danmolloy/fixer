import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import CurrentContactsOptions from './options';
import { useState } from 'react';
import { TiTick, TiTimes } from "react-icons/ti";
import { SlOptions } from "react-icons/sl";


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
  return (
    <tr className={`text-sm ${contact.accepted === false && "text-gray-300"}`}>
      <td className="text-center">{contact.indexNumber}</td>
      <td className="text-center">
        <p>{`${contact.contact.firstName} ${contact.contact.lastName}`}</p>
        <p>{contact.position}</p>
      </td>
      {eventCalls.map((i) => (
        <td  className='flex flex-col h-full  items-center justify-center' key={i.id}>
          <div className=' self-center m-2'>
          {contact.calls.map((j) => j.id).includes(i.id) 
          ? <TiTick /> : <TiTimes />}
          </div>
        </td>
      ))}
      {contact.accepted === true
            ? <td className="text-center text-white bg-green-500">
            <p className=''>
              Accepted
            </p>
          </td>
          : contact.accepted === false
              ? <td className="text-center bg-red-300">
              <p className='text-white '>
                Declined
              </p>
            </td>
              : contact.recieved
                ? <td className="text-center bg-amber-500">
                <p className='text-white'>
                  Awaiting Reply
                </p>
              </td>
                : <td className="text-center ">
                <p className=''>
                  Not Contacted
                </p>
              </td>}
      
      <td className='text-center'>{contact.playerMessage 
      ? <p>{contact.playerMessage}</p> 
      : <p className='text-gray-300'>N/A</p>}</td>
      <td className='text-black  flex items-center justify-center'>
        <button 
          className='hover:bg-gray-100 p-2 rounded'
          onClick={(e) => {
            e.preventDefault();
            setShowOptions(!showOptions)}}><SlOptions size={16} /></button>
        {showOptions && <CurrentContactsOptions
          eventCalls={eventCalls}
          index={index}
          numContacts={numContacts}
          contact={contact}
        />}
      </td>
    </tr>
  );
}
