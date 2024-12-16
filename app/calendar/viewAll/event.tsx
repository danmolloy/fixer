import { Call, ContactMessage, EnsembleSection, Event, EventSection } from "@prisma/client"
import { getDateRange, gigIsFixed } from "../../fixing/contactMessage/api/create/functions";

export type EventOverviewProps = {
  event: Event & {
    calls: Call[]
    sections: (EventSection & {
      contacts: ContactMessage[]
      ensembleSection: EnsembleSection
    })[]
  }
}

const gigStatus = (gig: Event & {
  calls: Call[]
  sections: (EventSection & {
    contacts: ContactMessage[]
      ensembleSection: EnsembleSection
  })[]
}) => {
  let notFixedSections: {
    sectionID: number
    sectionName: string
    numBooked: number
    numToBook: number
    numToDep: number
    remainingOnList: number
  }[] = []
  for (let i = 0; i < gig.sections.length; i ++) {
    const section = gig.sections[i]
    const numBooked = section.contacts.filter(j => j.status === "ACCEPTED" || j.status === "AUTOBOOKED" || j.status === "FINDINGDEP").length;
    if (numBooked <  gig.sections[i].numToBook) {
      notFixedSections = [...notFixedSections, {
        sectionID: section.id,
        sectionName: section.ensembleSection.name,
        numBooked: numBooked,
        numToBook: section.numToBook,
        numToDep: section.contacts.filter(j => j.status === "FINDINGDEP").length,
        remainingOnList: section.contacts.filter(j => j.type !== "AVAILABILITY" && (j.status === "AWAITINGREPLY" || j.status === "NOTCONTACTED")).length
      }]
    }
  }
  return notFixedSections;
}

export default function EventOverview(props: EventOverviewProps) {
  const { event } = props;

  const fixStatus = gigStatus(event)
  return (
    <div data-testid="event-overview">
      <p>{getDateRange(event.calls)}</p>
      <h3>{event.eventTitle}</h3>
      {fixStatus.length === 0 
      ? <p>Gig is fixed.</p>
      : <div data-testid="fixing-overview">
          <p>Not yet fixed:</p>
          <ol>
            {fixStatus.map(i => (
              <li key={i.sectionID}>
                {`${i.sectionName} section (${i.numBooked}/${i.numToBook} booked, ${i.remainingOnList} remains on list)`}
              </li>
            ))}

          </ol>
        </div>}
    </div>
  )
}