import Link from 'next/link'
import { AiOutlineTwitter } from 'react-icons/ai'
import LoginBtn from '../index/loginBtn'

export default function Footer() {
  return (
    <div className='footer' data-testid="layout-footer">
      <AiOutlineTwitter className='react-icons'/>
      <LoginBtn />
      <div className='footer-links'>
      <Link href="/about">
          <div className='footer-link'>
            About
          </div>
        </Link>
        <Link href="/contact">
          <div className='footer-link' data-testid="contact-link">
            Contact Us
          </div>
        </Link>
      </div>
    </div>
  )
}