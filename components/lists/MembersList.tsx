import React, { use } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import UserCard from '../cards/UserCard';
import { User } from '@/constants/types';

export default function MembersList({ isOpen, onClose, users, u_id, u_role, p_id,owner_id }: { isOpen: boolean, onClose: () => void, users: User[], u_id: string, p_id: string, u_role?: string,owner_id:string }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className='hidden'>leaving project</DialogTitle>
      <DialogContent className=' m-auto flex flex-col p-3 pt-15 px-10 bg-mainbg-2 w-full text-foreground overflow-auto h-100 glassmorphism'>
        {users.map((user, index) => (
          <UserCard key={index} user={user} u_id={u_id} u_role={u_role} p_id={p_id} isOwner={owner_id==user.id} />
        ))}
      </DialogContent>
    </Dialog>
  )
}
