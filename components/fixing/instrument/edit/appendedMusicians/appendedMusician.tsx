import { Call, User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
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
}

export default function AppendedMusician(props: AppendedMusicianProps) {
  const { remove, allEventCalls, musician, index, addedMessage } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <tr data-testid="appended-musician">
      <td>
      <div data-testid={`profile-img`}>
        <Image src={"http://placebeard.it/25/25"} width={25} height={25} alt={`${musician.user.name} profile image`} title={`${musician.user.name} profile image`} />
      </div>
      <div>
      <p>
        {musician.user.name}
      </p>
      <p data-testid="added-message">{addedMessage}</p>
      </div>
      </td>
      {allEventCalls.map(i => (
        <td key={i.id}>
          <Field 
            data-testid={`${musician.user.id}-row-call-${i.id}`} 
            type="checkbox" 
            value={`${i.id}`}
            name={`appendedPlayers[${index}]calls`} />
        </td>
      ))}
      <td>
        <button data-testid="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <BsThreeDotsVertical />
        </button>
        {showMenu 
          && <AppendedMusicianMenu setShowMenu={(arg) => setShowMenu(arg)} index={index} remove={() => remove()} userId={musician.user.id} />}
      </td>
    </tr>
  )
}