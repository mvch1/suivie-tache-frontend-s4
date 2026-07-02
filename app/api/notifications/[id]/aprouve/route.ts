import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createRelation } from "@/lib/actions/project.actions";

export async function PUT(req: Request) {
    try {
        const { id,u_id,p_id } = await req.json();
        const response = await prisma.notification.update({
            where:{id},
            data:{lue:true,requestStatus:"APPROVED"}
        });
        const data = createRelation({u_id,p_id,role:"regular"})
        return NextResponse.json(response);
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });

    }
}