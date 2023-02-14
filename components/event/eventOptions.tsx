import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'
import HomeTile from '../index/homeTile'
import React from 'react'

interface EventOptionsProps {
  fixer: boolean
}

export default function EventOptions(props: EventOptionsProps) {
  const { fixer } = props
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