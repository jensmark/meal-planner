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
            <div className="group relative">

              {fullRecipes.map(recipe => (
                <div key={recipe.id}>
                  <p>{recipe.name}</p>
                  <p>{DateTime.fromJSDate(recipe.createdAt).toLocaleString()}</p>
                  <ul>
                    {recipe.ingredients.map(ingredient => <li key={ingredient.name}>{ingredient.name} - {ingredient.quantity}{ingredient.measurementUnit}</li>)}
                  </ul>
                  {session.user.id === recipe.createdBy ? 
                    <>
                      <p><button>Rediger</button> </p>
                      <p><button>Slett</button> </p>
                    </>
                    : null} 
                </div>
              ))}

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}