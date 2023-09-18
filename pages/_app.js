import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Lobster, Roboto, Nunito, Inconsolata } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const title = Lobster({
  subsets: ['latin'],
  variable: '--font-lobster',
  weight: '400'
})

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


function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <main className={`${title.variable} ${nunito.variable} ${inconsolata.variable}`}>
      <Component {...pageProps} />
      <Analytics />
      </main>
    </SessionProvider>
  )
}

export default MyApp
