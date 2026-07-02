import { DotSquare, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CircularProgressCard from './circularProgrssBar'

export default function ProjectCard({title,color,total,completed,date,handleClick}:{title:string,color:string,total:number,completed:number,date:Date,handleClick?:()=>void}) {
  const calculateHoursDifference = (date1: Date, date2: Date) => {
    const diffInMs = date2.getTime() - date1.getTime();
    return diffInMs / (1000 * 60 * 60);
  };
  const now=new Date() 
  const deadline= new Date(date)
  const hoursDifference = calculateHoursDifference(now,deadline);
  let message=''
  if(hoursDifference>=48){
    message=` (${Math.ceil(hoursDifference/24)} days)`
  }else if(hoursDifference>0){
    message=` (${Math.ceil(hoursDifference)} hours)`
  }else{
    message=`presented`
  }
  const formatedDate=`${deadline.getFullYear()}-${deadline.getMonth()+1}-${deadline.getDate()} ${message}`
  return (

    <div className={`m-auto px-4 py-6 w-full xl:min-w-[300px] max-w-[350px]  min-h-[200px] 
      rounded-[16px] cursor-pointer flex flex-col gap-4 justify-between ${color}`} onClick={handleClick}>
      <h1 className='text-white card-title font-semibold text-2xl'>{title}</h1>
        <div className='flex flex-col justify-around w-full'>
          <CircularProgressCard nb_tasks={total} completed_tasks={completed}/>
        </div>
        <div className='font-semibold px-4 text-gray-400'>{formatedDate} </div>
      <div className=' flex justify-center items-center glassmorphism2 size-13 w-full rounded-2xl'>
        <MoreHorizontal
            width={24}
            height={24}
        />
      </div>
    </div>
  )
}
