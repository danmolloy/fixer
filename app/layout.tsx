import Header from './layout/header'
import '../styles/globals.css'
import Footer from './layout/footer'
import { auth } from './auth'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: "GigFix",
  description: "Communications made simple for orchestras."
}

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={`min-h-screen`}>
        <Header session={session}/>
        <main className='layout-children mt-14 h-auto w-screen pb-16 '>
          {children}
        </main>
        <Footer session={session}/>
      </body>
    </html>
  )
}