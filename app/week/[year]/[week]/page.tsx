import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { PlannerHeader } from '@/components/planner/plannerHeader';
import { PlannerPanel } from '@/components/planner/plannerPanel';
import { getWeek, getWeekPlan } from '@/lib/data/planner';
import { listRecipes } from '@/lib/data/recipe';


export default async function WeekPlanner({ params: { year, week } }: { params: { year: number, week: number } }) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const mealWeek = await getWeek(year, week, session?.user)
  const weekPlan = await getWeekPlan(mealWeek)
  const allRecipes = await listRecipes()

  return (
    <div className="min-h-full">
      <Navigation user={session.user} navigation={[
        { name: "Planlegger", active: true, href: `/week/${year}/${week}` },
        { name: "Oppskrifter", active: false, href: "/recipe" }
      ]} />

      <PlannerHeader year={year} week={week} />
      <main>
        <PlannerPanel mealWeek={mealWeek} weekPlan={weekPlan} allRecipes={allRecipes}/>
      </main>

    </div>
  )
}
