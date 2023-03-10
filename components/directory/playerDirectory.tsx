import InstrumentDiv from "./instrumentDiv"
import { instrumentArr } from "../fixing/fixing"
import React from "react"

interface PlayerDirectoryProps {
  data: {
    name: string
    instrument: string
    email: string
  }[]
}

export default function PlayerDirectory(props: PlayerDirectoryProps) {
  const { data } = props

  const directoryArr = instrumentArr.map(i => ({
    instrument: i,
    musicians: data.filter(j => j.instrument === i),
    key: i
  }))

  return (
    <div className="directory" id="player-directory" data-testid="player-directory-div">
          {directoryArr.map(i => (
            <InstrumentDiv instrument={i.instrument} musicians={i.musicians} key={i.key}/>
          ))}
      </div>
  )
}