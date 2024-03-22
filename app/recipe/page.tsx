import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { db, RecipeTable, RecipeIngredientTable, IngredientTable } from '@/lib/drizzle'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { eq } from 'drizzle-orm'

export default async function Recipe() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const recipes = await db.select()
    .from(RecipeTable)

  const ingredients = await db.select()
    .from(RecipeTable)
    .leftJoin(RecipeIngredientTable, eq(RecipeTable.id, RecipeIngredientTable.recipeId))
    .leftJoin(IngredientTable, eq(IngredientTable.id, RecipeIngredientTable.ingredientId))

  const fullRecipes = recipes.map(recipe => ({
    ...recipe,
    ingredients: ingredients.filter(x => x.recipe.id === recipe.id).map(({recipe_ingredient, ingredient}) => ({
      ...recipe_ingredient,
      ...ingredient
    }))
  }))
  
  return (
    <div className="min-h-full">
      <Navigation user={session.user} navigation={[
        { name: "Planlegger", active: false, href: "/" },
        { name: "Oppskrifter", active: true, href: "/recipe" }
      ]} />

      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Alle oppskrifter</h1>
          <Link href="/recipe/new">
            <button type="button" className="flex justify-center rounded-md h-10 bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
          </Link>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl">

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {fullRecipes.map(recipe => (
              <div key={recipe.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-100 aspect-none h-60">
                  {/*<img src="" className="h-full w-full object-cover object-center lg:h-full lg:w-full" />*/}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-900">
                        {recipe.name}
                    </h3>
                    {recipe.ingredients.map(ingredient => <p className="mt-1 text-sm text-gray-500" key={ingredient.name}>{ingredient.name} - {ingredient.quantity}{ingredient.measurementUnit}</p>)}

                  </div>
                  <p className="text-sm font-medium text-gray-700">{DateTime.fromJSDate(recipe.createdAt).toLocaleString()}</p>
                </div>
                {session.user.id === recipe.createdBy ? 
                  <div className="mt-4 flex justify-between">
                    <button type="button" className="flex justify-center rounded-md h-10 bg-indigo-600 px-2.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-400">
                        Rediger
                    </button>
                    <button type="button" className="flex justify-center rounded-md h-10 bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>  
                    </button>
                  </div>
                  : null} 
              </div>
            ))}

          </div>
        </div>
      </main>
    </div>
  )
}