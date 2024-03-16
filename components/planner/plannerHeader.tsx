import Link from 'next/link'
import { DateTime } from 'luxon'


export const PlannerHeader = ({ year, week }: { year: number, week: number }) => {

    const { weekNumber: previousWeek, weekYear: previousYear } = DateTime.fromObject({ weekYear: year, weekNumber: week }).minus({ week: 1 })
    const { weekNumber: nextWeek, weekYear: nextYear } = DateTime.fromObject({ weekYear: year, weekNumber: week }).plus({ week: 1 })

    return (
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h3 className="font-bold tracking-tight text-gray-900">{year}</h3>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Uke {week}</h1>
                <div className="flex items-center justify-between">
                    <Link className="flex items-center justify-between" href={`/week/${previousYear}/${previousWeek}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                        </svg>
                        <span>Uke {previousWeek}</span>
                    </Link>

                    <Link className="flex items-center justify-between" href={`/week/${nextYear}/${nextWeek}`}>
                        <span>Uke {nextWeek}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    )
}