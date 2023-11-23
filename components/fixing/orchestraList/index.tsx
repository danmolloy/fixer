import { AiOutlineClose } from "react-icons/ai";
import { EventInstrumentWithMusiciansWithMusician } from "../fixing"; 

export type OrchestraListProps = {
  setViewList: (boolean) => void
  instrumentSections: EventInstrumentWithMusiciansWithMusician[]
}

export default function OrchestraList(props: OrchestraListProps) {
  const { instrumentSections } = props
  return (
    <div className="w-[90vw] z-20 p-4 rounded  border border-zinc-300 self-center bg-white z-60 flex h-screen flex-col flex-wrap">
      {instrumentSections.filter(i => i.numToBook > 0).map(i => (
        <div data-testid={`${i.instrumentName}-section`} key={i.id} className={"py-2"}>
          <p className="font-semibold">{i.instrumentName}</p>
          <ol>
          {i.musicians.filter(j => j.accepted === true).map(j => (
            <li key={j.id} className="">
              {`${j.musician.firstName} ${j.musician.lastName}`}
            </li>
          ))}
          {new Array(i.numToBook - i.musicians.filter(j => j.accepted === true).length).fill("TBC").map((i, index) => (
            <li key={index} className="text-gray-400">
              {i}
            </li>
          ))}
          </ol>
        </div>
      ))}
    </div>
  )
}