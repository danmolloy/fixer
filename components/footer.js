import Link from 'next/link'
import { AiOutlineTwitter } from 'react-icons/ai'
import LoginBtn from './loginBtn'

export default function Footer() {
  return (
    <div className='footer'>
      <AiOutlineTwitter className='react-icons'/>
      <LoginBtn />
      <div className='footer-links'>
      <Link href="/about">
          <a className='footer-link'>
            About
          </a>
        </Link>
        <Link href="/contact">
          <a className='footer-link'>
            Contact Us
          </a>
        </Link>
      </div>
    </div>
  )
}