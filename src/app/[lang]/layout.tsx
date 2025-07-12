import '../globals.css'
import { ReactNode } from 'react'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es' }>
}) {
  const { lang } = await params
  return {
    title: lang === 'en' ? 'My Website' : 'Mi Sitio Web',
    description:
      lang === 'en'
        ? 'Welcome to my website'
        : 'Bienvenido a mi sitio web',
  }
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
      <head>
        {/* Script para aplicar dark mode antes de que React hidrate */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.theme;
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
