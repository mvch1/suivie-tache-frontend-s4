'use client'
import { useEffect, useState } from 'react';
import NotificationCard from '../cards/NotificationCard';
import { NotificationType } from '@/constants/types';
import { Smile } from 'lucide-react';


export default function NotifficationsList({ u_id }: { u_id: string }) {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [error, setError] = useState<string | null>(null);
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
        const view= (index:number)=>{
            const list=[]
            for(let i=0;i<notifications.length;i++){
                if(i===index){
                    let item=notifications[i]
                    item.lue=true
                    list.push(item)
                }else{
                    list.push(notifications[i])
                }
            }
            setNotifications(list);
        }
    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/notifications/user/${u_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data: NotificationType[] = await response.json();
                setNotifications(data);
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }

        fetchNotifications();
    }, [u_id]);

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {notifications.map((notif: NotificationType,index) => (
                <NotificationCard key={notif.id} notif={notif} index={index} changed={()=>{}} deletion={deleteFromList} viewed={view} />
            ))}
            {notifications.length==0&&(
                <div className='flex flex-col h-full justify-center'>
                    <h1 className='text-center font-semibold text-2xl'>No Notifications! </h1>
                </div>
            )}
        </>
    );
}
