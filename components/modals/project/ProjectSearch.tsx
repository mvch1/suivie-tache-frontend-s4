
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useSession } from '@/app/session.context'
import { requestToJoin } from '@/reusable/mthods'
interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleClick?:()=>void
    closeDialog:()=>void
}
export default function ProjectSearch({isOpen,onClose,closeDialog,handleClick}:promps) {
    const session=useSession();
    const id=session.userId;
    const [projectId,setProjectId]=useState('');

    
    const joinProject = async ()=>{
            if(!id){
                toast.error("you must be loged in")
                return
            }
            closeDialog();
                try{
                const response = requestToJoin({u_id:id,project_id:projectId})
            }catch(error){
                if(error){
                    toast.error(`${error}`)
                }
            }
        }
    const onSubmit = ()=>{
       joinProject()
    }
    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Search for projects</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-full text-foreground glassmorphism-1'>
            <form className='flex flex-col gap-4 ' onSubmit={()=>{onSubmit()}}>
                <div className='project-title-insertion flex flex-col gap-2'>
                    <label>Project ID</label>
                    <input  type='text' 
                    value={projectId}
                    onChange={(event)=>{setProjectId(event.target.value)}}
                    className='bg-white h-13 rounded-xl text-black font-semibold px-4' placeholder='Project id' required/>
                </div>
                <Button className='bg-mainbg-1 text-white font-semibold h-10 mt-5 hover:text-lg'>Join <Search/>
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}