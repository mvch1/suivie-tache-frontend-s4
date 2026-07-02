'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import SignedIn from './SignedIn';
import SignOut from './SignOut';
  
export default function MobileNav() {
    const pathname=usePathname()
  return (
    <section className='w-full max-w-[250px]'>
        <Sheet>
            <SheetTrigger>
                <Image
                src="/icons/hamburger.svg"
                alt='humberger icon'
                height={35}
                width={35}
                className='cursor-pointer md:hidden'
                />
            </SheetTrigger>
            <SheetContent color='dark' side='left' className='bg-mainbg-1 p-3'>
            <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
            
                <Link href='/' className='flex items-center gap-3'>
                    <Image
                    src='/assets/logo.svg'
                    alt='logo'
                    className='logo-svg'
                    width={30}
                    height={30}
                    />
                    <p className='font-semibold text-gray-200'>MyApp</p>
                </Link>
                <div className='flex h-[calc(100vh-75px)] flex-col justify-between overflow-y-auto'>
                    <SheetClose asChild>
                        <section className='flex flex-col h-dvh justify-between'>
                        <div className='flex h-full flex-col gap-6 pt-16 text-white'>
                            {sidebarLinks.map((link)=>{
                                const isActive = pathname===link.route || (pathname.startsWith(link.route) && link.route.length>1);
                                return (
                                    <SheetClose asChild key={link.label}>
                                        <Link 
                                        href={link.route}
                                        className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{
                                            'bg-blue-500':isActive,})}>
                                            <Image
                                            src={link.icon}
                                            alt={`f-${link.label}`}
                                            height={20}
                                            width={20}
                                            className='fill-white'
                                            />
                                            <p className='font-semibold '>{link.label}</p>
                                        </Link>
                                    </SheetClose>
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
                    </SheetClose>
                </div>

            </SheetContent>
        </Sheet>

    </section>
  )
}
