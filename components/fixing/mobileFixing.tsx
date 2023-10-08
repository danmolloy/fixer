import { Call, User } from "@prisma/client"
import InstrumentTile, { EventInstrumentWithMusiciansWithMusician } from "./instrumentTile"
import { useState } from "react"
import SelectMenu from "../index/selectMenu"


const instrumentFamilyArr: {
  id: number
  name: string
  family: string
}[] = [
  {
    id: 0,
    name: "Violin",
    family: "Strings",
  },
  {
    id: 1,
    name: "Viola",
    family: "Strings",
  },
  {
    id: 2,
    name: "Cello",
    family: "Strings",
  },{
    id: 3,
    name: "Double Bass",
    family: "Strings",
  },
  {
    id: 4,
    name: "Flute",
    family: "Woodwinds",
  },
  {
    id: 5,
    name: "Oboe",
    family: "Woodwinds",
  },{
    id: 6,
    name: "Clarinet",
    family: "Woodwinds",
  },
  {
    id: 7,
    name: "Bassoon",
    family: "Woodwinds",
  },
  {
    id: 8,
    name: "Horn",
    family: "Brass",
  },
  {
    id: 9,
    name: "Trumpet",
    family: "Brass",
  },
  {
    id: 10,
    name: "Trombone",
    family: "Brass",
  },
  {
    id: 11,
    name: "Tuba",
    family: "Brass",
  },
  {
    id: 12,
    name: "Harp",
    family: "Strings",
  },
  {
    id: 13,
    name: "Timpani",
    family: "Percussion",
  },
  {
    id: 14,
    name: "Percussion",
    family: "Percussion",
  },
]



export type MobileFixingProps = {
  instrumentSections: EventInstrumentWithMusiciansWithMusician[]
  selectedInstrument: string
  setSelectedInstrument: (instrument: string) => void
  eventCalls: Call[]
  refreshProps: () => void
  eventId: number
  users: User[]
  isLoading: boolean
}

export default function MobileFixing(props: MobileFixingProps) {
  const {isLoading, instrumentSections, selectedInstrument, setSelectedInstrument, eventCalls, refreshProps, eventId, users } = props;

  const instrumentFamilies = () => {
    let families: string[] = []
    for (let i = 0; i < instrumentFamilyArr.length; i ++) {
      if (!families.includes(instrumentFamilyArr[i].family)) {
        families = [...families, instrumentFamilyArr[i].family]
      }
    }
    return families
  }

  return (
    <div data-testid="mobile-fixing-div" className="sm:hidden flex flex-col items-center w-full">
      <div className="flex flex-col w-full items-center">
         {/* <select data-testid="select-menu" onChange={e => setSelectedInstrument(e.target.value)} className="border shadow-sm p-1 rounded w-1/2 sm:w-1/3">
          <option value={""}>Select instrument</option>
          {instrumentSections.map(i => (
            <option value={i.instrumentName} key={i.id} className="">
              {i.instrumentName} {i.numToBook > 0 && `(${i.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length} of ${i.numToBook} booked)`}
            </option>
          ))}
         
        </select> */}
        <SelectMenu 
          tickSelected={false}
          values={instrumentSections.map(i => (
            {
              val: i.instrumentName, 
              id: i.id,
              secondary: `${i.numToBook > 0 ? `(${i.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length} of ${i.numToBook} booked)` : ""}`
              
            }))} 
          selectedVal={selectedInstrument} 
          handleSelect={arg => setSelectedInstrument(arg)} />
      </div>
      <div>
          {selectedInstrument === ""
          ? <div className="h-80 w-screen mb-20 mt-2 text-center">
              <h3 className="p-16 text-slate-700">Please select an instrument.</h3>
            </div>
          : instrumentSections.filter(i => i.instrumentName === selectedInstrument).map(i => (
            <div key={i.id} className="border sm:border-slate-400 flex flex-col w-screen rounded m-2 ">
              <InstrumentTile 
                isLoading={isLoading}
                eventCalls={eventCalls} 
                refreshProps={() => refreshProps()} 
                eventId={eventId} 
                instrumentSection={i} 
                instrumentalists={users.filter(j => j.instrument === i.instrumentName)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}