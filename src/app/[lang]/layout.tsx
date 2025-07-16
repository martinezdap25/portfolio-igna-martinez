import '../globals.css'
import { ReactNode } from 'react'
import Header from '@/components/header/Header'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { getDictionary } from '@/app/[lang]/dictionaries'
import BitsBackgroundCanvas from '@/components/BitsBackgroundCanvas'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: 'en' | 'es' }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Header lang={lang} dict={dict} />
          <BitsBackgroundCanvas />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
