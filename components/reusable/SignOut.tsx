'use client'
import { useSession } from '@/app/session.context';
import React, { ReactNode } from 'react'

export default function SignOut({children}:{children:ReactNode}) {
  const session = useSession()
  const logout= session.logout

  return <div onClick={logout}>{children}</div> 
}