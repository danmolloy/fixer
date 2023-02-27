import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'
import HomeTile from '../index/homeTile'
import React from 'react'
import ButtonPrimary from '../index/buttonPrimary'

interface EventOptionsProps {
  fixerEmail: string
  sessionEmail: string 
}

export default function EventOptions(props: EventOptionsProps) {
  const { fixerEmail, sessionEmail } = props
  return (
    <div data-testid="event-options-div" className=''>
      {fixerEmail === sessionEmail
      ? <div className='m-4 flex flex-col w-1/2 lg:flex-row lg:w-full justify-evenly' data-testid="fixer-options">
          <ButtonPrimary className='text-emerald-600 border-emerald-600 hover:bg-emerald-50' handleClick={() => {}} id="message-players-btn" text="Message Players"/>
          <ButtonPrimary className='text-amber-600 border-amber-600 hover:bg-amber-50' handleClick={() => {}} id="edit-event-btn" text="Edit Event" />
          <ButtonPrimary className='text-blue-600 border-blue-600 hover:bg-blue-50' handleClick={() => {}} id="export-event-btn" text="Export Event" />
        </div>
      : <div className='flex flex-row' data-testid="player-options">
        <ButtonPrimary className='' handleClick={() => {}} id="request-parts-btn" text="Request Parts"/>
        <ButtonPrimary className='' handleClick={() => {}} id="contact-fixer-btn" text="Contact Fixer" />
    </div>}
  </div>
  )
}