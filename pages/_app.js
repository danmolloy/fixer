import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Lobster, Roboto } from '@next/font/google'

const title = Lobster({
  subsets: ['latin'],
  variable: '--font-lobster',
  weight: '400'
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '400'
})

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <main className={`${title.variable} ${roboto.variable}`}>
      <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}

export default MyApp
