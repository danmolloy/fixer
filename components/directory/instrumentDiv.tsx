import { useState } from "react"
import PlayerTile from "./playerTile"
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
      <button data-testid={`${instrument}-header-btn`} onClick={() => setShowMusicians(!showMusicians)} className=" w-full p-3 my-2 flex flex-row justify-between items-center">
        <h2 className="p-2 text-xl">{instrument}</h2>
        <div data-testid={`${instrument}-directory-btn`} className=" text-md py-1 px-2 rounded-md hover:bg-slate-100">
          {showMusicians 
          ? <p >Hide</p>
          : <p className="">View</p>}
        </div>
      </button>
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
