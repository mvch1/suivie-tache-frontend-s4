import { getUser } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";



export async function GET(req: Request,{ params }:{ params: { [key: string]: string } }) {
    try{
        const {id} = await params;
        const data = await getUser({id});
        return NextResponse.json(data);
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}