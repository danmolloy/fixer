import { FieldArray } from "formik";
import React from "react"
import { User } from "../fixing";
import Image from "next/image";


interface AvailablePlayersProps {
  instrumentName: string
  availablePlayers: User[]
  appendPlayer: (arg: User) => void
}

export default function AvailablePlayers(props: AvailablePlayersProps) {
  const { instrumentName, availablePlayers, appendPlayer } = props
  return (
    <div data-testid="available-players-div">
        <FieldArray  name="availablePlayers" data-testid={`${instrumentName}-not-called`}>
        {({ insert, remove, push}) => (
          <div className="p-2 available-players-list border m-1">
        <h3 className="text-sm my-4 mx-2">Select from directory</h3>
            {availablePlayers.length > 0 
            ? availablePlayers.map((i, index) => (
              <button className=" border-slate-200 flex flex-row items-center justify-start py-2 w-full hover:bg-slate-100" onClick={() => {
                appendPlayer(i);
                remove(index)
                }} key={i.id} >
              <div className="rounded-full shadow overflow-hidden mx-2" data-testid="profile-img">
                <Image src={"http://placebeard.it/25/25"} width={25} height={25} alt="Placeholder for a profile pic" title="Profile picture placeholder" />
              </div>
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