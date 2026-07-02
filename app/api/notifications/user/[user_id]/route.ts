import {getNotifications} from "@/lib/actions/project.actions";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }:{ params: { [key: string]: string } }) {
    try{
        const {user_id} = await params;
        const data = await getNotifications({u_id:user_id})
        return NextResponse.json(data);
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}