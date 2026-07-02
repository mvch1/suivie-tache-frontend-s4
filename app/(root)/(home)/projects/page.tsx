'use client'
import { useSession } from '@/app/session.context';
import ProjectCard from '@/components/cards/ProjectCard'
import ListProjectSkeletons from '@/components/reusable/ListProjectSkeletons';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type project={
  id:string
  title:string
  ownerId:string
  createdAt:Date
  description:string
  deadline:Date
  t:number
  c:number
}
export default function page() {
    const [listProjects, setListProjects] = useState<project[]>([]); 
    const [isLoading,setIsloading]=useState(true)
    const cards=['card-1','card-2','card-3','card-4',]
    const session=useSession();
    const id = session.userId;
    const router = useRouter();
    
    useEffect(() => {
      const fetchProjects = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${id}/projects`);
            if (response.ok) {
            const projects = await response.json();
            setListProjects(projects);
            } else {
            setListProjects([]);
            // console.error("Failed to fetch projects:", response.statusText);
            }
          setIsloading(false)
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
      if(id)
      fetchProjects();
    }, []);
    if(isLoading){
      return (<ListProjectSkeletons nb={3}/>)
    }
  return (
    <div className='text-white'>
        {listProjects.length==0&&(
          <div className='flex flex-col h-full justify-center'>
            <h1 className='text-center font-semibold text-2xl '>No Projects! </h1>
          </div>
        )}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
            {listProjects&&listProjects.map((item,index) => (
              <ProjectCard 
              key={index}
              title={item.title}
              color={cards[index%cards.length]}
              total={item.t}
              completed={item.c}
              date={item.deadline}
              handleClick={()=>{router.push(`/projects/${item.id}`)}}
              />
              
            ))}
      </div>
    </div>
  )
}
