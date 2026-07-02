import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import SignedIn from './SignedIn'
import { Avatar } from '../ui/avatar'
import SignedInUser from './SignedInUser'
import { ModeToggle } from '../ui/ModeSwitcher'

export default function Navbar() {
  return (
    <nav className='flex justify-between z-50 fixed w-full p-3 bg-mainbg-1'>
      <Link
      href='/'
      className='flex items-center gap-3'
      >
        <Image
        src='/assets/logo.svg'
        alt='logo'
        width={30}
        height={30}
        className='logo-svg'
        />
        <p className='font-semibold max-xs:hidden text-foreground'>MyApp</p>
      </Link>

      <div className='flex justify-between gap-4'>
        {/* <SignedIn>
          <UserButton/>
        </SignedIn>
        */}
        <ModeToggle/>
        <SignedIn>
          <SignedInUser/>
        </SignedIn>
        <MobileNav/> 

      </div>
    </nav>
  )
}
