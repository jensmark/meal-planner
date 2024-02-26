import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { DateTime } from 'luxon'
import { db, MealWeekTable } from '@/lib/drizzle'
import { eq, and } from 'drizzle-orm';


export default async function Home() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  const now = DateTime.now()

  const week = now.weekNumber
  const year = now.weekYear

  const plan = await db.select()
    .from(MealWeekTable)
    .where(
      and(
        eq(MealWeekTable.weekNumber, week),
        eq(MealWeekTable.year, year),
        eq(MealWeekTable.ownerId, session?.user?.id)
      )
    )

  if (plan.length == 0) {
    await db.insert(MealWeekTable).values({
      year: year,
      weekNumber: week,
      ownerId: session?.user?.id
    })
  }
  
  //DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: d+1 }).toLocaleString(DateTime.DATE_FULL))

  return (
    <div className="min-h-full">
      <Navigation user={session.user} navigation={[
        {name: "Planlegger", active: true, href: "/"},
        {name: "Oppskrifter", active: false, href: "/recipe"}
      ]}/>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Uke {week}</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
        </div>
      </main>

    </div>
  )
}
