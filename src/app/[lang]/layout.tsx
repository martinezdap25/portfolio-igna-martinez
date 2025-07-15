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
  const { lang } = await params

  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body className="no-transition">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header lang={lang} />
          {children}
        </ThemeProvider>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('DOMContentLoaded', function () {
                setTimeout(() => {
                  document.documentElement.classList.remove('no-transition');
                }, 300);
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
