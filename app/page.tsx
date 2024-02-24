//import Image from 'next/image'
//import Link from 'next/link'
import { Suspense } from 'react'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1>Julie sin fantastiske middagsplanlegger</h1>
      <p>Elsker deg pus 💕</p>
    </main>
  )
}
