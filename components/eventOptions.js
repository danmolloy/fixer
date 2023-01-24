import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'
import HomeTile from './homeTile'

export default function EventOptions({ fixer }) {
  return (
    fixer
    ? <div className='flex flex-row'>
        <HomeTile link={"/"} title={"Message Players"}>
          <AiOutlineMessage />
        </HomeTile>
        <HomeTile link={"/"} title={"Edit Event"}>
          <FaRegEdit />
        </HomeTile>
      </div>
    : <div className='flex flex-row'>
    <HomeTile link={"/"} title={"Contact Fixer"}>
      <AiOutlineMessage />
    </HomeTile>
  </div>
  )
}