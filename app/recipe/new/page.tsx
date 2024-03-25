import { IngredientFormList } from '@/components/ingredients/ingredientList'
import Navigation from '@/components/navigation'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'



export default async function NewRecipe() {
    const session = await getSession()
    if (!session) {
        redirect('/login')
    }

    return (
        <div className="min-h-full">
            <Navigation user={session.user} navigation={[
                { name: "Planlegger", active: false, href: "/" },
                { name: "Oppskrifter", active: true, href: "/recipe" }
            ]} />

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ny oppskrift</h1>
                </div>
            </header>
            <main>
                <form action="/recipe/form" method="post">
                    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                            <div className="sm:col-span-3 sm:col-start-1">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Navn</label>
                                <div className="mt-2">
                                    <input id="name" name="name" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>


                            <div className="sm:col-span-1">
                                <label htmlFor="servings" className="block text-sm font-medium leading-6 text-gray-900">Porsjoner</label>
                                <div className="mt-2">
                                    <input id="servings" name="servings" type="number" min="1" max="10" defaultValue={1} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <h2 className="col-span-full text-base font-semibold leading-7 text-gray-900">Ingredienser</h2>

                            <IngredientFormList />

                            <div className="col-span-full">
                                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lagre</button>
                            </div>
                        </div>

                    </div>

                </form>

            </main>
        </div>
    )
}