import { Call, User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { BsEnvelope, BsThreeDotsVertical } from "react-icons/bs";
import AppendedMusicianMenu from "./appendedMusicianMenu";
import { Field } from "formik";

export type AppendedMusicianProps = {
  musician: {
    user: User,
    addedMessage: string
    calls: Call[]
  },
  allEventCalls: Call[],
  index: number,
  remove: () => void
  addedMessage: string
  setMessage: (msg: string) => void
}

export default function AppendedMusician(props: AppendedMusicianProps) {
  const { remove, allEventCalls, musician, index, addedMessage, setMessage } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <tr className=" border-b w-full" data-testid="appended-musician">
      <td className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-center">
          <div className="rounded-full overflow-hidden shadow m-2 w-12 h-12 flex items-center" data-testid={`profile-img`}>
            <Image src={"http://placebeard.it/100/100"} width={48} height={48} alt={`${musician.user.name} profile image`} title={`${musician.user.name} profile image`} />
          </div>
          <div>
          <p>
            {musician.user.name}
          </p>
            {addedMessage.length > 0 
            && <div className="flex flex-row items-center text-slate-400">
              <BsEnvelope />
              <p  className="ml-1 text-sm" data-testid="added-message">{addedMessage}</p>
          </div> }
        </div>
        </div>
      </td>
      {allEventCalls.map(i => (
        <td key={i.id}>
          <div className=" flex items-center justify-center">
          <Field 
            data-testid={`${musician.user.id}-row-call-${i.id}`} 
            type="checkbox" 
            value={`${i.id}`}
            name={`appendedPlayers[${index}]calls`} />
          </div>
        </td>
      ))}
      <td className="">
        <div className=" flex items-center justify-center">
        <button className=" m-2  text-xl flex self-center justify-center hover:text-indigo-600" data-testid="menu-btn" onClick={(e) => {e.preventDefault(); setShowMenu(!showMenu)}}>
          <BsThreeDotsVertical />
        </button>
        {showMenu 
          && <AppendedMusicianMenu musicianName={musician.user.name} setMessage={(msg) => setMessage(msg)} setShowMenu={(arg) => setShowMenu(arg)} index={index} remove={() => remove()} userId={musician.user.id} />}
      </div>
      </td>
    </tr>
  )
}