import { RequestStatus } from '@prisma/client'
import { useEffect, useState } from 'react'
import GeneralNotifCard from './GeneralNotifCard';
import RequestNotifCard from './requestNotifCard';
import { NotificationType } from '@/constants/types';

export default function NotificationCard({ notif,project,deletion,index,changed,viewed}: { notif: NotificationType,project?:string,index:number,deletion:(index:number)=>void,changed?:(index:number,new_t:RequestStatus)=>void,viewed?:(index:number)=>void}) {
    const [projectName, setProjectName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if(project){
            setProjectName(project);
            setLoading(false);
            return
        }
        if (notif.projectId) {
            console.log(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/${notif.projectId}`)
            fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/${notif.projectId}`)
                .then(response => response.json())
                .then(data => {
                    setProjectName(data.title);
                    setLoading(false);
                })
                .catch(error => {
                    setProjectName(notif.projectId)
                    // console.error('Error fetching project name:', error);
                });
        }

    }, [notif]);

    return (
        <div>
            {/* <div className={`flex items-center justify-between p-4 mb-2 rounded-lg ${!notif.lue ? 'bg-gray-200' : 'bg-blue-200'}`}>
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                        <span className="text-lg font-bold">{projectName?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{projectName}:<span className='text-sm text-gray-600 ml-2'>you've been kicked out</span></h3>
                        <p className="text-sm text-gray-600">{notif.message}</p>
                    </div>
                </div>
                <span className="text-xs text-gray-500">{new Date(notif.dateEnvoi).toLocaleDateString()} {new Date(notif.dateEnvoi).toLocaleTimeString()}</span>
            </div> */}
            {notif.notificationType=='GENERAL'&&(
                <GeneralNotifCard 
                id={notif.id} 
                dateEnvoi={notif.dateEnvoi} 
                lue={notif.lue} 
                message={notif.message} 
                title={notif.title} 
                projectName={projectName} 
                index={index} 
                deletion={deletion} 
                viewed={viewed}/>
            )}
            {notif.notificationType=='REQUEST'&&(
                <RequestNotifCard id={notif.id} 
                dateEnvoi={notif.dateEnvoi} 
                lue={notif.lue} 
                message={notif.message} 
                title={notif.title} 
                projectName={projectName} 
                sender_id={notif.proprietaireId} 
                state={notif.requestStatus} 
                u_id={notif.destinataireId} 
                p_id={notif.projectId} 
                index={index} 
                deletion={deletion} 
                changed={changed}/>
            )}

        </div>
    )
}
