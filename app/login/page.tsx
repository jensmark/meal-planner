import Navigation from "@/components/navigation"
import { getSession } from "@/lib/session"


const LoginForm = () => (
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="/auth/login" method="post">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">E-post</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">Passord</label>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
        </div>
      </form>
    </div>
  </div>
)

export default async function Login() {
  const session = await getSession()

  //return 
  return (
    <div className="min-h-full">
      <Navigation user={session?.user} navigation={
        session ? [
          { name: "Planlegger", active: false, href: "/" },
          { name: "Oppskrifter", active: false, href: "/recipe" }
        ] : []
      } />

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {session ? (
            <p className="ml-10">Du er allerede logget inn</p>
          ) : <LoginForm />}
        </div>
      </main>

    </div>
  )
}