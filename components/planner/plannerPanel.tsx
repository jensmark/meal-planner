"use client"

import { MealWeek, Recipe } from '@/lib/drizzle'
import { PlannerAddButton } from "./plannerAddButton";
import { WeekPlan } from "@/lib/data/planner";


export const PlannerPanel = async (
    { 
        mealWeek,
        weekPlan,
        allRecipes
    }: { 
        mealWeek: MealWeek, 
        weekPlan: WeekPlan[], 
        allRecipes: Recipe[]
    }
) => {

    return (
        <div className="mx-auto max-w-7xl py-6 px-6">
            <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-7">

                {weekPlan.map(week => (
                    <div key={week.index} className="group relative">
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h2 className="text-sm font-bold">
                                    {week.name}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">{week.date}</p>
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


