import ProjectHero from '@/components/modals/project/ProjectHero';
import { getProject } from '@/lib/actions/project.actions';
import { getSession } from '@/lib/session';
import { getProjectById } from '@/reusable/mthods';


export default async function page({ params }: { params: { id: string } }) {
  const {id} = await params;
  
  const session = await getSession();
  const u_id = session?.userId;
  let data;
  try {
    data = await getProjectById(id);
    
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }

  if (u_id) {
    return  data ? (
    <section>
      <ProjectHero
        data={data}
        tasks={data.tasks || []} 
        u_id={u_id}
        p_id={id}
      />
    </section>

    ):<></>
  }

  return null; 
}
