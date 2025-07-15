import '../globals.css'
import { ReactNode } from 'react'
import Header from '@/components/header/Header'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { lang: 'en' | 'es' }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <ThemeProvider>
          <Header lang={params.lang} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
