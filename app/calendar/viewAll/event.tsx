import {
  Call,
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
        calls: Call[]
      })[];
      ensembleSection: EnsembleSection;
      orchestration: Orchestration[];
    })[];
  };
};

const gigStatus = (
  gig: Event & {
    calls: Call[];
    sections: (EventSection & {
      contacts: (ContactMessage & {
        calls: Call[]
      })[];
      ensembleSection: EnsembleSection;
      orchestration: Orchestration[];
    })[];
  }
) => {
  let notFixedCalls: (Orchestration & {
    sectionName: string;
    bookedForCall: number;
    numToDep: number;
    remainingOnList: number;
  })[] = [];
  let sectionHighestNums: (Orchestration & {
    sectionName: string;
    bookedForCall: number;
    numToDep: number;
    remainingOnList: number;
  })[] = [];
  for (let i = 0; i < gig.sections.length; i++) {
    const section = gig.sections[i];
    const bookedMusicians = section.contacts.filter(
      (j) =>
        j.status === 'ACCEPTED' ||
        j.status === 'AUTOBOOKED' ||
        j.status === 'FINDINGDEP'
    );
    // Get count for each instrument in each call i.e. 1 more bass to book for 24 Feb, 2 more for 25 Feb, 1 more for 26 Feb
    // if sectionID & num to book matches, reduce like so: 1 more for 24 & 26 Feb, 2 more for 25 Feb
    // OR for event overview, just take largest number: 2 more basses to book

    // Make obj for each section
    // set numYetToBook as call with greatest numYetToBook

    // return all orchestration objs with booked, numToDep & remaining on list
    for (let j = 0; j < section.orchestration.length; j ++) {
      
        const bookedForCall = bookedMusicians.filter(musician => musician.calls.map(c => c.id).includes(gig.calls[j].id));
        const remainingOnList = section.contacts.filter(musician => (musician.type !== "AVAILABILITY" && (musician.status === "AWAITINGREPLY" || musician.status === "NOTCONTACTED")))
        
       if (section.orchestration[j].numRequired > bookedForCall.length) {
          notFixedCalls = [
            ...notFixedCalls,
            {
              ...section.orchestration[j],
              sectionName: section.ensembleSection.name,
              bookedForCall: bookedForCall.length,
              numToDep: bookedForCall.filter(musician => musician.status === "FINDINGDEP").length,
              remainingOnList: remainingOnList.length
            }
          ];
       }
      
    }
    sectionHighestNums = [
      ...sectionHighestNums,
      notFixedCalls.filter(call => call.eventSectionId == section.id).sort((a, b) =>  (b.numRequired - b.bookedForCall) - (a.numRequired - a.bookedForCall))[0]
    ]
  } 
  return sectionHighestNums;
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
      {fixStatus.length === 0 ? 
      <p>No fixing</p>
      : fixStatus.filter(i => i.numRequired > 0).length === 0 ? (
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
