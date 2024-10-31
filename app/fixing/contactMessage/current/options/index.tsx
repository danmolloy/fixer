import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UpdateContactEventCalls from './updateEventCalls';
import { TiTimes } from "react-icons/ti";


export type CurrentContactsOptionsProps = {
  contact: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  };
  index: number;
  numContacts: number;
  eventCalls: Call[];
  setCloseMenu: () => void;
};

export default function CurrentContactsOptions(
  props: CurrentContactsOptionsProps
) {
  const { contact, index, numContacts, eventCalls, setCloseMenu } = props;
  const [position, setPosition] = useState<string>(contact.position);
  const router = useRouter();

  const handleDelete = async () => {
    const conf = confirm(
      `Are you sure you want to remove this player from the list?`
    );
    if (conf) {
      return await axios
        .post('/fixing/contactMessage/api/delete', {
          contactMessageId: contact.id,
        })
        .then(() => {
          router.refresh();
        });
    }
  };

  const handleUpdate = async (data: {}, confText: string) => {
    if (confirm(confText)) {
      return await axios
        .post('/fixing/contactMessage/api/update', {
          id: contact.id,
          data: data,
        })
        .then(() => {
          router.refresh();
        });
    }
  };

  const handleUpdateMessage = async () => {
    let message = prompt('What message would you like to add to this player?');
    if (message) {
      return await axios
        .post('/fixing/contactMessage/api/update', {
          id: contact.id,
          data: { playerMessage: message },
        })
        .then(() => {
          router.refresh();
        });
    }
  };

  const handleShift = async (movingUp: boolean) => {
    const confText = `Are you sure you want to move this player ${movingUp ? 'up' : 'down'} one list position?`;
    if (confirm(confText)) {
      return await axios
        .post('/fixing/contactMessage/api/update/shift', {
          eventSectionId: contact.eventSectionId,
          movingUp: movingUp,
          contactMessageId: contact.id,
        })
        .then(() => {
          router.refresh();
        });
    }
  };

  return (
    <div data-testid='contact-options' className='border absolute w-[70vw] left-4 bg-white p-2 flex flex-col '>
      <div className='flex flex-row items-center justify-between m-1'>
        <h3>{`${contact.contact.firstName} ${contact.contact.lastName}`}</h3>
        <button onClick={() => setCloseMenu()} className='p-1 m-1 hover:bg-slate-100'>
          <TiTimes size={16}/>

        </button>
      </div>
      <div className='flex flex-row'>
      <div className='flex flex-col'>
      {contact.bookingOrAvailability === 'Availability' && (
        <button
          className='disabled:opacity-40 text-start p-1 hover:bg-slate-100'
          onClick={() =>
            handleUpdate(
              { bookingOrAvailability: 'Booking' },
              'Are you sure you want to reoffer as a booking?'
            )
          }
        >
          Offer to book
        </button>
      )}
      <button
        className='disabled:opacity-40 text-start p-1 hover:bg-slate-100'
        disabled={contact.accepted !== true || contact.bookingOrAvailability.toLocaleLowerCase() !== "booking"}
        onClick={() =>
          handleUpdate(
            { status: "DEP OUT" },
            'Are you sure you want to find a dep for this player?'
          )
        }
      >
        Find Dep
      </button>
      <button
        className='disabled:opacity-40 text-start p-1 hover:bg-slate-100'
        disabled={contact.accepted === true}
        onClick={() =>
          handleUpdate(
            { accepted: true },
            'Are you sure you want to accept the work on this players behalf?'
          )
        }
      >
        Accept
      </button>
      <button
        className='disabled:opacity-40 text-start p-1 hover:bg-slate-100'
        disabled={contact.accepted === false}
        onClick={() =>
          handleUpdate(
            { accepted: false },
            'Are you sure you want to decline the work on this players behalf?'
          )
        }
      >
        Decline
      </button>
      <button 
      className=' text-start p-1 hover:bg-slate-100'
      onClick={() => handleUpdateMessage()}>
        Update Player Message
      </button>
      <button
        className='disabled:opacity-40 text-start p-1 hover:bg-slate-100'
        disabled={index === 1}
        onClick={() => handleShift(true)}
      >
        Move Up
      </button>
      <button
      
        className='disabled:opacity-40 text-start p-1 hover:bg-slate-100'
        disabled={index === numContacts}
        onClick={() => handleShift(false)}
      >
        Move Down
      </button>
      <button 
      className='disabled:opacity-40 text-start p-1 hover:bg-slate-100'
      onClick={() => handleDelete()}>Delete</button>
      </div>
        <div className='flex flex-col mx-1 my-2  p-1'>
          <p className='font-semibold'>Position:</p>
        <select
          className='border rounded my-2'
          data-testid='position-select'
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        >
          <option value={'Principal'}>Principal</option>
          <option value={'Tutti'}>Tutti</option>
        </select>
          <button
            disabled={position === contact.position}
            className='border border-blue-600 rounded text-blue-600 w-36 self-start m-1 hover:bg-blue-50 disabled:opacity-40'
            onClick={() =>
              handleUpdate(
                { position: position },
                `Are you sure you want to update this player's position to ${position}?`
              )
            }
          >
            Update Position
          </button>
      </div>
      <UpdateContactEventCalls eventCalls={eventCalls} contact={contact} />
    </div>
    </div>
  );
}

// Add/remove eventCalls
