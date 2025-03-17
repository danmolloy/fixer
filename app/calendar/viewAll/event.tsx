import {
  Call,
  ContactEventCall,
  ContactMessage,
  EnsembleSection,
  Event,
  EventSection,
  Orchestration,
} from '@prisma/client';
import {
  getDateRange,
  gigIsFixed,
} from '../../fixing/contactMessage/api/create/functions';
import Link from 'next/link';

export type EventOverviewProps = {
  event: Event & {
    calls: Call[];
    sections: (EventSection & {
      contacts: (ContactMessage & {
        eventCalls: (ContactEventCall & {
          call: Call;
        })[];
      })[];
      ensembleSection: EnsembleSection;
      orchestration: Orchestration[];
    })[];
  };
};

export const gigStatus = (event: EventOverviewProps['event']) => {
  const sections = event.sections.map((i) => ({
    eventSectionId: i.id,
    sectionName: i.ensembleSection.name,
    numToDep: i.contacts.filter(
      (j) =>
        j.eventCalls.find(
          (k) =>
            k.call.id === event.calls[0].id &&
            (k.status === 'ACCEPTED' || k.status === 'TOOFFER')
        ) && j.status === 'FINDINGDEP'
    ).length,
    numRequired: i.orchestration.reduce((acc, j) => acc + j.numRequired, 0),
    bookedForCall: i.contacts.filter((j) =>
      j.eventCalls.find(
        (k) => k.call.id === event.calls[0].id && k.status === 'ACCEPTED'
      )
    ).length,
    remainingOnList: i.contacts.filter((j) =>
      j.eventCalls.find(
        (k) =>
          k.call.id === event.calls[0].id &&
          (k.status === 'OFFERING' || k.status === 'TOOFFER')
      )
    ).length,
  }));
  return sections;
};

export default function EventOverview(props: EventOverviewProps) {
  const { event } = props;

  const fixStatus = gigStatus(event);
  return (
    <Link
      href={`/event/${event.id}`}
      data-testid='event-overview'
      className='m-2 flex flex-col rounded border p-2 hover:bg-slate-50 md:w-1/2'
    >
      <p>{getDateRange(event.calls)}</p>
      <h3>{event.eventTitle}</h3>

      {fixStatus.length === 0 ? (
        <p>No fixing</p>
      ) : fixStatus.filter((i) => i.numRequired - i.bookedForCall > 0)
          .length === 0 ? (
        <p>Gig is fixed.</p>
      ) : (
        <div data-testid='fixing-overview'>
          <ol>
            {fixStatus.map((i) => (
              <li key={i.eventSectionId}>
                {`${i.sectionName}: (${i.numRequired - i.bookedForCall} seats to fill, ${i.remainingOnList} remain on list)`}
              </li>
            ))}
          </ol>
        </div>
      )}
    </Link>
  );
}
