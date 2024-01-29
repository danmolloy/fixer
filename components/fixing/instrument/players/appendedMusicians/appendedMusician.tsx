import { Call, User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { BsEnvelope, BsThreeDotsVertical } from "react-icons/bs";
import AppendedMusicianMenu from "./appendedMusicianMenu";
import { Field } from "formik";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

export type AppendedMusicianObj = {
  user: User,
  addedMessage: string
  calls: String[]
  positionTitle: string
}

export type AppendedMusicianProps = {
  musician: AppendedMusicianObj,
  allEventCalls: Call[],
  index: number,
  remove: () => void
  addedMessage: string
  setMessage: (msg: string) => void
  move: (from: number, to: number) => void
  listLength: number
}

export default function AppendedMusician(props: AppendedMusicianProps) {
  const { listLength, move, remove, allEventCalls, musician, index, addedMessage, setMessage } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <tr className=" border-b w-full" data-testid="appended-musician">
      <td className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-center">
          <div className="rounded-full overflow-hidden shadow m-2 w-12 h-12 flex items-center" data-testid={`profile-img`}>
            <Image src={"http://placebeard.it/100/100"} width={48} height={48} alt={`${musician.user.firstName} ${musician.user.lastName} profile image`} title={`${musician.user.firstName} ${musician.user.lastName} profile image`} />
          </div>
          <div>
            <div>
            <p>{musician.user.firstName} {musician.user.lastName}</p>
            <Field data-testid={`${musician.user.id}-position-select`} name={`musicians.${index}.positionTitle`} as="select" className='m-1 border p-1 rounded'>
              <option value="principal">Principal</option>
              <option value="tutti">Tutti</option>
            </Field>
            </div>
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
            checked={musician.calls.includes(String(i.id)) ? true : false}
            data-testid={`${musician.user.id}-row-call-${i.id}`} 
            type="checkbox" 
            value={i.id}
            name={`musicians[${index}]calls`} />
          </div>
        </td>
      ))}
      <td>
        <button data-testid="move-up-btn" disabled={index === 0} onClick={(e) => {e.preventDefault(); move(index, index - 1)}}>
         <AiOutlineUp />
        </button>
        <button data-testid="move-down-btn" disabled={index >= listLength - 1} onClick={(e) => {e.preventDefault(); move(index, index + 1)}}>
          <AiOutlineDown />
        </button>
      </td>
      <td className="">
        <div className=" flex items-center justify-center">
        <button className=" m-2  text-xl flex self-center justify-center hover:text-indigo-600" data-testid="menu-btn" onClick={(e) => {e.preventDefault(); setShowMenu(!showMenu)}}>
          <BsThreeDotsVertical />
        </button>
        {showMenu 
          && <AppendedMusicianMenu musicianName={`${musician.user.firstName} ${musician.user.lastName}`} setMessage={(msg) => setMessage(msg)} setShowMenu={(arg) => setShowMenu(arg)} index={index} remove={() => remove()} userId={musician.user.id} />}
      </div>
      </td>
    </tr>
  )
}