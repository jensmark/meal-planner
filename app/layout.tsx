import './globals.css'
import { Inter } from 'next/font/google'

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
  return (
    <html lang="en">
      <body className={inter.variable}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
