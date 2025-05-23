import Header from './layout/header';
import '../styles/globals.css';
import Footer from './layout/footer';
import { auth } from './auth';
import type { Metadata } from 'next';
import { Inria_Sans, Poppins, Ubuntu } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inriaSans = Inria_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inria-sans',
  weight: '400',
});

const poppins = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'GigFix',
  description: 'Communications made simple for orchestras.',
};

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang='en' className={`${poppins.variable} ${inriaSans.variable}`}>
      <body className={`min-h-screen font-sans`}>
        <Header session={session} />
        <main className='layout-children mt-14 h-auto w-screen pb-16'>
          {children}
        </main>
        <Footer session={session} />
      </body>
      <SpeedInsights />
    </html>
  );
}
