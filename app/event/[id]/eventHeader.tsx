import { SlOptions } from 'react-icons/sl';
import EventMenu from './menu';
import { Call, ContactMessage, EnsembleContact, Event, EventSection, User } from '@prisma/client';

export type DetailHeaderProps = {
  event: Event & {
    calls: Call[],
    fixer: User
  }
  contacts: (ContactMessage & {
    contact: EnsembleContact
  })[]
};

export default function EventHeader(props: DetailHeaderProps) {
  const { event, contacts } = props;
  return (
    <thead data-testid='detail-header' className='w-full'>
      <tr className='flex w-full flex-row items-center justify-between'>
        <th>
          <h1 className='font-medium'>{event.eventTitle}</h1>
        </th>
        <th className='w-12 self-end'>
          <EventMenu event={event} contacts={contacts} />
        </th>
      </tr>
    </thead>
  );
}
