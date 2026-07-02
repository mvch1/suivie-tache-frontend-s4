import React, { use } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getSession } from '@/lib/session';
import Image from 'next/image';
import Link from 'next/link';

export default async function SignedInUser() {
  const session = await getSession();
  const u_id = session?.userId;

  if (!u_id) {
    return null; 
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${u_id}/info`);
  const user = await response.json();

  return (
    <Link href={'/profile'}>
      <Avatar className="w-10 h-10 bg-mainbg-1 cursor-pointer" >
        <AvatarImage src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username.trim()[0]}`} />
        <AvatarFallback className="bg-mainbg-1"> {user.username[0]} </AvatarFallback>
      </Avatar>
    </Link>
  );
}

