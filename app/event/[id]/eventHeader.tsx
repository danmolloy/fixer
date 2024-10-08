import { SlOptions } from 'react-icons/sl';
import EventMenu from './menu';

export type DetailHeaderProps = {
  eventTitle: string;
  eventId: string;
};

export default function EventHeader(props: DetailHeaderProps) {
  const { eventTitle, eventId } = props;
  return (
    <thead data-testid='detail-header' className='w-full'>
      <tr className='flex w-full flex-row items-center justify-between'>
        <th>
          <h1 className='font-medium'>{eventTitle}</h1>
        </th>
        <th className='w-12 self-end'>
          <EventMenu eventId={eventId} />
        </th>
      </tr>
    </thead>
  );
}
