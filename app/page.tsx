import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { DateTime } from 'luxon'
import { PlannerHeader } from '@/components/planner/plannerHeader'
import { PlannerPanel } from '@/components/planner/plannerPanel'



export default async function Home() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  const {weekNumber: week, weekYear: year} = DateTime.now()

  return (
    <div className="min-h-full">
      <Navigation user={session.user} navigation={[
        {name: "Planlegger", active: true, href: "/"},
        {name: "Oppskrifter", active: false, href: "/recipe"}
      ]}/>

      <PlannerHeader year={year} week={week}/>
      <main>
        <PlannerPanel year={year} week={week} user={session?.user}/>
      </main>

    </div>
  )
}
