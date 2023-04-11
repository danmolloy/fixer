import InstrumentDiv from "./instrumentDiv"
import { instrumentArr } from "../fixing/fixing"
import React, { useState } from "react"
import PlayerTile from "./playerTile"

interface PlayerDirectoryProps {
  data: {
    name: string
    instrument: string
    email: string
  }[]
}

export default function PlayerDirectory(props: PlayerDirectoryProps) {
  const { data } = props
  const [selectedInstrument, setSelectedInstrument] = useState<string|null>(null)

  const directoryArr = instrumentArr.map(i => ({
    instrument: i,
    musicians: data.filter(j => j.instrument === i),
    key: i
  }))

  return (
    <div className="directory" id="player-directory" data-testid="player-directory-div">
          {/* {directoryArr.map(i => (
            <InstrumentDiv instrument={i.instrument} musicians={i.musicians} key={i.key}/>
          ))} */}
        <select onChange={e => setSelectedInstrument(e.target.value)} className="border shadow-sm p-1 rounded w-1/2 sm:w-1/3">
          <option value={null}>Select instrument</option>
          {instrumentArr.map(i => (
            <option value={i} key={i}>
              {i}
            </option>
          ))}
        </select>
        <div className="flex flex-row flex-wrap justify-center">

          {data.filter(j => j.instrument === selectedInstrument).length < 1
          ? <h3 className="p-16 text-slate-700">No musicians found.</h3>
          : data.filter(j => j.instrument === selectedInstrument).map(i => (
            <div key={i.email}>
              <PlayerTile player={i} />
            </div>
          ))}
        </div>
      </div>
  )
}