import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { listFullRecipes } from '@/lib/data/recipe'
import { RecipeList } from '@/components/recipe/recipeList'

export default async function Recipe() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const fullRecipes = await listFullRecipes()
  
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

          <RecipeList fullRecipes={fullRecipes.map(x => ({
            id: x.id,
            name: x.name,
            createdAt: DateTime.fromJSDate(x.createdAt).toLocaleString(),
            ingredients: x.ingredients.map(y => ({
              name: y.name!!,
              quantity: y.quantity!!,
              measurementUnit: y.measurementUnit!!
            })),
            editable: session?.user?.id === x.createdBy
          }))}/>
        
        </div>
      </main>
    </div>
  )
}