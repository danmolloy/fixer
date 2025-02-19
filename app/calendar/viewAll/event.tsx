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

export const gigStatus = (
  gig: Event & {
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
  }
) => {
  const notFixedCalls: (Orchestration & {
    sectionName: string;
    bookedForCall: number;
    numToDep: number;
    remainingOnList: number;
  })[] = [];

  gig.sections.forEach((section) => {
    const bookedMusicians = section.contacts.filter(
      (contact) =>
        contact.status === 'ACCEPTED' ||
        contact.status === 'AUTOBOOKED' ||
        contact.status === 'FINDINGDEP'
    );

    section.orchestration.forEach((orchestration) => {
      const bookedForCall = bookedMusicians.filter((musician) =>
        musician.eventCalls.filter((call) => call.callId === orchestration.id)
      );

      const remainingOnList = section.contacts.filter(
        (musician) =>
          musician.type !== 'AVAILABILITY' &&
          (musician.status === 'AWAITINGREPLY' ||
            musician.status === 'NOTCONTACTED')
      );

      if (orchestration.numRequired > bookedForCall.length) {
        notFixedCalls.push({
          ...orchestration,
          sectionName: section.ensembleSection.name,
          bookedForCall: bookedForCall.length,
          numToDep: bookedForCall.filter(
            (musician) => musician.status === 'FINDINGDEP'
          ).length,
          remainingOnList: remainingOnList.length,
        });
      }
    });
  });

  return notFixedCalls;
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
      ) : fixStatus.filter((i) => i.numRequired > 0).length === 0 ? (
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
