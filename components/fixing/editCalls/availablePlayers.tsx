import { FieldArray } from "formik";
import React from "react"

interface Instrumentalist {
  id: string
  name: string
  email: string
  emailVerified: boolean|null
  instrument: string
  profileInfo: null|string
  isFixer: null|boolean
}

interface AvailablePlayersProps {
  instrumentName: string
  availablePlayers: Instrumentalist[]
  appendPlayer: (arg: Instrumentalist) => void
}

export default function AvailablePlayers(props: AvailablePlayersProps) {
  const { instrumentName, availablePlayers, appendPlayer } = props
  return (
    <div data-testid="available-players-div">
        <FieldArray  name="availablePlayers" data-testid={`${instrumentName}-not-called`}>
        {({ insert, remove, push}) => (
          <div className="p-2  available-players-list">
        <h3 className="text-sm pl-4">Select players</h3>
            {availablePlayers.length > 0 
            ? availablePlayers.map((i, index) => (
              <button className="border border-slate-400 flex flex-row items-center justify-between p-4 w-full hover:bg-slate-100" onClick={() => {
                appendPlayer(i);
                remove(index)
                }} key={i.id} >
              <p>{i.name}</p>
              </button>
            ))
            : <p className="no-players">No players to select</p>}
          </div>
        )}
      </FieldArray>
    </div>
  )
}