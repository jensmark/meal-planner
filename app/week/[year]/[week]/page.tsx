import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { db, MealWeekTable } from '@/lib/drizzle'
import { eq, and } from 'drizzle-orm';


export default async function WeekPlanner({params: { year, week }}: {params: {year: number, week: number}}) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

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
        {name: "Planlegger", active: true, href: `/week/${year}/${week}`},
        {name: "Oppskrifter", active: false, href: "/recipe"}
      ]}/>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Uke {week}</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
     
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div className="group relative">
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      Mandag
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Dato</p>
                  </div>
                </div>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <div className="h-full w-full object-cover object-center lg:h-full lg:w-full">
                    <p></p>
                  </div>
                </div>
  
              </div>

            </div>
       


        </div>
      </main>

    </div>
  )
}
