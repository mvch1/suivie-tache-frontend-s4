import { use } from 'react'
import prisma from '../prisma'
import {User} from '@prisma/client'


export async function createUser({data}:{data:User}) {
    try{
        const user=await prisma.user.create({data})
        
        return user
    }catch(error){
        console.log(error)
    }
}

export async function getUser({id}:{id:string}) {
    
    try{
        const user=await prisma.user.findFirst({
            where:{id}
        })
        return user
    }catch(error){
        console.log(error)
    }
}
export async function deleteUser({id}:{id:string}) {
    try{
        const user=await prisma.user.delete({
            where:{id}
        })
        return user
    }catch(error){
        console.log(error)
    }
}

export async function updateUser(id:string,data:Partial<User>) {
    try{
        const user=await prisma.user.update({
            where:{id},data
        })
        return user
    }catch(error){
        console.log(error)
    }
}