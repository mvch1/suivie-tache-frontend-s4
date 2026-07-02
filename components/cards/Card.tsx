import Image from 'next/image'
import React from 'react'

interface card{
  title:string,
  img_url:string,
  color:string,
  handleClick?:()=>void
}

export default function Card({title,img_url,color,handleClick}:card) {
  return (
    <div className={`m-auto px-4 py-6 w-full xl:min-w-[300px] max-w-[350px]  min-h-[200px] 
      rounded-[16px] cursor-pointer flex flex-col justify-between ${color}`} onClick={handleClick}>
      <h1 className='text-white font-semibold text-2xl'>{title}</h1>
      <div className=' flex justify-center items-center glassmorphism2 size-13 w-full rounded-2xl'>
        <Image
        src={img_url}
        alt='create project'
        width={20}
        height={20}
        />
      </div>
    </div>
  )
}
