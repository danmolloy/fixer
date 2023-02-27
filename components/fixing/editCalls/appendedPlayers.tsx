import { FieldArray } from "formik";
import React from "react";

interface Instrumentalist {
  id: string
  name: string
  email: string
  emailVerified: boolean|null
  instrument: string
  profileInfo: null|string
  isFixer: null|boolean
}

interface AppendedPlayersProps {
  appendedPlayers: Instrumentalist[]
}

export default function AppendedPlayers(props: AppendedPlayersProps) {
  const { appendedPlayers } = props

  return (
    <div data-testid="appended-players-div">
      <FieldArray name="appendedPlayers">
        {({ insert, remove, push}) => (
          <div className="call-list-div appended-list">
          {appendedPlayers.map((i, index) => (
            <div className="call-list-item" key={i.id}>
            <p>{i.name}</p>
            </div>
          ))}
        </div>
        )}
      </FieldArray>
    </div>
  )
}