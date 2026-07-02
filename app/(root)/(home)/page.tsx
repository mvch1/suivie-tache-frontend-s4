'use client'
import ProjectCard from '@/components/cards/ProjectCard'
import ListProjectSkeletons from '@/components/reusable/ListProjectSkeletons';
import { Calendar } from '@/components/ui/calendar';
import HomeActions from '@/components/ui/HomeActions'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSession } from '../../session.context';
type Project={
  id:string
  title:string
  ownerId:string
  createdAt:Date
  description:string
  deadline:Date
  t:number
  c:number
}
function page() {
  const session=useSession();
  const id = session.userId;
  const [listProjects, setListProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const cards = ['card-1', 'card-2', 'card-3', 'card-4',]
  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${id}/projects`);
            if (response.ok) {
            const projects = await response.json();
            setListProjects(projects);
            setLoading(false)
            } else {
            setListProjects([]);
            }
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
    if(id)
    fetchProjects();
  }, []);
  return (
    <section className='w-full bg-red text-foreground'>
      <HomeActions />
      <div className='p-3 projects bg-mainbg-1  rounded-2xl flex flex-col gap-6 mt-10'>
        <h1 className='text-foreground px-4 text-3xl font-semibold'>Projects</h1>

        {loading ? (<>
          {/* <ListProjectSkeletons nb={2} /> */}
        </>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
            {listProjects.slice(0,2).map((item, index) => (
              <ProjectCard
                key={index}
                title={item.title}
                color={cards[index % cards.length]}
                total={item.t}
                completed={item.c}
                date={item.deadline}
                handleClick={() => router.push(`/projects/${item.id}`)}
              />
            ))}
          </div>
        )}

      </div>
    </section>

  )
}

export default page