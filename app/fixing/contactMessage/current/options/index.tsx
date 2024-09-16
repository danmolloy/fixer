import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UpdateContactEventCalls from './updateEventCalls';

export type CurrentContactsOptionsProps = {
  contact: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  };
  index: number;
  numContacts: number;
  eventCalls: Call[];
};

export default function CurrentContactsOptions(
  props: CurrentContactsOptionsProps
) {
  const { contact, index, numContacts, eventCalls } = props;
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
    <div data-testid='contact-options' className=''>
      {contact.bookingOrAvailability === 'Availability' && (
        <button
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
        className='disabled:opacity-40'
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
        className='disabled:opacity-40'
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
      <button onClick={() => handleUpdateMessage()}>
        Update Player Message
      </button>
      <button
        className='disabled:opacity-40'
        disabled={index === 1}
        onClick={() => handleShift(true)}
      >
        Move Up
      </button>
      <button
        className='disabled:opacity-40'
        disabled={index === numContacts}
        onClick={() => handleShift(false)}
      >
        Move Down
      </button>
      <button onClick={() => handleDelete()}>Delete</button>
      <div>
        <select
          data-testid='position-select'
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        >
          <option value={'Principal'}>Principal</option>
          <option value={'Tutti'}>Tutti</option>
        </select>
        <button
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
  );
}

// Add/remove eventCalls
