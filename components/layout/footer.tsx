import Link from 'next/link'
import { AiOutlineTwitter } from 'react-icons/ai'
import LoginBtn from '../index/loginBtn'
import React from 'react'

export default function Footer() {
  return (
    <div className='bottom-0 h-24 w-full flex flex-row items-center justify-between bg-slate-100 text-sm' data-testid="layout-footer">
      <Link href="/" data-testid="twitter-link">
        <AiOutlineTwitter className='p-2 w-10 h-10'/>
      </Link>
      <LoginBtn />
      <div className='flex flex-col mr-2'>
      <Link href="/about">
          <div className='flex flex-col mr-2'>
            About
          </div>
        </Link>
        <Link href="/contact">
          <div className='flex flex-col mr-2' data-testid="contact-link">
            Contact us
          </div>
        </Link>
      </div>
    </div>
  )
}