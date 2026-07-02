import { createRelation, deleteProject, deleteProjectUserRelation, findProject, findRelation, GetListProjects, getProject, requestToJoin } from "@/lib/actions/project.actions";

import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }:{ params: { [key: string]: string } }) {
    try{
        const {id} = await params;
        
        const data = await GetListProjects(id);
        return NextResponse.json(data);
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try{
        const { project_id,user_id}= await req.json();
        const project= await findProject({id:project_id});

        if(project.length===0){
            return NextResponse.json({error:'No project Found'},{status:404})
        }
        const relation = await findRelation({u_id:user_id,p_id:project_id})
        if(relation.length>0){
            return NextResponse.json({error:'exist'},{status:403})
        }else{
            const data = requestToJoin({u_id:user_id,p_id:project_id})
            return NextResponse.json(data);
            // const data = createRelation({u_id:user_id,p_id:project_id,role:"regular"})
            // return NextResponse.json(data);
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
export async function DELETE(req: Request) {
    try{
        const { project_id,user_id}= await req.json();
        const projet = await findProject({id:project_id})
        if(projet[0].owner_id===user_id){
            const response= await deleteProject({id:project_id})
            return NextResponse.json(response)
        }else{
            const response= await deleteProjectUserRelation({user_id,project_id})
            return NextResponse.json(response)
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

