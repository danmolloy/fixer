import React from "react"
import { TiTick } from "react-icons/ti"

interface TileHeaderProps {
  instrumentFixed: boolean
  instrumentName: string
  numToBook: number
  fixerNote?: string
}

export default function TileHeader(props: TileHeaderProps) {
  const { instrumentFixed, instrumentName, numToBook, fixerNote } = props
  return (
    <div className=" p-2" data-testid="tile-header-div">
{/*       <div className="flex flex-row items-center justify-between">
 */}        <h2 className={""}>{instrumentName}</h2>
        {instrumentFixed && numToBook > 0
        ? <div className="flex flex-row items-center">
            <p className="text-sm">Booked {numToBook} player(s)</p>
            <div className="text-green-600"><TiTick /></div>
          </div>
        : <p className="text-zinc-700 text-sm">Booking {numToBook} player(s)</p>}
      {/* </div> */}
      <div className=" text-sm font-bold py-2 text-red-500">
        <p data-testid="mock-note">{fixerNote}</p>
      </div>
    </div>
  )
}