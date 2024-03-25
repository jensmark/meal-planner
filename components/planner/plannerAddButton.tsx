"use client"

import { Recipe } from "@/lib/drizzle"
import { useState } from "react"


export const PlannerAddButton = ({ allRecipes }: { allRecipes: Recipe[] }) => {
    const [selecting, setSelecting] = useState(false)
   
    if (!selecting) {
        return (
            <button 
                type="button" 
                className="flex justify-center rounded-md w-full h-10 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setSelecting(true)}    
            >
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        )
    }


    return (
        <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
            {allRecipes.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}
        </select>
    )
}