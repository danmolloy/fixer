'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import { useRouter } from 'next/navigation';
import { ShortEmailData } from '../../sendGrid/lib';
import { getDateRange } from '../../fixing/contactMessage/api/create/functions';
import { Call, ContactMessage, EnsembleContact, Event, User } from '@prisma/client';

const url = `${process.env.URL}`


export type EventMenuProps = {
  event: Event & {
    calls: Call[],
    fixer: User
  }
  contacts: (ContactMessage & {contact: EnsembleContact})[]
};

export default function EventMenu(props: EventMenuProps) {
  const { event, contacts } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const handleMessage = async () => {
    const message = prompt("Message to all players:");

    if (message === null) {
      return;
    }

    const messageData: ShortEmailData = {
      message: message,
      ensembleName: event.ensembleName,
      fixerName: `${event.fixer.firstName} ${event.fixer.lastName}`,
      dateRange: getDateRange(event.calls)
    }
    try {
      alert(JSON.stringify(contacts.map(i => i.contact.email)))
      return await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: messageData,
          templateID: "d-3b6cd12dd6b14c10aff143d80776a429",
          emailAddress: contacts.filter(i => i.accepted !== false && i.recieved == true).map(i => i.contact.email)
        }
      });
    } catch (e) {
      throw Error(e)
    }

  }

  const handleDelete = async () => {
    const msg = prompt("Please give a message to the booked players. (required)")

    return (
      msg !== null &&
      (await axios.post('/event/delete', { eventId: event.id, message: msg }).then(() => {
        router.push('/');
      }))
    );
  };

  return (
    <div data-testid='event-menu'>
      <button
        className='rounded-full p-1 text-center hover:bg-slate-50'
        data-testid='options-btn'
        onClick={() => setShowMenu(!showMenu)}
      >
        <SlOptions />
      </button>
      {showMenu && (
        <div
          data-testid='menu-options'
          className='absolute -ml-36 flex w-48 flex-col rounded border bg-white text-sm font-medium shadow'
        >
          <Link
            href={`update/${event.id}`}
            className='w-full px-2 py-1 hover:bg-gray-50'
          >
            Update Event
          </Link>
          <button onClick={() => handleMessage()} className='w-full px-2 py-1 hover:bg-gray-50'>
            Message All
          </button>
          <button className='w-full px-2 py-1 hover:bg-gray-50'>
            Export Event Details
          </button>
          <button className='w-full px-2 py-1 hover:bg-gray-50'>
            Export Orchestra List
          </button>
          <button
            data-testid='cancel-btn'
            className='w-full px-2 py-1 hover:bg-gray-50 hover:text-red-600'
            onClick={() => {
              handleDelete();
              setShowMenu(false);
            }}
          >
            Cancel Event
          </button>
        </div>
      )}
    </div>
  );
}
