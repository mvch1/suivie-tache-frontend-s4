import { da, id } from 'date-fns/locale'
import prisma from '../prisma'
import { Prisma, Projet } from '@prisma/client'

type id_p = {
    project_id: string
}
export async function createRelation({ u_id, p_id, role }: { u_id: string, p_id: string, role: string }) {
    const relation = await prisma.user_Project.create({
        data: {
            project_id: p_id,
            user_id: u_id,
            role: role
        }
    })
    return relation
}
export async function findRelation({ u_id, p_id }: { u_id: string, p_id: string }) {
    const relation = await prisma.user_Project.findMany({
        where: { project_id: p_id, AND: { user_id: u_id } }
    })
    return relation
}
export async function findProject({ id }: { id: string }) {
    const projet = await prisma.projet.findMany({
        where: { id }
    })
    return projet
}
export async function createProject({ data }: { data: Omit<Projet, 'id' | 'created_at'> }) {
    try {
        const project = await prisma.projet.create({ data });
        const p_id = project.id;
        const u_id = project.owner_id;
        const relation = await prisma.user_Project.create({
            data: {
                project_id: p_id,
                user_id: u_id,
                role: 'creator'
            }
        })
        return project
    } catch (error) {
        console.log(error)
    }
}
export async function deleteProject({ id }: { id: string }) {

    try {
        const deleteTasks = await prisma.task.deleteMany({
            where: { project_id: id }
        });
        const deleteRelation = await prisma.user_Project.deleteMany({
            where: { project_id: id }
        });
        const project = await prisma.projet.delete({
            where: { id }
        })
        return project
    } catch (error) {
        console.log(error)
    }
}
export async function getProject({ id }: { id: string }) {
    try {
        const project = await prisma.projet.findFirst({
            where: { id }
        })
        const tasks = await prisma.task.findMany({
            where: { project_id: id }
        })

        const users = await prisma.user_Project.findMany({
            where: { project_id: id }
        })

        const count_tot = tasks.length;
        let count_comp = 0;
        tasks.map(item => { if (item.completed) count_comp += 1; })
        return { p: project, t: count_tot, c: count_comp, tasks, users }
    } catch (error) {
        console.log(error)
    }
}
async function GetProjects(list: id_p[]) {
    const projects = [];

    for (let i = 0; i < list.length; i++) {
        const projet = await getProject({ id: list[i].project_id });
        projects.push(projet);
    }

    return projects;
}
export async function GetListProjects(user_id: string) {
    try {
        const list = await prisma.user_Project.findMany({
            where: { user_id },
            select: { project_id: true }
        })
        return GetProjects(list)
    } catch (error) {
        console.log(error)
    }
}
export async function updateProject({ data, id }: { data: Omit<Projet, 'created_at' | 'id'>, id: string }) {
    try {
        const project = await prisma.projet.update({
            data: data,
            where: { id }
        })
        return project
    } catch (error) {
        console.log(error)
    }
}
export async function deleteProjectUserRelation({ user_id, project_id }: { user_id: string, project_id: string }) {
    const deleteRelation = await prisma.user_Project.deleteMany({
        where: { project_id, user_id }
    });
    return deleteRelation
}

export async function getProjectNotiffs({ u_id, p_id }: { u_id: string, p_id: string }) {
    try {
        const data = await prisma.notification.findMany({
            where: { projetId: p_id, destinataireId: u_id }
        })
        return data
    } catch (error) {
        console.log(error)
    }
}
export async function getNotifications({ u_id }: { u_id: string }) {
    try {
        const data = await prisma.notification.findMany({
            where: { destinataireId: u_id },
            orderBy: [
                { lue: 'asc' },
                { dateEnvoi: 'desc' }
            ],
        })
        return data
        console.log(data)
    } catch (error) {
        console.log(error)
    }

}
type NotificationInput = Prisma.NotificationUncheckedCreateInput;

export async function sendNotifications({ data }: { data: NotificationInput }) {
    try {
        const response = await prisma.notification.create({
            data: data
        })
        return response
    } catch (error) {
        console.log(error)
    }

}

export async function deleteNotification({ id }: { id: string }) {
    try {
        const response = await prisma.notification.delete({
            where: { id }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}
export async function markNotificationAsRead({ id }: { id: string }) {
    try {
        const response = await prisma.notification.update({
            where: { id },
            data: { lue: true }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function requestToJoin({ u_id,p_id }: {u_id:string,p_id:string }) {
    try {
        const admin = await prisma.user_Project.findFirst({
            where: { project_id: p_id, role: 'creator' }
        })
        if(!admin){
            return 
        }
        
        const response = await prisma.notification.create({
            data:{
                title:'request to join',
                message:'',
                notificationType:'REQUEST',
                projetId:p_id,
                proprietaireId:u_id,
                destinataireId:admin.user_id,
                requestStatus:'PENDING'
        }
        })
        return response
    } catch (error) {
        console.log(error)
    }

}