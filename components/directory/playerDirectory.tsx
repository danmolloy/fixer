import { instrumentArr } from "../fixing/fixing"
import React, { useEffect, useState } from "react"
import PlayerTile from "./playerTile"
import IsLoadingTile from "./isLoadingTile"
import ToggleSwitch from "../index/toggleSwitch"
import { User } from "@prisma/client"
import { useRouter } from 'next/router'
import SelectMenu from "../index/selectMenu"


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export type PlayerDirectoryProps = {
  data: User[] | undefined
  setPageTitle: (arg: string) => void
}

export default function PlayerDirectory(props: PlayerDirectoryProps) {
  const router = useRouter()
  const { data, setPageTitle } = props;
  const [selectedInstrument, setSelectedInstrument] = useState<string>("")
  const [sortedList, setSortedList] = useState<boolean>(false)

  useEffect(() => {
    const { query } = router
    if (query.instrument !== undefined) {
      let capitalized;
      let splitWords = String(router.query.instrument).split(" ")
      for (let i = 0; i < splitWords.length; i ++) {
        if (capitalized !== undefined) {
          capitalized = `${capitalized} ${splitWords[i].toUpperCase().slice(0, 1) + splitWords[i].slice(1)}`
        } else {
          capitalized = `${splitWords[i].toUpperCase().slice(0, 1) + splitWords[i].slice(1)}`

        }
      }
      setSelectedInstrument(capitalized)
      setPageTitle(capitalized)
    }
  }, [])

  useEffect(() => {
    // Always do navigations after the first render
    router.push(`/directory/?instrument=${selectedInstrument.toLowerCase()}`, undefined, { shallow: true })
  }, [selectedInstrument])

  return (
    <div className="w-screen flex flex-col items-center py-8" id="player-directory" data-testid="player-directory">
      <div className="flex flex-col w-full items-center">
        <SelectMenu id="directory-instrument" tickSelected={true} selectedVal={selectedInstrument} values={instrumentArr.map(i => ({val: i}))} handleSelect={val => {setSelectedInstrument(val); setPageTitle(val); setSortedList(false)}}  />
      {selectedInstrument !== "" && <ToggleSwitch label="Alphabetical" toggled={sortedList} setToggled={() => setSortedList(!sortedList)} />}
      </div>
        {selectedInstrument === ""
        ? <div>
            <h3 className="p-16 text-slate-700">Please select an instrument.</h3>
          </div>
        : data === undefined
        ? <div data-testid="loading-tiles" className="flex flex-row flex-wrap justify-center">
            <IsLoadingTile />
            <IsLoadingTile />
            <IsLoadingTile />
          </div>
        : <div className="flex flex-row flex-wrap justify-center  w-screen">
          {data.filter(i => i.instrument === selectedInstrument).length < 1
          ? <h3 className="p-16 text-slate-700">No musicians found.</h3>
          : <div className="flex flex-row flex-wrap justify-center  w-screen">
            {sortedList 
            ? data.filter(j => j.instrument === selectedInstrument).sort((a, b) => a.name.localeCompare(b.name)).map(i => (
              <div key={i.id}>
                <PlayerTile player={i} />
              </div>
            ))
            : shuffleArray(data).filter(j => j.instrument === selectedInstrument).map(i => (
              <div key={i.id}>
                <PlayerTile player={i} />
              </div>
            ))}
            </div>}
        </div>}
      </div>
  )
}