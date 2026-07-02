import Bottombar from '@/components/reusable/Bottombar'
import Navbar from '@/components/reusable/Navbar'
import Sidebar from '@/components/reusable/Sidebar'
import React, { ReactNode } from 'react'

function HomeLayout({children}:{children:ReactNode}) {
  return (
    <>
      <main className='relative mb-3'>
          <Navbar/>
          <div className='flex'>
              <Sidebar/>
              
              <section className='flex min-h-screen flex-1 flex-col px-2 pb-6 pt-28 max-md:pb-14 sm:px-14 bg-mainbg-2'>
                  <div>
                      {children}
                  </div>
              </section>
          </div>
      </main>
    </>
  )
}

export default HomeLayout