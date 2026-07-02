'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import SignedIn from './SignedIn'
import SignOut from './SignOut'

export default function Sidebar() {
    const pathname=usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col 
    justify-between bg-mainbg-1 text-white p-6 pt-28 max-md:hidden lg:w-[264px]'>
        <div className='flex flex-col gap-6'>
            {sidebarLinks.map((link)=>{
                const isActive = pathname===link.route || (pathname.startsWith(link.route) && link.route.length>1);
                return (
                    <Link 
                    href={link.route}
                    key={link.label}
                    className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{
                        'bg-blue-500':isActive,
                    })}>
                        <Image
                        src={link.icon}
                        alt={link.label}
                        height={24}
                        width={24}
                        className='fill-white'
                        />
                        <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                    </Link>
                )
            })}
        </div>
        <div className='px-4 py-12'>
            <SignedIn>
                <SignOut>
                    <div className='flex cursor-pointer gap-3'>
                        <Image
                        src={'/assets/logout.svg'}
                        alt='logout'
                        width={25}
                        height={25}
                        />
                        <p className='font-semibold text-white'>LogOut</p>
                    </div>
                </SignOut>
            </SignedIn>
        </div>
    </section>
  )
}
