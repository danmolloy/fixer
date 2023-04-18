import React from 'react'

export default function IsLoadingTile() {
  
  return (
      <div className={"w-72 m-2 bg-white rounded-md shadow flex flex-col items-center"}>
      <div className="rounded-full overflow-hidden w-36 h-36 m-8 bg-slate-200 animate-pulse" />
      <div className='flex flex-col items-center mb-8'>
        <div className="rounded h-6 bg-slate-200 animate-pulse w-36" />
        <div className='text-center rounded h-6 bg-slate-200 animate-pulse w-24 mt-1' />
      </div>
      <div className='border-t w-full flex flex-row justify-evenly'>
      <div className=" h-12 w-1/2 flex flex-row justify-center items-center" >
            <div className='w-20 h-6 bg-slate-200 animate-pulse rounded' />
        </div>
        <div className=" h-12 w-1/2 flex flex-row justify-center items-center" >
            <div className='w-20 h-6 bg-slate-200 animate-pulse rounded' />
        </div>
      </div>
      </div>
  )
}