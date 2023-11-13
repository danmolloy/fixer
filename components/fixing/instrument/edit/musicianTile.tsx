import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export type MusicianTileProps = {
  musician: User,
  appendPlayer: () => void
  disabled: boolean
}

export default function MusicianTile(props: MusicianTileProps) {
  const { musician, appendPlayer, disabled } = props;

  return (
    <div className={`${disabled && "opacity-30"} flex flex-row border-b items-center justify-between w-full p-1`} data-testid="musician-tile">
      <div className="flex flex-row items-center">
        <div className="rounded-full overflow-hidden shadow m-2 w-12 h-12 flex items-center" data-testid={`profile-img`}>
          <Image src={"http://placebeard.it/100/100"} width={48} height={48} alt={`${musician.firstName} ${musician.lastName} profile image`} title={`${musician.firstName} ${musician.lastName} profile image`} />
        </div>
        <div className="flex flex-col">
          <p>{musician.firstName} {musician.lastName}</p>
          <Link className={`text-sm text-indigo-600 hover:underline`} href={`/user/${musician.id}`}>View Profile</Link>

        </div>
      </div>
      <div className="flex flex-row items-center">
      <button disabled={disabled} className="text-indigo-600 border border-indigo-600 rounded px-2 py-1 m-1 shadow hover:bg-indigo-50" onClick={(e) => {e.preventDefault(); appendPlayer()}}>Add to List</button>
      </div>
    </div>
  )
}