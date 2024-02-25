import { UserProvider } from '@/components/user-provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Julie sin fantastiske middagsplanlegger',
  description: '',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (session?.user == null && !__filename.includes('login')) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body className={inter.variable}>
          <UserProvider session={session}>
            <main className="min-h-screen">
              {children}
            </main>
          </UserProvider>
      </body>
    </html>
  )
}
