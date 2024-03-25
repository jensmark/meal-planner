import { User } from "@supabase/auth-helpers-nextjs"
import { db, MealWeekTable, WeekDayMealTable, RecipeTable, MealWeek } from '@/lib/drizzle'
import { eq, and } from 'drizzle-orm';
import { DateTime } from 'luxon'

export type WeekPlan = {
    index: number;
    name: string;
    date: string | null;
    plan: {
        id: number;
        createdBy: string | null;
        name: string;
        createdAt: Date;
        servings: number;
    }[]
}


export const getWeek = async (year: number, week: number, user: User) => {
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

export const getWeekPlan = async (week: MealWeek): Promise<WeekPlan[]> => {
    const recipes = await db.select()
        .from(WeekDayMealTable)
        .leftJoin(RecipeTable, eq(WeekDayMealTable.recipeId, RecipeTable.id))
        .where(eq(WeekDayMealTable.mealWeekId, week.id))

    return [
        {
            index: 1,
            name: "Mandag",
            date: DateTime.fromObject({ weekYear: week.year, weekNumber: week.weekNumber, weekday: 1 }).toISODate(),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 1).map(x => x.recipe!!)
        },
        {
            index: 2,
            name: "Tirsdag",
            date: DateTime.fromObject({ weekYear: week.year, weekNumber: week.weekNumber,  weekday: 2 }).toISODate(),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 2).map(x => x.recipe!!)
        },
        {
            index: 3,
            name: "Onsdag",
            date: DateTime.fromObject({ weekYear: week.year, weekNumber: week.weekNumber,  weekday: 3 }).toISODate(),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 3).map(x => x.recipe!!)
        },
        {
            index: 4,
            name: "Torsdag",
            date: DateTime.fromObject({ weekYear: week.year, weekNumber: week.weekNumber,  weekday: 4 }).toISODate(),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 4).map(x => x.recipe!!)
        },
        {
            index: 5,
            name: "Fredag",
            date: DateTime.fromObject({ weekYear: week.year, weekNumber: week.weekNumber,  weekday: 5 }).toISODate(),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 5).map(x => x.recipe!!)
        },
        {
            index: 6,
            name: "Lørdag",
            date: DateTime.fromObject({ weekYear: week.year, weekNumber: week.weekNumber,  weekday: 6 }).toISODate(),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 6).map(x => x.recipe!!)
        },
        {
            index: 7,
            name: "Søndag",
            date: DateTime.fromObject({ weekYear: week.year, weekNumber: week.weekNumber,  weekday: 7 }).toISODate(),
            plan: recipes.filter(x => x.week_day_meal.dayOfWeek === 7).map(x => x.recipe!!)
        }
    ]
}
