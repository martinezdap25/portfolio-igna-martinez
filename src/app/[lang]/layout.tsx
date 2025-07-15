import '../globals.css'
import { ReactNode } from 'react'
import Header from '@/components/header/Header'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

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

  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <ThemeProvider>
          <Header lang={lang} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
