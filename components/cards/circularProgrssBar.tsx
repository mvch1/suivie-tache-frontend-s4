"use client";

import React from "react";

interface CircularProgressProps {
  nb_tasks:number
  completed_tasks:number
}

const CircularProgressCard: React.FC<CircularProgressProps> = ({nb_tasks,completed_tasks }) => {
  
  let value=Math.round((completed_tasks/nb_tasks)*100);
  if(nb_tasks===0){
    value=0;
  }
  const circumference = 2 * Math.PI * 40;
  const progress = (value / 100) * circumference;

  return (
    <div className="flex flex-col justify-around w-full items-center p-6  shadow-lg glassmorphism-1 rounded-2xl">
      <div className="relative w-24 h-24">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={40}
            strokeWidth={4}
            fill="transparent"
            className="stroke-gray-300"
          />
          <circle
            cx="50"
            cy="50"
            r={40}
            strokeWidth={4}
            fill="transparent"
            stroke="blue"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {value}%
        </div>
      </div>
      <p className="mt-4 text-gray-200">{completed_tasks} from {nb_tasks}</p>
    </div>
  );
};

export default CircularProgressCard;
