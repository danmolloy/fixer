import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'
import React from 'react'
import { MdPhone } from 'react-icons/md'

interface PlayerTileProps {
  player: {
    name: string
    instrument: string
    email: string
  }
}

export default function PlayerTile(props: PlayerTileProps) {
  const { player } = props
  return (
      <div data-testid={"player-tile-div"} className="w-72 m-2 bg-white rounded-md shadow flex flex-col items-center">
      <div className="rounded-full overflow-hidden w-36  m-8">
        <Image src={"http://placebeard.it/200/200"} width={150} height={150} alt="Placeholder for a profile pic" title="Profile picture placeholder" />
      </div>

      <div className='text-center mb-8'>
        <h3 className="font-bold">
          {player.name}
        </h3>
        <p className='text-slate-500'>{player.instrument}</p>
      </div>
      <div className='border-t w-full flex flex-row justify-evenly'>
      <Link href={`/user/${player.name}`} className='h-12 border-r w-1/2 text-center'>
        <button className="hover:bg-slate-100 w-full h-full flex flex-row justify-center items-center" data-testid="view-profile-btn">
          <AiOutlineUser />
          <p className='p-2'>Profile</p>
        </button>
      </Link>

        <button className="hover:bg-slate-100 h-12 w-1/2 flex flex-row justify-center items-center" data-testid="player-contact-btn" onClick={() => alert("Function not implemented")}>
            <MdPhone />
            <p className='p-2'>Contact</p>
        </button>
      </div>
      </div>
  )
}