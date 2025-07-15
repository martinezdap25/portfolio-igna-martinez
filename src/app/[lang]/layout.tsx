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
      <head />
      <body className="no-transition">
        <ThemeProvider>
          <Header lang={params.lang} />
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