import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Roboto, Nunito, Inconsolata, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';



const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: '400'
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '400'
})

const inconsolata = Inconsolata({
  subsets: ["latin"], 
  variable:"--font-inconsolata"
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
})


function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <main className={`${nunito.variable} ${raleway.variable}`}>
      <Component {...pageProps} />
      <Analytics />
      </main>
    </SessionProvider>
  )
}

export default MyApp
