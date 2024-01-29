import { Call } from "@prisma/client"
import SelectMenu from "../layout/components/selectMenu/selectMenu"
import { EnsembleSectionWithMusicians, EventSectionWithMusiciansWithMusician, FixingSection } from "./fixing"
import CreateInstrumentIndex from "./instrument/create"
import { EventWithCalls } from "../event/eventDetail/menu/calendarEventLink"
import UpdateIndex from "./instrument/update"


export type MobileFixingProps = {
  fixingSections: FixingSection[]
  ensembleSections: EnsembleSectionWithMusicians[]
  selectedInstrument: string
  setSelectedInstrument: (instrument: string) => void
  eventCalls: Call[]
  refreshProps: () => void
  event: EventWithCalls
}

export default function MobileFixing(props: MobileFixingProps) {
  const { event, fixingSections, ensembleSections, selectedInstrument, setSelectedInstrument, eventCalls, refreshProps } = props;

  const numBooked = (section: FixingSection): number => {
    return section.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
  }

  return (
    <div data-testid="mobile-fixing-div" className="sm:hidden  flex flex-col items-center w-full">
      <div className="flex flex-col w-full items-center">
        <SelectMenu 
          id="event-instruments"
          tickSelected={false}
          values={ensembleSections.map(i => (
            {
              val: i.name, 
              id: i.id,
              secondary: `${fixingSections.filter(j => j.ensembleSectionId === i.id).length > 0 ? `(${numBooked(fixingSections.find(j => j.ensembleSectionId === i.id))} of ${fixingSections.find(j => j.ensembleSectionId === i.id).numToBook} booked)` : ""}`
            }))} 
          selectedVal={selectedInstrument} 
          handleSelect={arg => setSelectedInstrument(arg)} />
      </div>
      <div>
          {selectedInstrument === ""
          ? <div className="h-80 w-screen mb-20 mt-2 text-center">
              <h3 className="p-16 text-slate-700">Please select an instrument.</h3>
            </div>
          : 
          <div>
            {fixingSections.filter(i => i.ensembleSection.name.toLocaleLowerCase() === selectedInstrument.toLocaleLowerCase()).map(i => (
              <UpdateIndex
                eventSection={i}
                ensembleSection={ensembleSections.find(j => j.id === i.ensembleSectionId)}
                event={event}
                playerCalls={i.musicians}
                refreshProps={() => refreshProps()}
               />
            ))}
            {fixingSections.filter(i => i.ensembleSection.name.toLocaleLowerCase() === selectedInstrument.toLocaleLowerCase()).length === 0 && ensembleSections.filter(i => i.name.toLocaleLowerCase() === selectedInstrument.toLocaleLowerCase()).map(i => (
                <CreateInstrumentIndex
                eventId={event.id}
                key={i.id}
                section={i}
                eventCalls={eventCalls}
                refreshProps={() => refreshProps()} />
            ))}
          </div>}
      </div>
    </div>
  )
}