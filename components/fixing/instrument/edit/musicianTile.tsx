import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export type MusicianTileProps = {
  musician: User,
  appendPlayer: () => void
}

export default function MusicianTile(props: MusicianTileProps) {
  const { musician, appendPlayer } = props;

  return (
    <div data-testid="musician-tile">
      <div data-testid={`profile-img`}>
        <Image src={"http://placebeard.it/25/25"} width={25} height={25} alt={`${musician.name} profile image`} title={`${musician.name} profile image`} />
      </div>
      <p>{musician.name}</p>
      <button onClick={() => appendPlayer()}>Add to List</button>
      <Link href={`/user/${musician.id}`}>View Profile</Link>
    </div>
  )
}