import { SlOptions } from 'react-icons/sl';
import EventMenu from './menu';
import { Call, ContactMessage, EnsembleContact, Event, EventSection, User } from '@prisma/client';

export type DetailHeaderProps = {
  eventTitle: string;
};

export default function EventHeader(props: DetailHeaderProps) {
  const { eventTitle } = props;
  return (
    <thead data-testid='detail-header' className='w-full'>
      <tr className='flex w-full flex-row items-center justify-between'>
        <th>
          <h1 className='font-medium p-2'>{eventTitle}</h1>
        </th>
        
      </tr>
    </thead>
  );
}
