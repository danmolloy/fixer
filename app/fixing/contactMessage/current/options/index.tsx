import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UpdateContactEventCalls from './updateEventCalls';
import { TiTimes } from 'react-icons/ti';
import Link from 'next/link';

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
    <div
      data-testid='contact-options'
      className='absolute -ml-12 mt-12 flex flex-col border bg-white p-2'
    >
      <div className='m-1 flex flex-row items-center justify-between'>
        <h3>{`${contact.contact.firstName} ${contact.contact.lastName}`}</h3>
        <button
          onClick={() => setCloseMenu()}
          className='m-1 p-1 hover:bg-slate-100'
        >
          <TiTimes size={16} />
        </button>
      </div>
      <div className='flex flex-col'>
        <Link
          className='p-1 text-start hover:bg-slate-100'
          href={`/fixing/contactMessage/update/${contact.id}`}
        >
          Edit
        </Link>

        <button
          className='p-1 text-start hover:bg-slate-100 disabled:opacity-40'
          disabled={
            contact.accepted !== true ||
            contact.bookingOrAvailability.toLocaleLowerCase() !== 'booking'
          }
          onClick={() =>
            handleUpdate(
              { status: 'DEP OUT' },
              'Are you sure you want to find a dep for this player?'
            )
          }
        >
          Find Dep
        </button>

        <button
          className='p-1 text-start hover:bg-slate-100 disabled:opacity-40'
          disabled={index === 1}
          onClick={() => handleShift(true)}
        >
          Move Up
        </button>
        <button
          className='p-1 text-start hover:bg-slate-100 disabled:opacity-40'
          disabled={index === numContacts}
          onClick={() => handleShift(false)}
        >
          Move Down
        </button>
        <button
          className='p-1 text-start hover:bg-slate-100 disabled:opacity-40'
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Add/remove eventCalls
