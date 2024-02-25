//import Image from 'next/image'
//import Link from 'next/link'
//import { Suspense } from 'react'

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"


export default async function Login() {
  const session = await getSession()
  if (session?.user != null) {
    redirect('/')
  }

  return (
    <div className="relative flex w-full min-h-screen flex-col items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
       <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Brukernavn
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Passord
          </label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div> 
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
