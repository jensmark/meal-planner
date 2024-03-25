"use client"

import { useState } from 'react'


export const IngredientForm = ({index}: {index: number}) => {
    const name = `ingredient[${index}]`
    
    return (
        <>
            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor={`${name}.name`} className="block text-sm font-medium leading-6 text-gray-900">Ingrediens</label>
                <div className="mt-2">
                    <input id={`${name}.name`} name={`${name}.name`} type="text" minLength={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-1">
                <label htmlFor={`${name}.quantity`} className="block text-sm font-medium leading-6 text-gray-900">Mengde</label>
                <div className="mt-2">
                    <input id={`${name}.quantity`} name={`${name}.quantity`} type="number" step=".01" defaultValue={1} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-1">
                <label htmlFor={`${name}.unit`} className="block text-sm font-medium leading-6 text-gray-900">Enhet</label>
                <div className="mt-2">
                    <select id={`${name}.unit`} name={`${name}.unit`} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option value={'count'}>Antall</option>
                        <option value={'unit'}>Pakke</option>
                        <option value={'g'}>Gram</option>
                        <option value={'kg'}>Kilogram</option>
                        <option value={'l'}>Liter</option>
                        <option value={'dl'}>deciliter</option>
                        <option value={'cl'}>centiliter</option>
                        <option value={'ml'}>milliliter</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export const IngredientFormList = () => {
    const [ingredientCount, setIngredientCount] = useState(1)


    return (
        <>
            {new Array(ingredientCount).fill(0).map((_,i) => <IngredientForm key={i} index={i}/>)}

            <input id="ingredient.count" name="ingredient.count" value={ingredientCount} type="hidden" />

            <div className="sm:col-span-4">
                <button type="button" onClick={() => setIngredientCount(ingredientCount+1)} className="flex justify-center rounded-md w-full h-10 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
        </>

    )
}