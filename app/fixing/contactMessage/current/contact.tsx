import {
  Call,
  ContactEventCall,
  ContactMessage,
  EmailEvent,
  EnsembleContact,
} from '@prisma/client';
import CurrentContactsOptions from './options';
import { useState } from 'react';
import { TiMail, TiTick, TiTimes } from 'react-icons/ti';
import { SlOptions } from 'react-icons/sl';
import { DateTime } from 'luxon';

export type CurrentContactRowProps = {
  eventCalls: Call[];
  contact: ContactMessage & {
    eventCalls: (ContactEventCall & { call: Call })[];
    contact: EnsembleContact;
    emailEvents: EmailEvent[];
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
    <tr
      data-testid='contact-row'
      className={`text-sm ${contact.status === 'DECLINED' && 'text-gray-300'}`}
    >
      <td className='text-center'>{index}</td>
      <td className='text-center'>
        <p>{`${contact.contact.firstName} ${contact.contact.lastName}`}</p>
      </td>
      <td className='text-center'>
        <p>{contact.position}</p>
      </td>
      {eventCalls.map((i) => (
        <td className='' key={i.id} data-testid={`call-${i.id}`}>
          {
            <div
              className={` ${contact.eventCalls.find((c) => c.callId === i.id)?.status === 'ACCEPTED' ? 'bg-green-500 text-white' : contact.eventCalls.find((c) => c.callId === i.id)?.status === 'OFFERING' ? 'bg-amber-500 text-white' : ''} m-2 flex items-center justify-center`}
            >
              {contact.eventCalls.map((j) => j.callId).includes(i.id) ? (
                <div>
                  <p>
                    {contact.eventCalls.find((c) => c.callId === i.id)?.status}
                  </p>
                </div>
              ) : (
                <div>
                  <p className='hidden'>-</p>
                </div>
              )}
            </div>
          }
        </td>
      ))}
      {contact.status === 'DECLINED' ? (
        <td className='bg-white text-center text-black opacity-40'>
          <p className=''>{contact.status}</p>
        </td>
      ) : contact.status === 'AWAITINGREPLY' ? (
        <td className='text-center'>
          <p className=''>CONTACTING</p>
          <p className='text-sm'>
            {
              contact.emailEvents
                .sort(
                  (a, b) =>
                    DateTime.fromJSDate(new Date(b.timestamp)).toMillis() -
                    DateTime.fromJSDate(new Date(a.timestamp)).toMillis()
                )
                .map((i) => i.status)[0]
            }
          </p>
        </td>
      ) : contact.status === 'NOTCONTACTED' ? (
        <td className='bg-white text-center text-black opacity-40'>
          <p className=''>NOT CONTACTED</p>
        </td>
      ) : contact.status === 'FINDINGDEP' ? (
        <td className='text-center text-white'>
          <p className=''>FINDING DEP</p>
        </td>
      ) : (
        <td className='text-center'>
          {' '}
          {/* ERROR */}
          <p className=''>{contact.status}</p>
        </td>
      )}
      <td className='flex items-center justify-center text-black'>
        <button
          data-testid='menu-btn'
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
            data-testid='player-msg-btn'
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
