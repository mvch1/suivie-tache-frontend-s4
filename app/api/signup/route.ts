import { Prisma } from "@prisma/client";
// import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    
    if(!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
    }
    const exist =await prisma.user.findUnique({
        where: { email }
    })
    if(exist) {
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

}