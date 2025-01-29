import React from 'react';
import CallTile from './callTile';
import InfoDiv from './infoDiv';
import { DateTime } from 'luxon';
import { Call, Ensemble, Event, User } from '@prisma/client';

export type EventInfoProps = {
  event: Event & { fixer: User };
  calls: Call[];
  ensemble: Ensemble;
};

export default function EventInfo(props: EventInfoProps) {
  const { event, calls } = props;

  return (
    <tbody
      data-testid='event-info-body'
      className={'flex w-full flex-col rounded-lg'}
    >
      <InfoDiv
        className=''
        id='event-status'
        title='Status'
        value={event.status}
      />
      <InfoDiv
        className='bg-slate-50'
        id='ensemble-name'
        title='Ensemble'
        value={event.ensembleName}
      />
      <tr
        data-testid='calls-row'
        className='flex w-full flex-col p-4 md:flex-row lg:items-center lg:justify-evenly'
      >
        <td className='text-sm text-slate-600 md:w-1/2'>
          {calls.length} Call(s)
        </td>
        <td className='md:w-1/2'>
          {calls
            .sort(
              (a, b) =>
                Number(DateTime.fromJSDate(new Date(a.startTime))) -
                Number(DateTime.fromJSDate(new Date(b.startTime)))
            )
            .map((i) => (
              <CallTile {...i} key={i.id} />
            ))}
        </td>
      </tr>
      <InfoDiv
        className='bg-slate-50'
        id='event-program'
        title='Program'
        value={event.concertProgram}
      />
      <InfoDiv
        className=''
        id='event-dress'
        title='Dress'
        value={event.dressCode}
      />
      <InfoDiv
        className='bg-slate-50'
        id='event-fee'
        title='Fee'
        value={event.fee}
      />
      <InfoDiv
        className=''
        id='event-additional-info'
        title='Additional Info'
        value={event.additionalInfo}
      />
      <InfoDiv
        className='bg-slate-50'
        id='event-fixer-name'
        title='Fixer'
        value={`${event.fixer.firstName} ${event.fixer.lastName}`}
      />
      <InfoDiv
        className='text-sm text-slate-600'
        id='created-datetime'
        title='Event created'
        value={String(
          DateTime.fromJSDate(new Date(event.createdAt)).toFormat('HH:mm DD')
        )}
      />
      <InfoDiv
        className='bg-slate-50 text-sm text-slate-600'
        id='updated-datetime'
        title='Last updated'
        value={String(
          DateTime.fromJSDate(new Date(event.updatedAt)).toFormat('HH:mm DD')
        )}
      />
    </tbody>
  );
}
