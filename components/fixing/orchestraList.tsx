import { AiOutlineClose } from "react-icons/ai";
import { EventInstrumentWithMusiciansWithMusician } from "./fixing"; 

type OrchestraListProps = {
  setViewList: (boolean) => void
  instrumentSections: EventInstrumentWithMusiciansWithMusician[]
}

export default function OrchestraList(props: OrchestraListProps) {
  const { setViewList, instrumentSections } = props
  return (
    <div className="w-[90vw] z-20 p-2 rounded shadow border border-zinc-300 self-center bg-white z-60 ">
      <div className="w-full flex flex-row justify-between items-center">
        <h2>
          Orchestra List
        </h2>
        <button onClick={() => setViewList(false)}>
          <AiOutlineClose />
        </button>
      </div>
      {instrumentSections.map(i => (
        <div key={i.id} className={i.numToBook < 0 ? "py-1" : ""}>
          <p className={`text-sm ${i.numToBook === 0 && "text-zinc-200"}`}>{i.instrumentName} {i.numToBook > 0 && <span className="text-sm text-zinc-600">{i.musicians.filter(j => j.accepted === true).length} of {i.numToBook} booked</span>}</p>
          <ol>
          {i.musicians.filter(j => j.accepted === true).map(j => (
            <li key={j.id} className="mx-2 text-sm">
              {j.musician.name}
            </li>
          ))}
      
          </ol>
        </div>
      ))}
    </div>
  )
}