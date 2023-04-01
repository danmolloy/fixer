import React from "react"

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
 */}        <h2 className={instrumentFixed ? "text-green-500" : ""}>{instrumentName}</h2>
        {instrumentFixed 
        ? <p className="text-green-500 text-sm">Booked {numToBook} player(s)</p>
        : <p className="text-zinc-700 text-sm">Booking {numToBook} player(s)</p>}
      {/* </div> */}
      <div className=" text-sm font-bold py-2 text-red-500">
        <p data-testid="mock-note">{fixerNote}</p>
      </div>
    </div>
  )
}