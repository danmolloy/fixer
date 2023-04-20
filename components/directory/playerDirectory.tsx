import { instrumentArr } from "../fixing/fixing"
import React, { useState } from "react"
import PlayerTile from "./playerTile"
import IsLoadingTile from "./isLoadingTile"
import ButtonPrimary from "../index/buttonPrimary"

interface PlayerDirectoryProps {
  data: {
    id: string
    name: string
    instrument: string
    email: string
  }[] | undefined
}

export default function PlayerDirectory(props: PlayerDirectoryProps) {
  const { data } = props;
  const [selectedInstrument, setSelectedInstrument] = useState<string>("")
  const [sortedList, setSortedList] = useState<boolean>(false)


  return (
    <div className="w-screen flex flex-col items-center" id="player-directory" data-testid="player-directory-div">
      <div className="flex flex-col w-full items-center">
         <select onChange={e => setSelectedInstrument(e.target.value)} className="border shadow-sm p-1 rounded w-1/2 sm:w-1/3">
          <option value={""}>Select instrument</option>
          {instrumentArr.map(i => (
            <option value={i} key={i}>
              {i}
            </option>
          ))}
        </select>
        {selectedInstrument !== "" && <ButtonPrimary id="sort-btn" className="my-2 w-24 border-blue-600 text-blue-600 hover:bg-blue-50" handleClick={() => setSortedList(!sortedList)} text={sortedList ? "Random" : "Sort"} />}
      </div>
        {selectedInstrument === ""
        ? <div>
            <h3 className="p-16 text-slate-700">Please select an instrument.</h3>
          </div>
        : data === undefined
        ? <div className="flex flex-row flex-wrap justify-center">
            <IsLoadingTile />
            <IsLoadingTile />
            <IsLoadingTile />
          </div>
        : <div className="flex flex-row flex-wrap justify-center">
          {data.filter(i => i.instrument === selectedInstrument).length < 1
          ? <h3 className="p-16 text-slate-700">No musicians found.</h3>
          : <div>
            {data.filter(j => j.instrument === selectedInstrument).sort((a, b) => sortedList && a.name.localeCompare(b.name)).map(i => (
              <div key={i.id}>
                <PlayerTile player={i} />
              </div>
            ))}
            </div>}
        </div>
}
      </div>
  )
}