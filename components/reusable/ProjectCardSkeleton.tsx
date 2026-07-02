import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ProjectCardSkeleton() {
  return (
    // <div className={`m-auto px-4 py-6 w-full xl:min-w-[300px] max-w-[350px]  min-h-[200px] 
    //     rounded-[16px] cursor-pointer flex flex-col gap-4 justify-between ${color}`} onClick={handleClick}>
    //     <h1 className='text-white card-title font-semibold text-2xl'>{title}</h1>
    //       <div className='flex flex-col justify-around w-full'>
    //         <CircularProgressCard nb_tasks={total} completed_tasks={completed}/>
    //       </div>
    //       <div className='font-semibold px-4 text-gray-400'>{formatedDate} </div>
    //     <div className=' flex justify-center items-center glassmorphism2 size-13 w-full rounded-2xl'>
    //       <MoreHorizontal
    //           width={24}
    //           height={24}
    //       />
    //     </div>
    // </div>
    <div className="m-auto px-4 py-6 w-full xl:min-w-[300px] max-w-[350px]  min-h-[200px] 
      rounded-[16px] cursor-pointer flex flex-col gap-4 justify-between glassmorphism-1">
      
      <Skeleton className="h-8 w-2/3 rounded-md" />
      <div className="flex flex-col justify-around w-full">
        <Skeleton className="h-[200px] w-[230px] rounded-xl m-auto" />
      </div>
      <Skeleton className="h-4 w-2/3 rounded-md mx-4" />
      <div className="">
        <Skeleton className="flex justify-center items-center size-13 w-full rounded-2xl " />
      </div>
    </div>
  )
}
