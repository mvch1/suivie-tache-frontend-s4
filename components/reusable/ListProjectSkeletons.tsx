import React from 'react'
import ProjectCardSkeleton from './ProjectCardSkeleton';


export default function ProjectSkeletons({nb}:{nb:number}) {
    return (
        <div className="text-white">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: nb }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
          </div>
        </div>
      );
}
