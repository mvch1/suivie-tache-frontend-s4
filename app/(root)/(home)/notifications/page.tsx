
import NotifficationsList from '@/components/lists/NotifficationsList'
import { getSession } from '@/lib/session';
import React from 'react'

export default async function page() {
  const session = await getSession();
  const u_id = session.userId;
  return (
    <div className='text-foreground'>
      {u_id &&(<NotifficationsList u_id={u_id} />)}
    </div>
  )
}