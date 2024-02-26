"use client"

import { User } from "@supabase/supabase-js"
import Link from 'next/link'
import { useState } from "react"


export default function Navigation({
    user,
    navigation
}: {
    user?: User,
    navigation: { name: string, active: boolean, href: string }[]
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                {
                                    navigation.map(({name, active, href}) => (
                                        <Link key={name} href={href} className={active ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}>
                                            {name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="relative ml-3">
                                <div className="text-base font-medium leading-none text-gray-400">{user?.email || ''}</div>
                            </div>
                        </div>
                    </div>


                    <div className="-mr-2 flex md:hidden">
                        <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen ? (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {
                            navigation.map(({name, active, href}) => (
                                <Link key={name} href={href} className={active ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}>
                                    {name}
                                </Link>
                            ))
                        }
                    </div>
                    <div className="border-t border-gray-700 pb-4 pt-4">
                        <div className="flex items-center px-5">
                            <div className="text-base font-medium leading-none text-gray-400">{user?.email || ''}</div>
                        </div>
                    </div>
                </div>
            ) : null}

        </nav>
    )
}