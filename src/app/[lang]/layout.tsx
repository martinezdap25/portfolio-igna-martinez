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
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'es' }>
}) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
