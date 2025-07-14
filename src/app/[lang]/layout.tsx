import '../globals.css'
import { ReactNode } from 'react'
import Header from '@/components/header/Header'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { lang: 'en' | 'es' }
}) {
  const { lang } = params

  return (
    <html lang={lang} suppressHydrationWarning
      className="no-transition"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  localStorage.setItem('theme', theme);
                }
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header lang={lang} />
        {children}
      </body>
    </html>
  )
}