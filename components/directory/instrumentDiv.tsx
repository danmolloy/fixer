import { useState } from "react"
import PlayerTile from "./playerTile"
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'
import React from "react";

interface InstrumentDivProps {
  instrument: string
  musicians: {
    name: string
    instrument: string
    email: string
  }[]
}

export default function InstrumentDiv(props: InstrumentDivProps) {
  const {instrument, musicians} = props
  const [showMusicians, setShowMusicians] = useState(false)

  return (
    <div data-testid={`${instrument}-directory`} className="instrument-div m-2 border rounded border-slate-200 shadow-sm" >
      <div className="p-2 flex flex-row justify-between items-center">
        <h2 className="p-2">{instrument}</h2>
        <button data-testid={`${instrument}-directory-btn`} onClick={() => setShowMusicians(!showMusicians)} className="text-white bg-blue-600 text-sm py-1 px-3 rounded-full hover:bg-blue-500">
          {showMusicians 
          ? <p >Hide</p>
          : <p className="">View</p>}
        </button>
      </div>
      {showMusicians &&
      <div className="flex flex-row flex-wrap items-center justify-center w-full border-t bg-slate-100" >
        {musicians.length > 0 
        ? musicians.map(i => (
          <div key={i.email} data-testid={`${i.email}-tile`} className="">
          <PlayerTile player={i} />
          </div>
        )) : <h3 className="p-16 text-slate-700">No musicians found.</h3>}
      </div>}
    </div>
  )
}

{/* <p className="instrument-player" key={i.email}>
            {i.name}
          </p> */}