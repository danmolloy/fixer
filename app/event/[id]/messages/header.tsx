import { Call, Event, SentEmail } from '@prisma/client';
import { getDateRange } from '../../../fixing/contactMessage/api/create/functions';
import Link from 'next/link';
import { MdOutlineKeyboardReturn } from 'react-icons/md';

export type MessagesHeaderProps = {
  event: Event & {
    sentEmails: SentEmail[];
    calls: Call[];
  };
};

export default function MessagesHeader(props: MessagesHeaderProps) {
  const { event } = props;

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col items-start'>
        <h2>Sent Messages</h2>
        <h3 className='text-base'>
          {event.ensembleName} {getDateRange(event.calls)}
        </h3>
      </div>
      <div className='flex flex-col items-center justify-between'>
        <Link
          href={`/event/${event.id}/`}
          className='flex h-8 flex-row items-center justify-center rounded border px-2 text-sm hover:bg-slate-50'
        >
          <MdOutlineKeyboardReturn />
          <p className='ml-1'>View Event</p>
        </Link>
        <p className='text-xs'>{event.sentEmails.length} sent email(s)</p>
      </div>
    </div>
  );
}
