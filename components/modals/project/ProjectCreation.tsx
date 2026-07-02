
'use client'
import{useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { CalendarForm } from '../../ui/forms/calendarForm'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { randomUUID } from 'crypto'
import { useSession } from '@/app/session.context'
interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleClick?:()=>void
    closeDialog:()=>void
    project_id?:string
    Title?:string
    Description?:string
    Deadline?:Date
    actionType?:'creating'|'editing'
}
export default function ProjectCreation({isOpen,onClose,closeDialog,project_id,Title,Description,Deadline,actionType}:promps) {
    const [date, setDate] = useState<Date | undefined>(Deadline);
    const [name,setName]=useState(Title||'');
    const [description,setDescription]=useState(Description||'');
    const router=useRouter()
    const session = useSession();
    const id=session.userId ;

    const createProject = async () => {
        closeDialog();
        if (!name || !date) {
          toast.error("Please enter a project name and deadline.");
          return;
        }
      
        if (!id) {
          toast.error("You must be logged in.");
          return;
        }
        try {
            const data= {
              title: name,
              ownerId: id, 
              description: description || null,
              deadline: date ? new Date(date) : null,
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
            
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }else{
                setDescription('')
                setName('')
                setDate(undefined)
              }
          
          toast.success("Project created successfully!");
          router.push('/projects')
        } catch (error) {
          toast.error("Something went wrong.");
        }
      };

    const updateProject = async () => {
        closeDialog();
        if (!name || !date) {
          toast.error("Please enter a project name and deadline.");
          return;
        }
        if (!id) {
          toast.error("You must be logged in.");
          return;
        }
        try {
            const data= {
              title: name,
              description: description || null,
              deadline: date,
            }
            console.log(data)
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/${project_id}/edit`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
            
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }else{
                setDescription('')
                setName('')
                setDate(undefined)
                router.refresh()
                toast.success("Project updated successfully!");
              }
          
        } catch (error) {
          toast.error("Something went wrong.");
        }
      };

    const onSubmit = ()=>{
      if(actionType==='editing'){
        updateProject();
      }else{
        createProject();
      }
    }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Create Project</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-full  text-foreground glassmorphism-1'>
            <form className='flex flex-col gap-4 '
                        onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                        }}>
                    
                    <div className='project-title-insertion flex flex-col gap-2'>
                        <label>Project Name</label>
                        <input 
                        type='text' 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        className='bg-mainbg-2 h-13 rounded-xl text-foreground font-semibold px-4' 
                        placeholder='Name' required/>
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <textarea
                        rows={5} 
                        value={description||''} 
                        onChange={(event)=>{setDescription(event.target.value)}}
                        className='bg-mainbg-2 rounded-xl text-foreground font-semibold p-4'
                        ></textarea>    
                    </div>
                <div>
                    <CalendarForm handleChange={(value:Date|undefined)=>{setDate(value)}} date={date}/>
                </div>
                <Button className='bg-mainbg-1 text-white font-semibold h-10 mt-5 hover:text-lg'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}
