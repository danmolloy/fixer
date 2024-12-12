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
    <tr data-testid="contact-row" className={`text-sm ${contact.status === 'DECLINED' && 'text-gray-300'}`}>
      {contact.type !== "AVAILABILITY" 
      && <td className='text-center'>
        {contact.indexNumber}
      </td>}
      <td className='text-center'>
        <p>{`${contact.contact.firstName} ${contact.contact.lastName}`}</p>
      </td>
      <td className='text-center'>
        <p>{contact.position}</p>
      </td>
      {eventCalls.map((i) => (
        <td className='' key={i.id} data-testid={`call-${i.id}`}>
          {contact.type === "AVAILABILITY" ? (
            <div className='m-2 flex items-center justify-center'>
              {!contact.calls.map((j) => j.id).includes(i.id) 
              ? <div>
                <p className='hidden'>Not Checked</p>
                <TiTimes />
                </div>
              : contact.availableFor.includes(i.id)
              ? (
                <div>
                  <p className='hidden'>Available</p>
                  <TiTick />
                </div>
              ) : contact.status === "AWAITINGREPLY"
              ? <div>
                  <p className="hidden">Awaiting Reply</p>
                    •
                </div>
              : (
                <div>
                  <p className="hidden">Declined</p>
                  <TiTimes />
                </div>
              )
              }
            </div>
          ) : (
            <div className='m-2 flex items-center justify-center'>
              {contact.calls.map((j) => j.id).includes(i.id) 
              ? (
                <div>
                  {contact.status === "AWAITINGREPLY" || contact.status === "NOTCONTACTED" ? <p className='hidden'>Offered</p> : <p className='hidden'>Booked</p>}
                  <TiTick />
                </div>
              ) : (
                <div>
                  <p className='hidden'>Not Booked</p>
                <TiTimes />
                </div>
              )}
            </div>
          )}
        </td>
      ))}
      <td className='text-center'>
          <p className=''>{contact.status}</p>
        </td>
      <td className='flex items-center justify-center text-black'>
        <button
          data-testid="menu-btn"
          className='rounded p-2 hover:bg-gray-100'
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
            data-testid="player-msg-btn"
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
