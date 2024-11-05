import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import CurrentContactsOptions from './options';
import { useState } from 'react';
import { TiMail, TiTick, TiTimes } from "react-icons/ti";
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

  const showMessage = () => {
    return alert(`Your message to ${contact.contact.firstName}: \n\n${contact.playerMessage}`);
  }

  return (
    <tr className={`text-sm ${contact.accepted === false && "text-gray-300"}`}>
      <td className="text-center">{contact.indexNumber}</td>
      <td className="text-center">
        <p>{`${contact.contact.firstName} ${contact.contact.lastName}`}</p>
        
      </td>
      <td className='text-center'>
        <p>{contact.position}</p>
      </td>
      {eventCalls.map((i) => (
        <td  className='' key={i.id}>
          {contact.bookingOrAvailability.toLocaleLowerCase() === "availability"
          ?<div className=' flex items-center justify-center m-2'>
          {contact.availableFor.includes(i.id) 
          ? <TiTick /> 
          : <TiTimes />}
          </div>
          : <div className=' flex items-center justify-center m-2'>
          {contact.calls.map((j) => j.id).includes(i.id) 
          ? <TiTick /> 
          : <TiTimes />}
          </div>}
        </td>
      ))}
      {contact.bookingOrAvailability.toLocaleLowerCase() === "availability" 
      && contact.accepted === true
      && contact.availableFor.length === contact.calls.length
      ? <td className="text-center text-white bg-green-500">
      <p className=''>
        Available
      </p>
    </td>
    : contact.bookingOrAvailability.toLocaleLowerCase() === "availability" 
    && contact.accepted === true
    && contact.availableFor.length !== contact.calls.length 
    ?<td className="text-center text-white bg-amber-500">
    <p className=''>
      Mixed
    </p>
  </td>
      :(contact.accepted === true
      && contact.status.toLocaleLowerCase() === "dep out")
            ? <td className="text-center text-white bg-amber-500">
            <p className=''>
              Finding Dep
            </p>
          </td>
          : contact.accepted === true
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
      
      <td className='text-black  flex items-center justify-center'>
        <button 
          className='hover:bg-gray-100 p-2 rounded'
          //onBlur={() => setTimeout(() => setShowOptions(false), 250)}
          
          onClick={(e) => {
            e.preventDefault();
            setShowOptions(!showOptions)}}><SlOptions size={16} /></button>
        {showOptions 
        && <CurrentContactsOptions
        setCloseMenu={() => setShowOptions(false)}
          eventCalls={eventCalls}
          index={index}
          numContacts={numContacts}
          contact={contact}
        />}
        {contact.playerMessage 
            && 
          <button className='m-1 p-1 hover:bg-gray-50 ' onClick={(e) => {e.preventDefault(); showMessage();}}>
          <TiMail size={24} />
        </button>}
      </td>
    </tr>
  );
}
