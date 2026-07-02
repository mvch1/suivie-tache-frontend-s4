import { Project } from "@/constants/types";
import { NextResponse } from "next/server";
import { toast } from "sonner";


export async function getProjectById(p_id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/${p_id}`);

    if (!response.ok) {
        const errorText = await response.text(); // helpful for debugging
        console.error("Failed to fetch project:", response.status, errorText);
        throw new Error(`Failed to fetch project: ${response.status}`);
    }

    // Check if response body is not empty
    const text = await response.text();
    if (!text) {
        throw new Error("Empty response received from project API.");
    }

    try {
        const data = JSON.parse(text);
        return data;
    } catch (err) {
        console.error("Invalid JSON:", text);
        throw new Error("Invalid JSON from server.");
    }
}

export async function getUsersProjects(u_id:string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${u_id}/projects`);
        if (response.ok) {
        const projects = await response.json();
        return projects
        }
    } catch (err) {
        console.log(err)
    }
}

export async function sendNotification({project_id,message,title,type,sender_id,destinateur_id}
    :{project_id?:string|null,message?:string,title?:string,type:string,sender_id?:string,destinateur_id?:string}){
    const data={  project_id, message, sender_id, destinateur_id, title, type}

    const message_response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/notifications/send`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });

    return message_response
}

export async function requestToJoin({u_id,project_id}:{u_id:string,project_id:string}){
    const projects:Project[]=await getUsersProjects(u_id);
    for(let i=0;i<projects.length;i++){
        if(projects[i].id===project_id){
            toast.error("user already in the project")
            return
        }
    }
    
    const project:Project = await getProjectById(project_id);
    const response= await sendNotification({project_id,message:"",title:"request to join",sender_id:u_id,destinateur_id:project.ownerId,type:"REQUEST"})
    if(response.ok){
        toast.success("requested")
    }
}


export async function joinProject({projectId,id}:{projectId:string,id:string}){
    const data={
            projectId:projectId,
            userId:id
        }
         try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/addMember`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (err) {
        // throw new Error("error ");
    }
}

export async function deleteProject(p_id:string,message:string) {
    // get the project 
    const project:Project=await getProjectById(p_id);
    if(!project){
        return NextResponse.json({ message: "Not Found" }, { status: 404 })
    }
    let member;
    // for(let i=0;i<project.members.length;i++){
    //     member=project.members[i]
    //     if(member.role=='owner'){
    //         continue
    //     }
    //     sendNotification({type:"GENERAL",destinateur_id:member.id,sender_id:project.ownerId,message:message,title:"Project was deleted"})
    // }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/deleteById`, {
        method: "DELETE",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(p_id),
    });
    console.log(response)
    return response;
}
