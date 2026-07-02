'use client'
import React, { useState } from 'react'
import Card from '../cards/Card'
import ProjectCreation from '../modals/project/ProjectCreation'
import ProjectSearch from '../modals/project/ProjectSearch'

export default function HomeActions() {
  const [clicked,setClicked]=useState('')

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
          <Card 
          title='Create project'
          color='card-2'
          img_url='/icons/add.svg'
          handleClick={()=>{setClicked("creation")}}
          />
          <Card 
          title='Join Project'
          color='card-1'
          img_url='/assets/search.svg'
          handleClick={()=>{setClicked("joining")}}
          />
      </div>
      <ProjectCreation 
      isOpen={clicked==='creation'}
      onClose={()=>{setClicked('closed')}}
      closeDialog={()=>{setClicked('closed')}}
      />
      <ProjectSearch 
      isOpen={clicked==='joining'}
      closeDialog={()=>{setClicked('closed')}}
      onClose={()=>{setClicked('closed')}}
      />
    </div>
  )
}
