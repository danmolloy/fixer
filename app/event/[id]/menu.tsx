'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { messageToAllEmail, ShortEmailData } from '../../sendGrid/lib';
import { getDateRange } from '../../fixing/contactMessage/api/create/functions';
import { Call, ContactMessage, EnsembleContact, Event, User } from '@prisma/client';
import { unparse } from 'papaparse';
import { useRef } from 'react';

const url = `${process.env.URL}`


export type EventMenuProps = {
  event: Event & {
    calls: Call[],
    fixer: User
  }
  contacts: (ContactMessage & {contact: EnsembleContact})[]
  getRunningSheet: () => void;
};

export default function EventMenu(props: EventMenuProps) {
  const { event, contacts, getRunningSheet } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();
  const menuRef = useRef(null);

  const handleMessage = async () => {
    const message = prompt("Message to all players:");

    const mailList = contacts.filter(i => i.accepted !== false && i.recieved == true).map(i => i.contact.email);
    if (message === null || mailList.length === 0) {
      return;
    }

    const messageData = messageToAllEmail({
      message: message,
      ensemble: event.ensembleName,
      fixerFullName: `${event.fixer.firstName} ${event.fixer.lastName}`,
      dateRange: getDateRange(event.calls),
      email: contacts.filter(i => i.accepted !== false && i.recieved == true).map(i => i.contact.email!)
    });
    try {
      
      return await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: messageData,
          templateID: messageData.templateID,
          emailAddress: messageData.email
        }
      });
    } catch (e) {
      throw Error(e)
    }

  }

  const handleDelete = async () => {
    const confDelete = confirm("Please confirm you would like to delete this event.")

    if (confDelete) {
      await handleMessage();
      return await axios.post('/event/delete', { eventId: event.id }).then(() => {
        router.push('/');
      })
    }

  };


  const exportGig = () => {

    const gigData = {
      id: event.id,
      dates: getDateRange(event.calls),
      "created date": event.createdAt,
      "last updated": event.updatedAt,
      "ensemble id": event.ensembleId,
      "event title": event.eventTitle,
      "concert program": event.concertProgram,
      status: event.confirmedOrOnHold,
      dress: event.dressCode,
      fee: event.fee,
      info: event.additionalInfo,
      fixer: `${event.fixer.firstName} ${event.fixer.lastName}`
    }

    const csvData = unparse([gigData]);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${getDateRange(event.calls)} ${event.ensembleName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exportCalls = () => {
    const listData = event.calls;
    alert(JSON.stringify(listData))
    return;
  }

  return (
    <div data-testid='event-menu' className='self-end m-2'>
      <button
        onFocus={() => setShowMenu(true)}
        onBlur={() => setTimeout(() => setShowMenu(false), 100)}
        className='rounded  p-1 text-center hover:bg-gray-50 text-black  border '
        data-testid='options-btn'      >
       Options
      </button>
      {showMenu && (
        <div
          ref={menuRef}
          tabIndex={-1}
          onBlur={() => setTimeout(() => setShowMenu(false), 100)}
          data-testid='menu-options'
          className='absolute -ml-32 flex w-48 flex-col items-center justify-center rounded border bg-white text-sm font-medium shadow'
        >
          <Link
            href={`update/${event.id}`}
            className='w-full px-2 py-2 m-1 text-center hover:bg-gray-50'
          >
            Update Event
          </Link>
          <button onClick={() => handleMessage()} className='w-full px-2 py-2 m-1 hover:bg-gray-50'>
            Message All
          </button>
          <button onClick={() => getRunningSheet()} className='w-full px-2 py-2 m-1 hover:bg-gray-50'>
            Print Running Sheet
          </button>
          <button onClick={() => exportGig()} className='w-full px-2 py-2 m-1 hover:bg-gray-50'>
            Export Event Details
          </button>
          <button onClick={() => exportCalls()} className='w-full px-2 py-2 m-1 hover:bg-gray-50'>
            Export Calls List
          </button>

          <button
            data-testid='cancel-btn'
            className='w-full px-2 py-2 m-1 hover:bg-gray-50 hover:text-red-600'
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
