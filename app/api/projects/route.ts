import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createProject, createRelation } from "@/lib/actions/project.actions";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { title, description, deadline, owner_id } = await req.json();
        
        const data= {
            title,
            description: description || null,
            deadline: deadline ? new Date(deadline) : null,
            owner_id,
        }
        const response = await createProject({data})
        
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

