import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const { id } = await req.json();
        const response = await prisma.notification.update({
            where:{id},
            data:{lue:true,requestStatus:"REJECTED"}
        });
        return NextResponse.json(response);
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });

    }
}