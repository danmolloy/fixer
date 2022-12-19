import { useState } from "react"
import PlayerTile from "./playerTile"
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'


export default function InstrumentDiv(props) {
  const {instrument, musicians} = props
  const [showMusicians, setShowMusicians] = useState(false)

  return (
    <div data-testid={`${instrument}-directory`} className="instrument-div" >
      <div className="instrument-header">
        <h2 className="p-2">{instrument}</h2>
        <button data-testid={`${instrument}-directory-btn`} onClick={() => setShowMusicians(!showMusicians)} className="rounded-full m-2 p-1 hover:bg-gray-100 text-xl">
          {showMusicians 
          ? <IoIosClose />
          : <IoIosArrowDown />}
        </button>
      </div>
      {showMusicians &&
      <div className="instrument-players w-full border-t " >
        {musicians.length > 0 
        ? musicians.map(i => (
          <div key={i.email} data-testid={`${i.email}-tile`} className=" w-1/2 sm:w-3/5 lg:w-1/5 m-2">
          <PlayerTile player={i} />
          </div>
        )) : <h3>No musicians found.</h3>}
      </div>}
    </div>
  )
}

{/* <p className="instrument-player" key={i.email}>
            {i.name}
          </p> */}