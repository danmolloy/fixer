import React from "react"

interface TileHeaderProps {
  instrumentFixed: boolean
  instrumentName: string
}

export default function TileHeader(props: TileHeaderProps) {
  const { instrumentFixed, instrumentName } = props
  return (
    <div className="instrument-tile-header">
        <h2 className={instrumentFixed ? "text-green-500" : "p-1"}>{instrumentName}</h2>
       {/*  <p>Booking {numToBook} player(s)</p> */}
      </div>
  )
}