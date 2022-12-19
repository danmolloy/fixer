import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'

export default function PlayerTile(props) {
  const { player } = props
  return (
      <div data-testid={`${player.name}-tile`} className="player-tile">
      <AiOutlineUser className='user-image' title={`${player.name}`}/>
      {/* <Image src={"https://www.fillmurray.com/200/300"} width={200} height={300} /> */}

      <div className='mx-12 flex flex-col items-center text-center'>
        <h3 className="">
          {player.name}
        </h3>
        <p className='text-gray-500'>{player.instrument}</p>
      </div>
      <div>
      <Link href={`/user/${player.name}`} className=''>
        <button className="secondary-btn shadow-none mt-0" data-testid="profile-contact-btn">
          View Profile
        </button>
      </Link>

        <button className="primary-btn shadow-none mt-0" data-testid="profile-contact-btn" onClick={() => alert("Function not implemented")}>
            Contact
        </button>
      </div>
      </div>
  )
}