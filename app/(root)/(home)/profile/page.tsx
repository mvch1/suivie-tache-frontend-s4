"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent, use, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useSession } from "@/app/session.context";
import { set } from "date-fns";
import { User } from "@/constants/types";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pen } from "lucide-react";
import EditProfile from "@/components/modals/EditProfile";

interface FormData {
  username: string;
  name: string;
  imageUrl: string; 
}

export default function page() {
  const session=useSession();
  const userId=session.userId;
  const [username,setUsername]=useState('')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [image_url,setImage_url]=useState('')
  const [editingProject,setEditingProject]=useState(false);

  useEffect(()=>{
    const fetchProfile= async ()=>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${userId}/info`);
      const data = await response.json();
      if(data){
        setUsername(data.username);
        setName(data.name);
        setEmail(data.email);
        setImage_url(data.imageUrl);
      }
    }
    if(userId)
    fetchProfile()
  },[userId])

  return editingProject?
    <EditProfile userData={{name,email,username,image_url}} userId={userId} onCancel={()=>{setEditingProject(false)}}/>
    :
    <div className="bg-mainbg-1 w-full h-full flex justify-center items-center p-20">
        <div className="bg-mainbg-2 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full p-4">
          <div className=" align-right flex w-full justify-end">
          <Pen className=" cursor-pointer hover:scale-130" onClick={()=>{setEditingProject(true)}}/>
          </div>
        <div className="bg-mainbg-2 rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-md w-full">
          <Avatar className="size-24 mb-4">
            <AvatarImage src={image_url || '/icons/blank-profile.webp'} alt={username || name || 'Profile'} />
            <AvatarFallback>{(name || username || 'U')[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">{name}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-1">@{username}</p>
            <p className="text-gray-500 dark:text-gray-400">{email}</p>
          </div>
        </div>
        </div>
  </div>
  
}
