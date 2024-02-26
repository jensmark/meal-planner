import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'


export default async function Home() {
  const session = await getSession()
  if(!session) {
    redirect('/login')
  }

  return (
      <p>{session?.user?.email}</p>
  )
}
