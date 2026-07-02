import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import NotificationCard from '../cards/NotificationCard';
import {RequestStatus } from '@prisma/client';
import { NotificationType } from '@/constants/types';

export default function RequestedJoin({isOpen,onClose,u_id,p_id,title}:{isOpen:boolean,onClose:()=>void,u_id:string,p_id:string,title:string}) {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const deleteFromList= (index:number)=>{
        const list=[]
        for(let i=0;i<notifications.length;i++){
            if(i===index){
                continue
            }else{
                list.push(notifications[i])
            }
        }
        setNotifications(list);
    }
    const changeitemList= (index:number,new_t:RequestStatus)=>{
        const list=[]
        for(let i=0;i<notifications.length;i++){
            if(i===index){
                let item=notifications[i]
                item.lue=true
                list.push(item)
                item.requestStatus=new_t
            }else{
                list.push(notifications[i])
            }
        }
        setNotifications(list);
    }
        useEffect(() => {
            async function fetchNotifications() {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/notifications/project/${p_id}/${u_id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch notifications');
                    }
                    const data: NotificationType[] = await response.json();
                    setNotifications(data);
                } catch (err) {
                    console.error(err);
                }
            }
    
            fetchNotifications();
        }, [u_id]);
  return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>leaving project</DialogTitle>
        <DialogContent className='flex flex-col p-10 px-10 bg-mainbg-2 w-full text-foreground h-150 overflow-auto glassmorphism'>
            {notifications.length==0&&(
                <div className='flex flex-col h-full justify-center'>
                    <h1 className='text-center font-semibold text-2xl'>No New Notifications</h1>
                </div>
            )}
            {notifications.map((notif: NotificationType,index:number) => (
                <NotificationCard key={notif.id} notif={notif} project={title} index={index} deletion={deleteFromList} changed={changeitemList}/>
            ))}
        </DialogContent>
    </Dialog>
  )
}
