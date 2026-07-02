import {CheckCheckIcon, Pen, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '../../ui/checkbox'
import TasktCompletion from './TaskCompleation'
import TasktActions from './TaskActions'
import { PopoverTrigger,Popover  } from '@/components/ui/popover'
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover'
import { toast } from 'sonner'
import TasktCreation from './TaskCreation'
import { Button } from '@/components/ui/button'
import { Task } from '@/constants/types'


export default function ListTasks({tasks,role}:{tasks:Task[],role:string}) {
    const [clicked,SetClicked]=useState(-1);
    const [clicked2,SetClicked2]=useState(-1);
    const [tasks_list,setTasks]=useState<Task[]>(tasks);
    const [addingTask,setAddingTask]=useState(false)
    const completeItem=(index:number)=>{
        const list=[]
        for(let i=0;i<tasks_list.length;i++){
            if(i===index){
                const r=tasks_list[i]
                r.completed = !r.completed
                list.push(r)
            }else{
                list.push(tasks_list[i])
            }
        }
        setTasks(list);
    }
    useEffect(()=>{
        setTasks(tasks)

    },[tasks])
    const deleteFromList= (index:number)=>{
        const list=[]
        for(let i=0;i<tasks_list.length;i++){
            if(i===index){
                continue
            }else{
                list.push(tasks_list[i])
            }
        }
        setTasks(list);
    }
    const deleteTask = async (index:number)=>{
        try{
            deleteFromList(index)
            const task=tasks_list[index]
            const data={task_id:task.id}
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/tasks/delete`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(task.id),
            });
            if(response.ok){
                toast.success("task deleted")
            }else{
                toast.error("error")
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <>
        <div className='tasks flex flex-col gap-1'>

            <div className='bg-primary p-4 px-2 text-foreground scrolable h-50 w-full flex flex-col gap-3 rounded-md overflow-auto '>
                {[...tasks_list].map((item,index) => {
                    return (
                            <div key={index} className='bg-secondary p-4 rounded-lg flex justify-between'>
                                <div className='max-w-50'>
                                {item.title} 
                                </div>
                                {role&&(
                                    <div onClick={()=>{SetClicked2(index)}}>
                                    <Checkbox checked={tasks_list[index].completed}/>
                                    </div>
                                )}
                                <div>
                                    {role&&(
                                    <Popover>
                                        <PopoverTrigger>
                                            <Image className='cursor-pointer'
                                            alt='actions'
                                            src={'/assets/more.svg'}
                                            height={24}
                                            width={24}
                                            />
                                        </PopoverTrigger>
                                        <PopoverClose>
                                            <PopoverContent className='p-2 flex flex-col gap-3 bg-secondary rounded-xl'>
                                                <div className='cursor-pointer p-1 hover:scale-130 hover:text-gray-1 rounded-full'
                                                onClick={()=>{SetClicked(index)}}>
                                                    <Pen/>
                                                </div>
                                                <div className='cursor-pointer p-1 hover:scale-130 hover:text-gray-1 rounded-full'
                                                        onClick={()=>{deleteTask(index)}}>
                                                    <Trash/>
                                                </div>
                                                </PopoverContent>
                                        </PopoverClose>
                                    </Popover>
                                    )}
                                </div>
                            </div>
                    )})}
                    <div>
                    {(clicked2>=0)&&(
                        <TasktCompletion
                        isOpen={clicked2>=0}
                        closeDialog={()=>{SetClicked2(-1)}}
                        onClose={()=>{SetClicked2(-1)}}
                        handleSubmit={()=>{completeItem(clicked2)}}
                        tasks={tasks_list}
                        index={clicked2}
                        />
                    )}
                    {clicked>=0&&(
                        <TasktActions
                        isOpen={clicked>=0}
                        closeDialog={()=>{SetClicked(-1)}}
                        onClose={()=>{SetClicked(-1)}}
                        tasks={tasks_list}
                        index={clicked}
                        />
                    )}
                    </div>
            </div>

            <div className='flex gap-2 justify-around w-full'>
                {role&&(
                    <Button className=' bg-mainbg-1 text-white font-semibold h-10 mt-5 hover:text-lg  cursor-pointer w-50 glassmorphism' onClick={()=>{setAddingTask(true)}}><Plus/></Button>
                )}
            </div>
        </div>

        <TasktCreation
            isOpen={addingTask}
            handleCreation={(created:Task)=>{setTasks([...tasks_list,created])}}
            onClose={()=>{setAddingTask(false)}}
            closeDialog={()=>{setAddingTask(false)}}
        />
    </>
    
  )
}
