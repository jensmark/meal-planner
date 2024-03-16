import { User } from "@supabase/auth-helpers-nextjs"
import { db, MealWeekTable } from '@/lib/drizzle'
import { eq, and } from 'drizzle-orm';
import { DateTime } from 'luxon'

export const PlannerPanel = async ({ year, week, user }: { year: number, week: number, user: User }) => {
    const plan = await db.select()
        .from(MealWeekTable)
        .where(
            and(
                eq(MealWeekTable.weekNumber, week),
                eq(MealWeekTable.year, year),
                eq(MealWeekTable.ownerId, user?.id)
            )
        )

    if (plan.length == 0) {
        await db.insert(MealWeekTable).values({
            year: year,
            weekNumber: week,
            ownerId: user?.id
        })
    }

    const weekModel = [
        {
            index: 1,
            name: "Mandag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 1 })
        },
        {
            index: 2,
            name: "Tirsdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 2 })
        },
        {
            index: 3,
            name: "Onsdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 3 })
        },
        {
            index: 4,
            name: "Torsdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 4 })
        },
        {
            index: 5,
            name: "Fredag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 5 })
        },
        {
            index: 6,
            name: "Lørdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 6 })
        },
        {
            index: 7,
            name: "Søndag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 7 })
        }
    ]

    return (
        <div className="mx-auto max-w-7xl py-6 px-6">
            <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-7">

                {weekModel.map(week => (
                    <div key={week.index} className="group relative">
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h2 className="text-sm font-bold">
                                    {week.name}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">{week.date.toISODate()}</p>
                            </div>
                        </div>
                        <div className="w-full rounded-md bg-gray-100">
                            <div className="h-full w-full object-cover object-center">

                                {/** sdfds */}

                                <button type="button" className="flex justify-center rounded-md w-full h-10 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}


