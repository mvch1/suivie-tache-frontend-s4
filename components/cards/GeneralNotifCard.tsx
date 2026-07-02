import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import Image from 'next/image'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { RequestStatus } from '@prisma/client'

export default function GeneralNotifCard({ id, lue, projectName, message, title, dateEnvoi,index,deletion,viewed }: { id: string, lue: boolean, projectName: string | null, message: string, title: string, dateEnvoi: Date ,index:number,deletion:(index:number)=>void,viewed?:(index:number)=>void}) {
    const router = useRouter()
    const [isOpen, setIsOpen] = React.useState(false);
    const deleteNotification = async (notifId: string) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/notifications/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: notifId }),
            });
            if (!response.ok) {
                toast.error('Failed to delete notification');
                throw new Error('Failed to delete notification');
            }
            toast.success("deleted")
            deletion(index);
            router.refresh();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };
    
    const view = async () => {
        if(message){
            if (lue) {
                setIsOpen(true);
                if(viewed)
                viewed(index);
                return;
            }
            setIsOpen(true);
            
        }
        if (viewed)
        viewed(index)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/notifications/${id}/read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, lue: true }),
            });
            if (!response.ok) {
                toast.error('Failed to mark notification as read');
                throw new Error('Failed to mark notification as read');
            }
            router.refresh();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }


    };
    return (
        <div >
            <div onDoubleClick={view} className={`flex items-center justify-between p-4 mb-2 rounded-lg ${lue ? 'bg-gray-300' : 'bg-blue-300'}`}>
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-foreground flex items-center justify-center mr-4">
                        <span className="text-lg font-bold">{projectName?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{projectName}:<span className='text-sm text-gray-600 ml-2'>{title}</span></h3>
                        {/* <p className="text-sm text-gray-600">{message}</p> */}
                    </div>
                </div>
                <div className='flex flex-col items-end gap-2 align-end'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Image className='cursor-pointer'
                                alt='actions'
                                src={'/assets/more.svg'}
                                height={24}
                                width={24}
                            />
                        </PopoverTrigger>

                        <PopoverContent className='flex flex-col gap-3 w-15 bg-gray-100 rounded-xl'>

                            {
                                <div className='cursor-pointer p-1 hover:bg-gray-1 hover:scale-130 rounded-full'
                                    onClick={() => { deleteNotification(id); /* Replace with actual notification ID */ }}>
                                    <Trash />
                                </div>

                            }

                        </PopoverContent>
                    </Popover>
                    <span className="text-xs text-gray-500">{new Date(dateEnvoi).toLocaleDateString()} {new Date(dateEnvoi).toLocaleTimeString()}</span>
                </div>
            </div>
            <Dialog open={isOpen} onOpenChange={() => { setIsOpen(false) }}>
                <DialogTitle className='hidden'>leaving project</DialogTitle>
                <DialogContent className=' m-auto flex flex-col p-3 pt-15 px-10 bg-mainbg-2 w-full text-foreground overflow-auto '>
                    <div>{message}</div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
