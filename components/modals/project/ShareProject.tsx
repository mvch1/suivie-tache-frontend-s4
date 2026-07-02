import { Dialog, DialogContent, DialogTitle }  from '../../ui/dialog'
import { Copy } from 'lucide-react'
import React from 'react'

type promps={
    id:string
    title?:string
    isOpen:boolean
    onClose?:()=>void
}
export default function ShareProject({id,title,isOpen,onClose}:promps) {
    const copyToClipboard= async (str:string)=>{
        if(str){
            return await navigator.clipboard.writeText(str)
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Share Project</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-full  text-foreground glassmorphism'>
            <div className='flex flex-col gap-4'>
                <div className='font-semibold'>Use this id to join <span className='text-gray-1'>{title}</span></div>
                <div className='bg-white text-black font-semibold p-3 rounded-2xl flex justify-between'>
                    <span>{id}</span>
                    <Copy className='cursor-pointer' onClick={()=>{copyToClipboard(id)}}/>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
