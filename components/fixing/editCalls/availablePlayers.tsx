import { FieldArray } from "formik";
import React from "react"
import Image from "next/image";
import { User } from "@prisma/client";


export type AvailablePlayersProps = {
  instrumentName: string
  availablePlayers: User[]
  appendPlayer: (arg: User) => void
  contactedPlayers: string[]
}

export default function AvailablePlayers(props: AvailablePlayersProps) {
  const { instrumentName, availablePlayers, appendPlayer, contactedPlayers } = props

  return (
    <div data-testid="available-players-div">
        <FieldArray  name="availablePlayers" data-testid={`${instrumentName}-not-called`}>
        {({ insert, remove, push}) => (
          <div className="px-2  py-4">
        <h3 className="text-sm my-4 mx-2">Select from directory</h3>
            {availablePlayers.length > 0 
            ? availablePlayers.map((i, index) => (
              <button disabled={contactedPlayers.includes(i.id)} className="disabled:text-zinc-300 border-slate-200 flex flex-row items-center justify-start py-3 w-full hover:bg-slate-100 disabled:hover:bg-white" onClick={() => {
                appendPlayer(i);
                remove(index)
                }} key={i.id} >
              <div className="rounded-full shadow overflow-hidden mx-2" data-testid={`${i.id}-img`}>
                <Image src={"http://placebeard.it/25/25"} width={25} height={25} alt="Placeholder for a profile pic" title="Profile picture placeholder" />
              </div>
              <p>{i.name}</p>
              </button>
            ))
            : <p className="text-center text-zinc-400 p-2 m-2">No players to select</p>}
          </div>
        )}
      </FieldArray>
    </div>
  )
}