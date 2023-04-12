
import React from 'react'
import ButtonPrimary from '../index/buttonPrimary'

interface EventOptionsProps {
  fixerId: string
  userId: string 
}

export default function EventOptions(props: EventOptionsProps) {
  const { fixerId, userId } = props
  return (
    <div data-testid="event-options-div" className=''>
      {fixerId === userId
      ? <div className='m-4 flex flex-col w-1/2 lg:flex-row lg:w-full justify-evenly' data-testid="fixer-options">
          <ButtonPrimary className='text-emerald-600 border-emerald-600 hover:bg-emerald-50' handleClick={() => {}} id="message-players-btn" text="Message All Players"/>
          <ButtonPrimary className='text-amber-600 border-amber-600 hover:bg-amber-50' handleClick={() => {}} id="edit-event-btn" text="Edit Event" />
          <ButtonPrimary className='text-blue-600 border-blue-600 hover:bg-blue-50' handleClick={() => {}} id="export-event-btn" text="Export CSV" />
          <ButtonPrimary className='text-yellow-600 border-yellow-600 hover:bg-blue-50' handleClick={() => {}} id="export-event-btn" text="Add to Calendar" />

        </div>
      : <div className='flex flex-row' data-testid="player-options">
        <ButtonPrimary className='' handleClick={() => {}} id="request-parts-btn" text="Request Parts"/>
        <ButtonPrimary className='' handleClick={() => {}} id="contact-fixer-btn" text="Contact Fixer" />
        <ButtonPrimary className='text-yellow-600 border-yellow-600 hover:bg-blue-50' handleClick={() => {}} id="export-event-btn" text="Add to Calendar" />

    </div>}
  </div>
  )
}