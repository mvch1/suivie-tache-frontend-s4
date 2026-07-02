import { Task } from '@prisma/client';
import prisma from '../prisma'


export async function createTask({data}:{ data: Omit<Task, 'id' | 'created_at'> }) {
    try{
        const task = await prisma.task.create({data});
        // TODO: create relation between task and user
        return task
    }catch(error){
        console.log(error)
    }
}

export async function updateTask({data}:{ data:  Omit<Task,'created_at'> }) {
    try{
        const task = await prisma.task.update({
            data:data,
            where:{id:data.id}
        });
        return task
    }catch(error){
        console.log(error)
    }
}
export async function getTasks({project_id}:{project_id:string}) {
    try{
        const tasks = await prisma.task.findMany({
            where:{project_id},
            orderBy:{
                created_at:'asc'
            }
        });
        return tasks
    }catch(error){
        console.log(error)
    }
}

export async function deleteTask({task_id}:{task_id:string}) {
    // TODO: delete relations between task and user
    try{
        const response = prisma.task.delete({
            where:{id:task_id}
        })
        return response
    }catch(error){
        console.log(error)
    }
}