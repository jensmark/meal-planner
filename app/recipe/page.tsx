import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { db, RecipeTable } from '@/lib/drizzle'
import { eq, and } from 'drizzle-orm';

export default async function Recipe() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const recipes = await db.select().from(RecipeTable)

  return (
    <div className="min-h-full">
      <Navigation user={session.user} navigation={[
        { name: "Planlegger", active: false, href: "/" },
        { name: "Oppskrifter", active: true, href: "/recipe" }
      ]} />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Oppskrifter</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl">

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="group relative">

              {recipes.map(recipe => (
                <p>
                  recipe.name
                </p>
              ))}

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}