import { Field } from "formik";
import Link from "next/link";
import TextInput from "../../../../createEvent/textInput";
import { useState } from "react";

export type AppendedMusicianMenuProps = {
  remove: () => void
  userId: string
  index: number
  setShowMenu: (arg: boolean) => void
}

export default function AppendedMusicianMenu(props: AppendedMusicianMenuProps) {
  const { remove, userId, index, setShowMenu } = props;

  return (
    <div>
      <Link href={`/user/${userId}`}>View Profile</Link>
      <button onClick={() => remove()}>Remove from List</button>
      <TextInput
        asHtml="textarea"
        name={`appendedPlayers[${index}]addedMessage`} 
        id={`appendedPlayers[${index}]addedMessage`}
        min={"0"}
        max={"250"}
        label={"Add Message"} />
        <button onClick={() => setShowMenu(false)}>Done</button>
    </div>
  )
}