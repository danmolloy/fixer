import { EventInstrument } from "@prisma/client";
import { AiOutlineClose } from "react-icons/ai";
import { InstrumentSection } from "./fixing";

type OrchestraListProps = {
  setViewList: (boolean) => void
  instrumentSections: InstrumentSection[]
}

export default function OrchestraList(props: OrchestraListProps) {
  const { setViewList, instrumentSections } = props
  return (
    <div className="w-[90vw] p-2 rounded shadow border border-zinc-400 self-center bg-white z-60 ">
      <div className="w-full flex flex-row justify-between items-center">
        <h1>
          Personnel
        </h1>
        <button onClick={() => setViewList(false)}>
          <AiOutlineClose />
        </button>
      </div>
      {[...instrumentSections].filter(i => i.numToBook > 0).map(i => (
        <div key={i.id}>
          <p>{i.instrumentName} ({i.musicians.filter(j => j.accepted === true).length} of {i.numToBook} booked)</p>
          <ol>
          {i.musicians.filter(j => j.accepted === true).map(j => (
            <li key={j.id}>
              {j.musician.name}
            </li>
            
          ))}
      
          </ol>
        </div>
      ))}
    </div>
  )
}