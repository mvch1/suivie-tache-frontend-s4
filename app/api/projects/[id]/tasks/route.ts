import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createTask, getTasks} from "@/lib/actions/task.actions";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    
    try {
        const { title, description,project_id } = await req.json();
        const response = await createTask({
            data:{
                title:title,
                project_id:project_id,
                description:description,
                completed:false
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

export async function GET(req:Request,{ params }: { params: { [key: string]: string } }) {
    const {id} = await params;
    try {
        const response =await getTasks({project_id:id})
        
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}