import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { deleteTask, updateTask} from "@/lib/actions/task.actions";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {id,title, description,project_id,completed } = await req.json();
        const response =updateTask({
            data:{
                id:id,
                title:title,
                project_id:project_id,
                description:description,
                completed:completed
            }
        });
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try{
        const {task_id} = await req.json();
        const response = await deleteTask({task_id});
        return NextResponse.json(response);
    }catch(error:unknown){

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        
    }
}