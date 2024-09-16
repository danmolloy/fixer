'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import { useRouter } from 'next/navigation';

export type EventMenuProps = {
  eventId: string;
};

export default function EventMenu(props: EventMenuProps) {
  const { eventId } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    return (
      confirm(`Are you sure you want to delete this event?`) &&
      (await axios.post('/event/delete', { eventId: eventId }).then(() => {
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
            href={`update/${eventId}`}
            className='w-full px-2 py-1 hover:bg-gray-50'
          >
            Update Event
          </Link>
          <button className='w-full px-2 py-1 hover:bg-gray-50'>
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
