import { Field } from "formik";
import Link from "next/link";
import TextInput from "../../../../event/createUpdate/textInput";
import { useEffect, useRef, useState } from "react";

export type AppendedMusicianMenuProps = {
  remove: () => void
  userId: string
  index: number
  setShowMenu: (arg: boolean) => void
  setMessage: (message: string) => void
  musicianName: string
}

export default function AppendedMusicianMenu(props: AppendedMusicianMenuProps) {
  const { remove, userId, index, setShowMenu, setMessage, musicianName } = props;
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleMessage = (e): void => {
    const message = prompt(`What additional message do you want to send to ${musicianName}?`)
    e.preventDefault();
      setShowMenu(false);

    if (message !== null) {
      setMessage(message);
    }
  }

  const handleRemove = (e): void => {
    e.preventDefault()
    remove()
  }

  return (
    <div tabIndex={-1}  ref={ref} onBlur={() => setTimeout(() => setShowMenu(false), 150)} className="flex flex-col border rounded shadow items-center absolute  bg-white -ml-4 -mt-36">
      <Link className="hover:text-indigo-600 w-full text-center py-1 px-2" href={`/user/${userId}`}>View Profile</Link>
      <button className="hover:text-indigo-600 w-full py-1 px-2" onClick={(e) => handleRemove(e)}>Remove from List</button>
      <button className="hover:text-indigo-600 w-full py-1 px-2" onClick={(e) => handleMessage(e)}>Add Message</button>
    </div>
  )
}