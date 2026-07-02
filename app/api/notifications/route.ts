import { deleteNotification, markNotificationAsRead } from "@/lib/actions/project.actions";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const response = await deleteNotification({ id });
        return NextResponse.json(response);
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });

    }
}
export async function PUT(req: Request) {
    try {
        const { id } = await req.json();
        const response = await markNotificationAsRead({ id });
        return NextResponse.json(response);
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });

    }
}