import { User } from "@supabase/auth-helpers-nextjs"
import { db, MealWeekTable, WeekDayMealTable, RecipeTable } from '@/lib/drizzle'
import { eq, and } from 'drizzle-orm';
import { DateTime } from 'luxon'
import { PlannerAddButton } from "./plannerAddButton";

const getWeekPlan = async (year: number, week: number, user: User) => {
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
        const newPlan = await db.insert(MealWeekTable).values({
            year: year,
            weekNumber: week,
            ownerId: user?.id
        }).returning()

        return newPlan[0]
    } 
    else {
        return plan[0]
    }
}

export const PlannerPanel = async ({ year, week, user }: { year: number, week: number, user: User }) => {
    const plan = await getWeekPlan(year, week, user)
    const recipes = await db.select()
        .from(WeekDayMealTable)
        .leftJoin(RecipeTable, eq(WeekDayMealTable.recipeId, RecipeTable.id))
        .where(eq(WeekDayMealTable.mealWeekId, plan.id))

    const allRecipes = await db.select()
        .from(RecipeTable)

    const weekModel = [
        {
            index: 1,
            name: "Mandag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 1 }),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 1)
        },
        {
            index: 2,
            name: "Tirsdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 2 }),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 2)
        },
        {
            index: 3,
            name: "Onsdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 3 }),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 3)
        },
        {
            index: 4,
            name: "Torsdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 4 }),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 4)
        },
        {
            index: 5,
            name: "Fredag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 5 }),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 5)
        },
        {
            index: 6,
            name: "Lørdag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 6 }),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 6)
        },
        {
            index: 7,
            name: "Søndag",
            date: DateTime.fromObject({ weekYear: year, weekNumber: week, weekday: 7 }),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 7)
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

                                <PlannerAddButton allRecipes={allRecipes}/>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}


