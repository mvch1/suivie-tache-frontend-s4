'use client'
import React, { useEffect, useState } from 'react'
import { BellDot, LogOut, Pen,Share2, Trash } from 'lucide-react'
import ProjectCreation from './ProjectCreation'
import ListTasks from '../tasks/ListTasks'
import ShareProject from './ShareProject'
import { Popover } from '@/components/ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import Image from 'next/image'
import ProjectDeletion from './ProjectDeletion'
import { Project, Task } from '@/constants/types'
import ListUsers from './ListUsers'
import ProjectJoiningPopover from './ProjectJoiningPopover'
import LeaveProject from './LeaveProject'
import RequestedJoin from '@/components/lists/RequestedJoin'
import { getProjectById } from '@/reusable/mthods'


export default function ProjectHero({data,tasks,u_id,p_id}:{data:Project,tasks:Task[],u_id:string,p_id:string}) {
  
    const [editingProject,setEditingProject]=useState(false);
    const [requestsDialog,setrequestsDialog]=useState(false);
    const [deletingProject,setDeletingProject]=useState(false);
    const [sharingProject,setSharingProject]=useState(false);
    const [leavingProject,setLeavingProject]=useState(false);
    
    const [userRole,setUserRole]=useState('')
    const [isProjectJoined,setIsProjectJoined]=useState(userRole.length>0);
    useEffect(()=>{
      const getUserRole = async ()=>{
        if(!data.members){
          return
        }
        const l=data.members.length
        for (let i = 0; i <l; i++) {
          if (data.members[i].id.trim() === u_id?.trim()) {
            setUserRole(data.members[i].role);
            setIsProjectJoined(true);
            break;
          }
        }
      }
      getUserRole();
    },[userRole])
  return (
    <div className='m-0 p-6 md:px-10 px-4 rounded-xl bg-mainbg-1  md:m-auto'>
          <div className='m-1 w-full flex justify-between'>
            <div></div>
            <div className='text-gray-1 flex gap-5'>
              {userRole=='owner'&&(
                <div className='p-2 flex flex-col gap-3 rounded-xl' onClick={()=>{setrequestsDialog(true)}}>
                  <BellDot/>
                </div>
              )}

              {userRole&&(
              <Popover>
                <PopoverTrigger asChild>
                  <Image className='cursor-pointer'
                    alt='actions'
                    src={'/assets/more.svg'}
                    height={24}
                    width={24}
                    />
                </PopoverTrigger>

                <PopoverContent  className='p-2 flex flex-col gap-3 bg-mainbg-2 rounded-xl'>
                  <div className='cursor-pointer p-1 hover:scale-130 rounded-full'
                        onClick={()=>{setEditingProject(true)}}>
                    <Pen/>
                  </div>
                  <div className='cursor-pointer p-1 hover:scale-130 rounded-full'
                          onClick={()=>{setSharingProject(true)}}>
                    <Share2/>
                  </div>
                  {u_id===data.ownerId&&(
                  <div className='cursor-pointer p-1 hover:scale-130 rounded-full'
                          onClick={()=>{setDeletingProject(true)}}>
                    <Trash/>
                  </div>
                  )}
                  {u_id!==data.ownerId&&(
                  <div className='cursor-pointer p-1 hover:scale-130 rounded-full'
                          onClick={()=>{setLeavingProject(true)}}>
                    <LogOut/>
                  </div>
                  )}
                </PopoverContent>
              </Popover>
              )}
              
              <div>
                <RequestedJoin 
                isOpen={requestsDialog} 
                onClose={()=>{setrequestsDialog(false)}}
                u_id={u_id}
                p_id={p_id}
                title={data.title}
                />
                <ProjectJoiningPopover
                  isOpen={!isProjectJoined}
                  project_id={data.id}
                  title={data.title}
                  description={data.description}
                  onClose={()=>{setIsProjectJoined(true)}}
                />
                <LeaveProject
                isOpen={leavingProject}
                project_id={data.id}
                onClose={()=>{setLeavingProject(false)}}
                />
                <ProjectCreation isOpen={editingProject}
                  closeDialog={()=>{setEditingProject(false)}}
                  onClose={()=>{setEditingProject(false)}}
                  actionType='editing'
                  project_id={data?.id}
                  Title={data?.title}
                  Description={data?.description}
                  Deadline={data?.deadline}
                />
                <ShareProject
                isOpen={sharingProject}
                onClose={()=>{setSharingProject(false)}}
                id={data?.id}
                title={data?.title}
                />
                <ProjectDeletion
                isOpen={deletingProject}
                closeDialog={()=>{setDeletingProject(false)}}
                onClose={()=>{setDeletingProject(false)}}
                handleSubmit={()=>{setDeletingProject(false)}}
                p_id={data.id}
                />
              </div>

            </div>
          </div>
          <div className='text-white contain  w-full flex flex-col gap-6' >
            <div className='title'>
              <span className=''>Nom: </span> {data?.title}
            </div>
            <div className='flex flex-col '>
              {data.description&&(
                <span className='text-gray-1'>description: </span>
              )}
              <div className='mx-4'>
                {data?.description}
              </div>
            </div>
            <ListTasks tasks={tasks} role={userRole}/>
            {userRole&&(
              <ListUsers users={data.members} u_id={u_id} u_role={userRole} p_id={p_id}/>
            )}
          </div>
        </div>
  )
}
