'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { User, User_Project } from '@prisma/client';
import MembersList from '@/components/lists/MembersList';
import { User } from '@/constants/types';

export default function ListUsers({ users ,u_id,u_role,p_id}: { users: User[] ,u_id:string,u_role?:string,p_id:string}) {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [listOpened,openList]=useState(false)
  const [owner,setOwner]=useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      const results = await Promise.all(
        users.map(async (user) => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${user.id}/info`);
            return await res.json();
          } catch (e) {
            console.error('Error fetching user:', e);
            return null;
          }
        })
      );
      const validUsers = results.filter(Boolean) as User[];
      for(let i=0;i<users.length;i++){
        if(users[i].role=='owner'){
          setOwner(users[i].id);
          break
        }
      }
      setUsersData(validUsers);
    };

    fetchUsers();
  }, [users]);

  return (
    <div>
    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-1 cursor-pointer w-30 px-2" onClick={()=>{openList(true)}}>
      {usersData.slice(0, 3).map((user) => (
        <Avatar key={user.id}>
          <AvatarImage
            src={
              user.imageUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${user.username.trim()[0]}`
            }
          />
          <AvatarFallback>{user.name||user.username}</AvatarFallback>
        </Avatar>
      ))}
      {(usersData&&usersData.length>3)&&(
      <Avatar className="relative">
        <div className='bg-blue-800 w-full flex justify-center text-center font-bold'><span className='translate-x-[-2px] translate-y-[2px]'>+{usersData.length-3}</span></div>
        <AvatarFallback>more</AvatarFallback>
      </Avatar>

      )}
    </div>
    
      <MembersList 
      isOpen={listOpened}
      onClose={()=>{openList(false)}}
      users={usersData}
      u_id={u_id}
      u_role={u_role}
      p_id={p_id}
      owner_id={owner}
      />

    </div>
  );
}
