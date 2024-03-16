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

    

            </main>
        </div>
    )
}