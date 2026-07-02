import { getProject, updateProject } from "@/lib/actions/project.actions";
import { NextResponse } from "next/server";
import { date } from "zod";

export async function GET(req: Request,{ params }:{ params: { [key: string]: string } }) {
    try{
        const {id} = await params;
        const data = await getProject({ id: id});
        return NextResponse.json(data);
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}


export async function POST(req: Request,{ params }:{ params: { [key: string]: string } }) {

    const {id} = await params;

    try {
        const {title, description, deadline, owner_id } = await req.json();
        const response =updateProject(
            {data:{
                title:title,
                owner_id:owner_id,
                description:description,
                deadline:deadline
            },id:id});

        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}


