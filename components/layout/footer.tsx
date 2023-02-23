import Link from 'next/link'
import { AiOutlineTwitter } from 'react-icons/ai'
import LoginBtn from '../index/loginBtn'
import React from 'react'

export default function Footer() {
  return (
    <div className='footer' data-testid="layout-footer">
      <Link href="/" data-testid="twitter-link">
        <AiOutlineTwitter className='react-icons'/>
      </Link>
      <LoginBtn />
      <div className='footer-links'>
      <Link href="/about">
          <div className='footer-link'>
            About
          </div>
        </Link>
        <Link href="/contact">
          <div className='footer-link' data-testid="contact-link">
            Contact us
          </div>
        </Link>
      </div>
    </div>
  )
}