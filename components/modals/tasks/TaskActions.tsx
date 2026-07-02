
'use client'
import{useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { useParams} from 'next/navigation'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Task } from '@/constants/types'

interface promps{
    isOpen:boolean
    onClose?:()=>void
    // handleSubmit:()=>void
    closeDialog:()=>void
    index:number
    tasks:Task[]
}


export default function TasktActions({
    isOpen,
    onClose,
    closeDialog,
    index,
    tasks}:promps) {
    const [task,setTask]=useState(tasks[index])
    const [name,setName]=useState(task.title);
    const [description,setDescription]=useState(task.description);
    const onSubmit = async () => {
        closeDialog();
        if(!name){
            toast.error('enter task name')
            return
        }
        try{
            const data= {
                id:task.id,
                title:name,
                projectId:task.projectId,
                description:description,
                createdAt:task.createdAt,
                completed:task.completed
              }
              
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/tasks/${task.id}/update`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if(response.ok){
                toast.success("updated")
            }else{
                toast.error("error")
            }

        }catch(error){
            console.log('error: ',error)
        }
      };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Edit Task</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-100 text-foreground glassmorphism'>
            <form className='flex flex-col gap-4 '
                        onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                        }}>
                    <div className='project-title-insertion flex flex-col gap-2'>
                        <label>Task Name</label>
                        <input 
                        type='text' 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        className='bg-mainbg-2 h-13 rounded-xl text-black font-semibold px-4' 
                        placeholder='Name' required/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <textarea
                        rows={5} 
                        value={description||''} 
                        onChange={(event)=>{setDescription(event.target.value)}}
                        className='bg-mainbg-2 rounded-xl text-black font-semibold p-4'
                        ></textarea> 
                    </div>
                    <Checkbox/>   
                <Button className='bg-mainbg-1 text-white font-semibold h-10 mt-5 hover:text-lg'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}
